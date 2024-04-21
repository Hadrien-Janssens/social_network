<?php

function convertirDate($day,$month, $year) {

        $dateString = $year . '-' . $month . '-' . $day;
        $timestamp = strtotime($dateString);
        $formattedDate = date('Y-m-d', $timestamp);
        
        return $formattedDate;
}