<?php
include_once("creds/creds.php")

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if(isset($_GET["stop_id"])) {
    http_response_code(200);
    echo file_get_contents("http://52.88.188.196:8080/api/api/where/arrivals-and-departures-for-stop/$stop_id.json?key=$key");
  }
}
else {
  http_response_code(400);
  echo json_encode(array("error" => "Only GET requests are supported!"));
}
?>
