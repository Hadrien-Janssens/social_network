<?php
require_once __DIR__."/core/connexionDB.php";
    
// CORS
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//recuperer les données du front
$data = json_decode(file_get_contents('php://input'), true);

function connexionUser($email, $password) {
    $pdo = connexionDB();

    $requete = "SELECT * FROM sn_users WHERE email = :email";
    $stmt = $pdo->prepare($requete);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    //recupere toutes les données de l'utilisateur
    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);
    //tester si le mot de passe correcspond a l'identifiant
    if (!empty($utilisateur) && password_verify($password,      $utilisateur['mdp'])) {
     $_SESSION['utilisateur_id']= $utilisateur['id'];
     http_response_code(202);
     echo json_encode($utilisateur);
    }
}
//la data est à nettoyer
connexionUser($data['email'],$data['password']);