<?php

$dbh;
try 
{
    /*** connect to SQLite database ***/

    $dbh = new PDO("sqlite:db/test.db");

}
catch(PDOException $e)
{
    echo $e->getMessage();
    echo "<br><br>Database -- NOT -- loaded successfully .. ";
    die( "<br><br>Query Closed !!! $error");
}
$search = htmlspecialchars($_GET["name"]);
$query =  "SELECT * from contributions WHERE recipient_name LIKE '%".$search."%'";
header('Content-type: text/plain; charset=us-ascii');
$i=0;
$line="";
console.log($query);
foreach ($dbh->query($query) as $row) {
   $line=$line.$row[0];
   $i=$i+1;
   echo $line."\n";
   $line="";
}

?>
