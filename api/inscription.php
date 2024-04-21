<?php
require_once __DIR__."/core/createArrayWithknowedValue.php";
require_once __DIR__."/gestionFormulaire.php";
require_once __DIR__."/core/connexionDB.php";
require_once __DIR__."/core/convertirDate.php";

header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//recuper les données du front
$data = json_decode(file_get_contents('php://input'), true);

//variable dont j'ai besoin dans mon tableau de regles
$dayValue = createArrayWithKnowedValue(0,31);
$yearValue = createArrayWithKnowedValue(1950,2024);
$monthValue= [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
];
$sexe = ["femme","homme","autre"];

//mon tableau de règle pour faire le traitement de mon formulaire d'inscription
$regleInscription = [
    "prenom" => [
        "require" => true,
        "max"=> 100
    ],
    "nom" => [
        "require" => true,
        "max"=> 100
    ],
    "mdp" => [
        "require" => true,
        "max"=> 100
    ],
    "day" => [
        "require" => true,
        "value"=> $dayValue,
    ],
    "month" => [
        "require" => true,
        "value"=> $monthValue,
    ],
    "year" => [
        "require" => true,
        "value"=> $yearValue,
    ],
    "sexe" => [
        "require" => true,
        "value"=> $sexe,
    ],
];

function createUser($prenom,$nom,$mdp,$email,$sexe,$day,$month , $year) {
    $motDePasseHashed = password_hash($mdp,PASSWORD_BCRYPT );
    // traiter les inputs de date au bon format
    $dateNaissance = convertirDate($day,$month,$year);   
    try
    {
        // Instancier la connexion à la base de données.
        $pdo = connexionDB();
        // Préparer la requête SQL :
        $requete = "INSERT INTO sn_users (prenom, nom, mdp,email,sexe,naissance) VALUES (:prenom, :nom, :mdp, :email, :sexe,:naissance)";
        $stmt = $pdo->prepare($requete);
        $stmt->bindParam(':prenom', $prenom);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':mdp', $motDePasseHashed);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':sexe', $sexe);
        $stmt->bindParam(':naissance', $dateNaissance);
        // Exécuter la requête.
        $stmt->execute();
    }
    catch(\PDOException $e)
    {
        gerer_exceptions($e);
        throw new Exception($e);
    }
}

//nettoyage des données reçues du front
$cleanData = xssSecurity($data);

//traitement des données
$erreur = traitement($regleInscription, $cleanData);

//gerer les deux réponses
if (count($erreur) > 0) {
    http_response_code(400);
    echo json_encode($erreur );
}
else {
    createUser($cleanData["prenom"],$cleanData["nom"],$cleanData["mdp"],$cleanData["email"],$cleanData["sexe"],$cleanData["day"],$cleanData["month"],$cleanData["year"]);
    http_response_code(201);
    echo json_encode($erreur );

}