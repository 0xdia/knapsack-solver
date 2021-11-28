var Capacity;
var numberOfObjects;

var tableHeader;
var tableBody;
var tableFooter;

function tableForItems() {
    console.log('capacity is ', Capacity);
    console.log('number of items is ', numberOfObjects);

    var tableHeader = '<table class="table-items" id="table">\
                <tr>\
                    <th scope="col">Objets</th>\
                    <th scope="col"> Gain </th>\
                    <th scope="col"> Poids </th>\
                </tr>';

    var tableBody = '';

    for (var i=0; i<numberOfObjects; i++) {
        tableBody += '<tbody><tr><td>' + i+1 + '</td>';
        for (var j=0; j<2; j++) {
            tableBody += '<td>\
                        <input type="number" placeholder="value"\
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
        document.getElementById('solve-button').innerHTML = '<button type="button" onclick=""> Resoudre </button>';
    } else {
        document.getElementById('table-objects').innerHTML = '';
        document.getElementById('solve-button').innerHTML = '';
    }
}