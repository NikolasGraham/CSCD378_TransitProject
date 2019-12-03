$(document).ready(start);

let stopIds = [];

function start() {
    setInterval(updateClock, 1000);
}

function updateClock() {
    var date = new Date();

    time = date.toLocaleTimeString("en-US");

    $("#clock").html(time);
}

//WIP Could be better...
//Needs to double check that stop exists in API before adding to list as well...
function addStop() {
    let addStop = true;
        if (stopIds.includes($("#stopNumberInput").val())) {
            addStop = false;
        }

    if (addStop == true) {
        stopIds.push($("#stopNumberInput").val());
        $("#TableHolder").append(
            "<table id=tbl" + $("#stopNumberInput").val() + ">"
            + "<tr>"
            + "<th>" + $("#stopNumberInput").val() + "</th>"
            + "<th>"
            + "<Button type='button' class='btn btn-dark' className='btnRemove' onclick='removeStop(value)' value="+$("#stopNumberInput").val()+">Remove</Button>"
            + "</th>"
            + "</tr>"
            + "<tr>"
            + "<td>4</td>"
            + "<td>Monroe-Regal</td>"
            + "<td>2:58:00 PM (56 mins)</td>"
            + "<td>Plaza Zone 7</td>"
            + "</tr>"
            + "</table>"
        )
    }
}

function removeStop(stopId){
    $("#tbl" + stopId).remove();
    if (stopIds.includes($("#stopNumberInput").val())) {
        var index = stopIds.indexOf(stopId);
        if (index > -1) {
            stopIds.splice(index, 1);
        }
        console.log(stopIds);
    }
}