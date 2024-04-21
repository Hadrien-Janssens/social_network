<?php
    define('DEV_MODE', true);
    function gerer_exceptions(\PDOException $e): void
    {
        // Limiter l'affichage des erreurs au mode "développement" pour éviter le risque la communication de données sensibles
        // lorsqu'une erreur se produit en mode "production" (lorsque le site est en ligne) :
        if (defined('DEV_MODE') && DEV_MODE === true)
        {
            echo "Erreur d'exécution de requête : " . $e->getMessage() . PHP_EOL;
        }
    }
    function connexionDB(): ?\PDO
    {
        $nomDuServeur = "localhost";
        $nomUtilisateur = "root";
        $motDePasse = "root";
        $nomDB = "social_network";
        try
        {
            // Instancier une nouvelle connexion.
            $pdo = new PDO("mysql:host=$nomDuServeur;dbname=$nomDB", $nomUtilisateur,$motDePasse);
            // Définir le mode d'erreur sur "exception".
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Retourner l'objet PDO après la connexion.
            return $pdo;
        }
        catch(\PDOException $e)
        {
            // Relancer l'exception pour qu'elle soit capturée par le bloc "try/catch" parent.
            throw $e;
        }
    }