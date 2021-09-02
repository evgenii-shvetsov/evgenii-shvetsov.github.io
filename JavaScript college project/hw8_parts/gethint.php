<?php
// Array with names
$a[] = "Anna";
$a[] = "Amelia";
$a[] = "Brittany";
$a[] = "Bob";
$a[] = "Cinderella";
$a[] = "Charlie";
$a[] = "Diana";
$a[] = "Danielle";
$a[] = "Eva";
$a[] = "Edward";
$a[] = "Fiona";
$a[] = "Floyd";
$a[] = "Gunda";
$a[] = "George";
$a[] = "Hege";
$a[] = "Hue";
$a[] = "Inga";
$a[] = "Iman";
$a[] = "Johanna";
$a[] = "Jacob";
$a[] = "Kitty";
$a[] = "Kale";
$a[] = "Linda";
$a[] = "Larry";
$a[] = "Nina";
$a[] = "Naomi";
$a[] = "Ophelia";
$a[] = "Odin";
$a[] = "Petunia";
$a[] = "Pamella";
$a[] = "Amanda";
$a[] = "Anthony";
$a[] = "Raquel";
$a[] = "Rob";
$a[] = "Cindy";
$a[] = "Chris";
$a[] = "Doris";
$a[] = "Don";
$a[] = "Eve";
$a[] = "Evgenii";
$a[] = "Evita";
$a[] = "Elon";
$a[] = "Sunniva";
$a[] = "Sammuel";
$a[] = "Tove";
$a[] = "Tony";
$a[] = "Unni";
$a[] = "Ube";
$a[] = "Violet";
$a[] = "Vladimir";
$a[] = "Liza";
$a[] = "Lam";
$a[] = "Elizabeth";
$a[] = "Ellen";
$a[] = "Wenche";
$a[] = "Walter";
$a[] = "Vicky";
$a[] = "Vincent";

// get the q parameter from URL
$q = $_REQUEST["q"];

$hint = "";

// lookup all hints from array if $q is different from ""
if ($q !== "") {
  $q = strtolower($q);
  $len=strlen($q);
  foreach($a as $name) {
    if (stristr($q, substr($name, 0, $len))) {
      if ($hint === "") {
        $hint = $name;
      } else {
        $hint .= ", $name";
      }
    }
  }
}

// Output "no suggestion" if no hint was found or output correct values
echo $hint === "" ? "no suggestion" : $hint;
?>