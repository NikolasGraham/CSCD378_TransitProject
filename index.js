$(document).ready(start);

//Starts at "1" not 0..
stopCount = 1;
stopCodes = [];

function start() {

}

function dissapear() {
    var x = document.getElementById("stopNumberInput");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    $("#stopInputs")
}

function addStop() {
    $("#stopInputs").append(
        '<div class="input-group mb-3" id="stopNumberForm">'
            +'<label>Stop '+stopCount+':</label>'
            +'<input type="text" class="form-control" id=input"'+stopCount+'" placeholder="...">'
        +'</div>'
    )
    console.log("made it" + stopCount);
    stopCount++;
}

function finish(){
    for(i=1; i < stopCount+1; i++){
        stopCodes.push($("#input" + i).val());
    }
    console.log(stopCodes);
}