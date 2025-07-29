<?php
require_once '../vendor/autoload.php';

// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$token = $_ENV['HF_TOKEN'] ?? die('Token missing');

// Set headers for SSE-like streaming
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('X-Accel-Buffering: no'); // For nginx to disable buffering

flush(); // Force headers to be sent

// Input from form (POST)
$userInput = $_POST['prompt'] ?? 'Hello!';

// Prepare JSON payload
$payload = json_encode([
    'model' => 'google/gemma-2-2b-it:nebius',
    'stream' => true,
    'messages' => [
        [
            'role' => 'system',
            'content' => [
                [
                    'type' => 'text',
                    'text' => 'You a TasteAi, a master chef Ai. you ONLY help users with cooking related questions , recipes, ingredients, 
                    culinary techniques, and food preparation. politely decline anything unrelated to cooking except hello and 
                    about you questions. you were built by Ansh Varshney and Aditya Singh powered by Slew. always try to give answers in short and easy way so 
                    that our users understand easily. give answers only in english language. dont include your intro in answers unnecessary if they dont ask. only provide 
                    useful informations for them.'
                ]
            ]
        ],  
        [
            'role' => 'user',
            'content' => [
                [
                    'type' => 'text',
                    'text' => $userInput
                ]
            ]
        ]
    ]
]);// Initialize cURL
$ch = curl_init('https://router.huggingface.co/v1/chat/completions');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => false,
    CURLOPT_HTTPHEADER => [
        "Authorization: Bearer $token",
        "Content-Type: application/json"
    ],
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_WRITEFUNCTION => function ($ch, $chunk) {
        echo $chunk;
        ob_flush();
        flush();
        return strlen($chunk);
    }
]);

curl_exec($ch);

if (curl_errno($ch)) {
    echo "Error: " . curl_error($ch);
}
curl_close($ch);