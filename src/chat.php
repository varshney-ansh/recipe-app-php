<?php
session_start();

if($_SERVER['HTTP_X_BEARER_TOKEN'] !== 'Ansh by Slew') {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

if (empty($_POST['prompt'])) {
    http_response_code(400);
    echo "No input provided.";
    exit;
}

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

//check for token

// Input from form (POST)
$userInput = $_POST['prompt'] ?? '';
$chatHistory = $_POST['chat_history'] ?? '' ;

$messages = [
    [
        'role' => 'system',
        'content' => [
            [
                'type' => 'text',
                'text' => 'You a TasteAi, a master chef Ai. you ONLY help users with cooking related questions , recipes, ingredients, 
                culinary techniques, and food preparation. politely decline anything unrelated to cooking except hello and 
                about you questions. you were built by Ansh Varshney and Aditya Singh powered by Slew. always try to give answers in short and easy way so 
                that our users understand easily. give answers only in english language. dont include your intro in answers unnecessary if they dont ask. only provide 
                useful informations for them. help users to cook better and faster. you are a cooking expert, help users to cook food for thier occassions, dates, to impress their loved ones, and to make their life easier with cooking.
                users can ask you to suggest recipes, ingredients, cooking techniques, and food preparation methods. you can suggest dishes if necessary.'
            ]
        ]
    ]
];

if (!empty($chatHistory)) {
    $historyArray = json_decode($chatHistory, true);
    if ($historyArray && is_array($historyArray)) {
        foreach ($historyArray as $historyMessage) {
            $messages[] = [
                'role' => $historyMessage['role'],
                'content' => [
                    [
                        'type' => 'text',
                        'text' => $historyMessage['content']
                    ]
                ]
            ];
        }
    }
}

$messages[] = [
    'role' => 'user',
    'content' => [
        [
            'type' => 'text',
            'text' => $userInput
        ]
    ]
];

// Prepare JSON payload
$payload = json_encode([
    'model' => 'google/gemma-2-2b-it:nebius',
    'stream' => true,
    'messages' => $messages,
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

$response = curl_exec($ch);
$_SESSION['chat_history'][] = [
    'role' => 'assistant',
    'content' => json_decode($response, true),
];


if (curl_errno($ch)) {
    echo "Error: " . curl_error($ch);
}
curl_close($ch);