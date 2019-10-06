<?php

// include_once (dirname(dirname(__FILE__)) . '/config.php');
$email = "rv.rodrigo.viola@gmail.com";
//Initial response is NULL
$response = null;

//Initialize appropriate action and return as HTML responses
if (isset($_POST["action"])) {
    $action = $_POST["action"];

    switch ($action) {
        case "SendMessage": {
                if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["subject"]) && isset($_POST["message"]) && !empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["subject"]) && !empty($_POST["message"])) {

                    $subject = $_POST["subject"];
                    $from = $_POST["email"];
                    $message = $_POST["message"];
                    $message .= "<br/><br/>";

                    console.log($from);

                    $response = (SendEmail($message, $subject, $from, $email)) ? 'Message Sent' : "Sending Message Failed";
                } else {
                    $response = "Sending Message Failed";
                }
            }
            break;
        default: {
                $response = "Invalid action is set! Action is: " . $action;
            }
    }
}


if (isset($response) && !empty($response) && !is_null($response)) {
    echo '{"ResponseData":' . json_encode($response) . '}';
}

function SendEmail($message, $subject, $from, $to) {
    $isSent = false;
    // Content-type header
    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    // Additional headers
    // $headers .= 'To: ' . $to . "\r\n";
    $headers .= 'From: ' . $from . "\r\n";

    mail($to, $subject, $message, $headers);
    if (mail) {
        $isSent = true;
    }
    return $isSent;
}


?>
