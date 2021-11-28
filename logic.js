var Capacity;
var numberOfObjects;

function tableForItems() {
    numberOfObjects = document.getElementById('nbr_objects').value;

    var tableHeader = '<table class="table-items" id="table" align="center">\
                    <tr>\
                        <th scope="col">Objets</th>\
                        <th scope="col"> Gain </th>\
                        <th scope="col"> Poids </th>\
                    </tr>';

    var tableBody = '';

    for (var i=0; i<numberOfObjects; i++) {
        tableBody += '<tbody><tr><td>' + i + '</td>';
        for (var j=0; j<2; j++) {
            tableBody += '<td>\
                        <input class="item" type="number" placeholder="value"\
                        </td>';
        }
        tableBody += '</tr></tbody>\n';
    }

    var tableFooter = '</table>';
    document.getElementById('table-objects').innerHTML = tableHeader + tableBody + tableFooter;
}

function prepareSecondSection() {
    Capacity = document.getElementById('capacity').value;
    numberOfObjects = document.getElementById('nbr_objects').value;

    if (Capacity>=0 && numberOfObjects>=0) {
        tableForItems();
        document.getElementById('solve-button').innerHTML = '<br><br> <button class="solve" type="button" onclick="solve();"> Resoudre </button>';
    } else {
        document.getElementById('table-objects').innerHTML = '';
        document.getElementById('solve-button').innerHTML = '';
    }
}

function solve() {
    var table = document.getElementById('table');

    var weights = [0];
    var profits = [0];

    for (var i = 1; i <= numberOfObjects; i++) {
        profits.push(parseInt(table.rows[i].cells[1].children[0].value));
        weights.push(parseInt(table.rows[i].cells[2].children[0].value));        
    }

    knapsack(Capacity, weights, profits);
}

function knapsack(Capacity, weights, profits) {
    var dp = [];
    var subsol = [];
    
    console.log('capacity: ', Capacity);
    console.log('num ', numberOfObjects);

    for (let i=0; i<=numberOfObjects; i++) {
        dp.push([]);
        for (let j=0; j<=Capacity; j++)
            dp[i].push(0);
    }

    for (let i=0; i<=numberOfObjects; i++) {
        subsol.push([]);
        for (let j=0; j<=Capacity; j++)
            subsol[i].push([]);
    }

    console.log(dp); console.log(subsol);

    for (let i=0; i<=numberOfObjects; i++) {
        for (let j=0; j<=Capacity; j++) {
            if (i===0 || j===0)
                continue;

            if (j < weights[i]) {
                dp[i][j] = dp[i-1][j];
            }
            else {
                if (dp[i-1][j] < dp[i-1][j-weights[i]] + profits[i]) {
                    dp[i][j] = dp[i-1][j-weights[i]] + profits[i];
                    subsol[i][j] = subsol[i-1][j-weights[i]].slice();
                    subsol[i][j].push(i);
                }
                else {
                    dp[i][j] = dp[i-1][j];
                }
            }
        }
    }

    document.getElementById('solution').innerHTML = `<h2> ${dp[numberOfObjects][Capacity]} </h2>` +
                             `<h2> ${subsol[numberOfObjects][Capacity]} </h2> `;
    console.log(dp);
    console.log(subsol);
    console.log("solution: ", dp[numberOfObjects][Capacity]);
}