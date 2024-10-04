<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "Avijit@2004";
$dbname = "attendance";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $date = $_POST['date'];
    $time = $_POST['time'];
    $am_pm = $_POST['amPm'];
    $class_name = $_POST['className'];
    $class_type = $_POST['classType'];
    $attendance = json_decode($_POST['attendance'], true);

    // Insert data into database
    foreach ($attendance as $record) {
        $roll_number = $record['rollNumber'];
        $student_name = $record['studentName'];
        $present = $record['present'];

        $sql = "INSERT INTO attendance_records (date, time, am_pm, class_name, class_type, roll_number, student_name, present)
                VALUES ('$date', '$time', '$am_pm', '$class_name', '$class_type', '$roll_number', '$student_name', '$present')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

// Close connection
$conn->close();
?>

