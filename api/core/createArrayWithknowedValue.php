<?php

function createArrayWithKnowedValue(int $min,int $max,array $array=[]):array{
    for ($i=$min; $i <= $max ; $i++) { 
        $array[]=$i;
    }
    return $array;
}