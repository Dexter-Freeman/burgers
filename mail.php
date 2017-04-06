<?php
 header('Content-Type: application/json')

$name = $_POST['name'];
$message = "Сообщение от: $name";

$result = mail('vse.pisma.tut@gmail.com', 'Тема письма', $message);


echo json_encode(array(
	'status' => $result
	));