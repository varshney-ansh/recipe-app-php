<?php

class Head{
    public static function render(String $title = "TasteAI | Powered by Slew"): void {
        ?>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <base href="/">
            <title><?php echo $title; ?></title>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet">
            <link rel="stylesheet" href="/output.css">
             <link rel="icon" type="image/x-icon" href="./logob.png">
             <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
            <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
                rel="stylesheet">
             <link rel="icon" href="https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg" sizes="any" type="image/svg+xml">
        <?php
    }
}

?>
