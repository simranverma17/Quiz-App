<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $score = $_POST['score'] ?? '';

    if ($name !== '' && $score !== '') {
        $file = 'leaderboard.csv';


        $isNewFile = !file_exists($file);

        $data = [$name, $score];
        $fp = fopen($file, 'a');

        if ($isNewFile) {
            fputcsv($fp, ['Name', 'Score']);
        }

        fputcsv($fp, $data);
        fclose($fp);
        echo "Saved";
    } else {
        echo "Missing name or score";
    }
}
?>
