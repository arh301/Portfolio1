<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
<link href="styles.css" rel="stylesheet" type="text/css">
<style type="text/css">
#returnbutton {
	font-family:Segoe, "Segoe UI", "DejaVu Sans", "Trebuchet MS", Verdana, sans-serif;
	color:hsla(0,0%,9%,1.00);
	background-color:hsla(48,81%,59%,1.00);
	width:280px;
	font-size:18px;
	font-weight:bold;
	text-align:center;
	height:26px;
	border-width:medium;
	border-color:hsla(141,75%,29%,1.00);
	width: 300px;
   height: 110px;
   position: absolute;
   left: 50%;
   top: 50%; 
   margin-left: -150px;
   margin-top: -150px;
}
</style>
</head>
<?php
if(isset($_POST['submit'])){
	
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];
//Validate first
if(empty($name)||empty($visitor_email)) 
{
	
 echo "<script type=\"text/javascript\">window.alert('Please fill in Name and Email fields before submitting');window.location.href = 'contact.html';</script>";
 exit;
    
}
else{

 
$email_from = $visitor_email;
$email_subject = "New portfolio message";
$email_body = "You have received a new message from $name.\n".
    "Email address: $visitor_email\n".
    "Here is the message:\n $message";
     
$to = "annaraehughes@live.co.uk";
$headers = "From: $email_from \r\n";
 
//Send the email!
mail($to,$email_subject,$email_body,$headers);

//done. redirect to gight after 2000ms on thank you page.
echo "<script>setTimeout(\"location.href = '';\",2000);</script>";
}
}

</script>"; 

?> 
<body>
<div id = "returnbutton">
  <p>Thank you for contacting me, I shall respond as soon as possible. </p>
  <p>Returning...</p>
</div>
</body>
</html>