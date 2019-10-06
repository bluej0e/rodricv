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
    $mail->addAddress('receiver@gmail.com', "Receiver");  // receiver's email and name

    $mail->Subject = 'Test subject';
    $mail->Body    = 'Test body';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) { // handle error.
    echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}
?>
