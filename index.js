$(document).ready(start);

//Starts at "1" not 0..
stopCount = 1;
stopCodes = [];

function start() {

}

function dissapear() {
    $("#addInput").hide();
    $("#stopInputs").hide();
}

function addStop() {
    $("#stopInputs").append(
        '<div class="input-group mb-3" id="stopNumberForm">'
            +'<label>Stop '+stopCount+':</label>'
            +'<input type="text" class="form-control" id="input'+stopCount+'" placeholder="Stop Id...">'
        +'</div>'
    )
    stopCount++;
}
//$("#input" + i).val()
function finish(){
    for(i=1; i < stopCount; i++){
        stopCodes.push($("#input" + i).val());
    }
    dissapear();
    console.log(stopCodes);
}