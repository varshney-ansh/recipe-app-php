<?php 
require_once __DIR__ . '/../../vendor/autoload.php';
// Load .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

$client = new Google\Client;
$client->setClientId($_ENV['Google_Client_ID']);
$client->setClientSecret($_ENV['Google_Client_Secret']);
$client->setRedirectUri('http://localhost/index.php/ap/verify');
$client->addScope("email");
$client->addScope("profile");

if (isset($_GET['code'])) {
    $token = $client->fetchAccessTokenWithAuthCode($_GET['code']);
    $client->setAccessToken($token['access_token']);
    $oauth2 = new Google\Service\Oauth2($client);
    $userInfo = $oauth2->userinfo->get();
    // Handle user information (e.g., store in session)
    $_SESSION['user'] = [
        'id' => $userInfo->id,
        'name' => $userInfo->name,
        'surname' => $userInfo->family_name,
        'email' => $userInfo->email,
        'picture' => $userInfo->picture
    ];
    header('Location: /index.php');
}
?>
