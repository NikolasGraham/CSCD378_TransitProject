$(document).ready(start);

//Starts at "1" not 0..
stopCount = 1;
stopIds = [];
allStopInfo = [];
departures = true;


function start() {
    setInterval(clock, 1000);
}

function clock() {
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
  //populateTables();
}

function getDataFromAPI() {
    //let stopid = "STA_PZ1";
    for (i = 0; i < stopIds.length; i++) {
        $.ajax({
            type: "GET",
            url: "arrivals-and-departures-for-stop.php",
            data: { stop_id: stopIds[i] },
            dataType: "json",
          //success: function (data) {
          //  allStopInfo.push(JSON.parse(data));
          //}
            success: stopDataFetched
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
    }
}

function millisecondsToStr(milliseconds) {
  minutes = Math.round(milliseconds / (1000 * 60));
  ret = "";
  if (minutes < 0 ) {
    ret = "Departed";
  }
  else {
    ret = minutes + " minutes";
  }
  return ret;
}

function cleanStatus(string) {
  if (string = "default") {
    string = "";
  }
  return string;
}

function stopDataFetched(data) {
  const masterContainer = $("#TableHolder");
  console.log(data);
  const stop_id = data.data.references.stops[0].id;
  const stop_name = data.data.references.stops[0].name;
  const currentTime = Number(data.currentTime);
  console.log(data.currentTime);
  console.log("currentTime is " + currentTime )

  const stopContainer = $("<div>", {"class": "stopContainer", "id": "stopContainer_" + stop_id});
  stopContainer.append($("<h5>",{"class": "stopHeader", "id": "stopHeader" + stop_id}).append(stop_name));

  const stopTable = $("<table>",{"class": "stopTable", "id": "stopTable_" + stop_id});
  const stopTableHeader = $("<tr>", {"class": "stopTableHeader", "id": "stopTableHeader_" + stop_id});
  stopTableHeader.append($("<th>StopId</th><th>Route</th><th>Status</th><th>Departing in</th>"));
  stopTable.append(stopTableHeader);
  
  for (arrival of data.data.entry.arrivalsAndDepartures) {
    entry = $("<tr>", {"class": "stopTableEntry", "id": "stopTableEntry_" + stop_id});

    route = $("<td>");
    route.append(arrival.routeShortName);
    entry.append(route);

    let routeLongName = $("<td>")
    console.log(arrival.routeLongName);
    routeLongName.append(arrival.routeLongName);
    entry.append(routeLongName);

    stat = $("<td>");
    stat.append(cleanStatus(arrival.status));
    entry.append(stat);

    time = $("<td>");
    time.append(millisecondsToStr(Number(arrival.predictedDepartureTime) - currentTime));
    entry.append(time);

    stopTable.append(entry);
  }

  stopContainer.append(stopTable);
  masterContainer.append(stopContainer);

  
  console.log(stop_id);
  console.log(stop_name);
}

function populateTables() {
    console.log(allStopInfo);
    console.log(allStopInfo[0]);
    
    for (entry of allStopInfo) {
      console.log(entry);
    }
    console.log("what!");
}
