<?php
$rows = [];

if (($handle = fopen("leaderboard.csv", "r")) !== false) {
    $isFirst = true;
    while (($data = fgetcsv($handle)) !== false) {
        if ($isFirst) {
            $isFirst = false;
            continue;
        }
        if (count($data) >= 2) {
            $rows[] = ["name" => $data[0], "score" => (int)$data[1]];
        }
    }
    fclose($handle);

    usort($rows, function ($a, $b) {
        return $b["score"] - $a["score"];
    });

    echo "<ol>";
    foreach (array_slice($rows, 0, 10) as $row) {
        echo "<li>" . htmlspecialchars($row['name']) . " - " . $row['score'] . "</li>";
    }
    echo "</ol>";
}
?>
