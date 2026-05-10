<?php

$data = json_decode(file_get_contents("php://input"), true);

$phone = trim($data['phone']);

$to = "yourmail@gmail.com";
$subject = "Нова заявка з сайту landscape";

$message = "
Телефон: $phone
";

$headers = "From: landscapewebsite@yourdomain.com\r\n";
$headers .= "Content-type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
  echo json_encode([
    "success" => true
  ]);
} else {
  echo json_encode([
    "success" => false
  ]);
}
