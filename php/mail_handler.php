<?php
// PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// Base files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
// create object of PHPMailer class with boolean parameter which sets/unsets exception.
$mail = new PHPMailer(true);
try {
    $mail->isSMTP(); // using SMTP protocol
    $mail->Host = 'smtp.gmail.com'; // SMTP host as gmail
    $mail->SMTPAuth = true;  // enable smtp authentication
    $mail->Username = 'rv.rodrigo.viola@gmail.com';  // sender gmail host
    $mail->Password = 'M1l1c0s!'; // sender gmail host password
    $mail->SMTPSecure = 'tls';  // for encrypted connection
    $mail->Port = 587;   // port for SMTP

    $mail->setFrom('sender@gmail.com', "Sender"); // sender's email and name
    $mail->addAddress('rv.rodrigo.viola@gmail.com', "Receiver");  // receiver's email and name

    $mail->Subject = 'Test subject';
    $mail->Body    = 'Test body';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) { // handle error.
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}


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
