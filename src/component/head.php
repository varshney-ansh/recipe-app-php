<?php

class Head{
    public static function render(String $title = "TasteAI | Powered by Slew"): void {
        ?>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title><?php echo $title; ?></title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
             <link rel="icon" type="image/x-icon" href="./logob.png">
             <link rel="icon" href="https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg" sizes="any" type="image/svg+xml">
        <?php
    }
}

?>
