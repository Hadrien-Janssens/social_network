<?php

function xssSecurity($array) {
    foreach ($array as $key => $value) {
        $newValue = htmlentities($array[$key]);
        $newValue = trim($newValue);
        $array[$key]=$newValue;
    }
    return $array;
}

function traitement(array $regles, array $dataArray , ?array $erreurs=[]):array {
  
    foreach ($regles as $key => $value) {

            if ( isset($regles[$key]['require']) && empty($dataArray[$key] )) {
                $erreurs[$key] = "Champs requis !";
            }
            if (isset($regles[$key]['max']) && $regles[$key]['max'] < strlen($dataArray[$key]) && !isset($erreurs[$key]) ) {
                $erreurs[$key] = "Ce champs doit contenir maximum " . $regles[$key]['max'] . " caractères";
            }
            if (isset($regles[$key]['min']) && $regles[$key]['min'] > strlen($dataArray[$key]) && !isset($erreurs[$key])) {
                $erreurs[$key] = "Ce champs doit contenir minimum " . $regles[$key]['min'] . " caractères";
            }
            if (!isset($erreurs[$key]) && $key == 'email' && !filter_var($dataArray['email'], FILTER_VALIDATE_EMAIL)) {
                $erreurs['email'] = "Veuillez entrer une adresse mail valide";
            }
            if ($key == 'confirmation' && $dataArray['confirmation'] != $dataArray['password']) {
                $erreurs[$key] = "Ce champs doit être identique au champs mot de passe";
            }
            
        }
    return $erreurs;
}