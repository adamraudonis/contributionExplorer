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

$query =  "SELECT * from categories";
header('Content-type: text/plain; charset=us-ascii');
$i=0;
$line="";
 

foreach ($dbh->query($query) as $row) {

	$line=$line.$row["catcode"];
 	$i=$i+1;
 	echo $line."\n";
 	$line="";
}

?>