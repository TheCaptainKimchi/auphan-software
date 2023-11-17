<?php
// Set the content type to JSON for the response
header('Content-Type: application/json');
// Allow requests from specific origins
header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

// Handling preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Accept requests with Content-Type and the headers you are sending (e.g., Email, Password)
    header("Access-Control-Allow-Headers: Content-Type, Email, Password");
    exit;
}

// Function to get header information
function getHeader($headerName)
{
    $headers = getallheaders();
    return isset($headers[$headerName]) ? $headers[$headerName] : null;
}

// Get email and password from the request headers
$email = getHeader('Email');
$password = getHeader('Password');

// Predefined credentials
$validEmail = "hr@auphansoftware.com";
$validPassword = "hello";

// Check if the credentials are correct
if ($email === $validEmail && $password === $validPassword) {
    // Success response
    echo json_encode(["status" => "success", "message" => "Login successful"]);
} else {
    // Error response
    http_response_code(401); // Unauthorized status
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}
?>