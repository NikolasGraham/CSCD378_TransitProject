$(document).ready(start);

//Starts at "1" not 0..
stopCount = 1;
stopIds = [];
allStopInfo = [];

function start() {
    setInterval(updateClock, 1000);
}

function updateClock() {
	var date = new Date();

	time = date.toLocaleTimeString("en-US");
	
	$("#clock").html(time);	
}

function dissapear() {
    $("#addInput").hide();
    $("#stopInputs").hide();
}

function addStop() {
    $("#stopInputs").append(
        '<div class="input-group mb-3" id="stopNumberForm">'
        + '<label>Stop ' + stopCount + ':</label>'
        + '<input type="text" class="form-control" id="input' + stopCount + '" placeholder="Stop Id...">'
        + '</div>'
    )
    stopCount++;
}
//$("#input" + i).val()
function finish() {
    for (i = 1; i < stopCount; i++) {
        stopIds.push($("#input" + i).val());
    }
    dissapear();
    getDataFromAPI();
    populateTables();
}

function getDataFromAPI() {
    //let stopid = "STA_PZ1";
    for (i = 0; i < stopIds.length; i++) {
        $.ajax({
            type: "GET",
            url: "arrivals-and-departures-for-stop.php",
            data: { stop_id: stopIds[i] },
            success: function (data) {
                console.log(data["currentTime"]);
                allStopInfo.push(data);
            }
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
    }
}

function populateTables() {

}