<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: X-Requested-With');

date_default_timezone_set('Asia/Kolkata');

function compressImage($source, $destination, $quality)
{
    $imgInfo = getimagesize($source);
    $mime = $imgInfo['mime'];

    switch ($mime) {
        case 'image/jpeg':
            $image = imagecreatefromjpeg($source);
            break;
        case 'image/png':
            $image = imagecreatefrompng($source);
            break;
        case 'image/gif':
            $image = imagecreatefromgif($source);
            break;
        default:
            $image = imagecreatefromjpeg($source);
    }

    imagejpeg($image, $destination, $quality);

    return $destination;
}
$uploadPath = "uploads/";
$allowTypes = array('jpg', 'png', 'jpeg', 'gif', 'tif');


$con = new mysqli('localhost', 'root', '', 'hospital');
//$2y$10$sqahb9LsEFFn/Ig/xsZXkOdax8xoqMSMDP6ehcON8pdSueZNxCxcS

//Default Password: hello admin

if (isset($_GET['api-key'])) {
    $api_key = $_GET['api-key'];
    if (password_verify('legendary', $api_key)) {
        //Main Logic Start

        //Cron Jobs
        $con->query("UPDATE `appointments` SET `confirmed` = '-1' WHERE DATE(`date`) < DATE(NOW()) AND `confirmed` = '0'");

        //Admin
        if (isset($_POST['admin-login'])) {
            $res = array();
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $password = $con->real_escape_string(strip_tags($_POST['password']));

            $user = $con->query("SELECT * FROM `admin` WHERE `email` = '$email'");
            if ($user->num_rows == 1) {
                $user = $user->fetch_assoc();
                if (password_verify($password, $user['password'])) {
                    $res = array('email' => $user['email'], 'name' => $user['name'], 'id' => $user['id']);
                } else {
                    $res = array('status' => 'error', 'description' => 'Invalid Password');
                }
            } else {
                $res = array('status' => 'error', 'description' => 'Invalid Email');
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_POST['add-slider'])) {
            if (!empty($_FILES['file']['name'])) {
                $fileName = rand(1000, 10000) . '-' . basename($_FILES['file']['name']);
                $imageUploadpath = $uploadPath . $fileName;
                $fileType = pathinfo($imageUploadpath, PATHINFO_EXTENSION);
                if (in_array(strtolower($fileType), $allowTypes)) {
                    $imageTemp = $_FILES['file']['tmp_name'];
                    $compressedImage = compressImage($imageTemp, $imageUploadpath, 50);
                    if ($con->query("INSERT INTO `slider` (`image`) VALUES ('$compressedImage')")) {
                        echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
                    }
                } else {
                    echo json_encode(array('status' => 'error', 'description' => 'Invalid Extension'), JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'No File Found!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-sliders'])) {
            $res = array();

            $imgs = $con->query("SELECT * FROM `slider`")->fetch_all(MYSQLI_ASSOC);

            foreach ($imgs as $img) {
                $res[] = $img;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['delete-slider'])) {
            $id = $con->real_escape_string(strip_tags($_GET['delete-slider']));

            $img = $con->query("SELECT * FROM `slider` WHERE `id` = '$id'")->fetch_assoc();
            unlink("./" . $img['image']);

            if ($con->query("DELETE FROM `slider` WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could Not Delete the Image!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['add-doctor-post'])) {
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $description = $con->real_escape_string(strip_tags($_POST['description']));

            if ($con->query("INSERT INTO `doctor-posts` (`name`, `description`) VALUES ('$name', '$description')")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not add post!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-doctor-posts'])) {
            $res = array();

            $posts = $con->query("SELECT * FROM `doctor-posts` ORDER BY `name`")->fetch_all(MYSQLI_ASSOC);

            foreach ($posts as $post) {
                $res[] = $post;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['delete-doctor-post'])) {
            $id = $con->real_escape_string(strip_tags($_GET['delete-doctor-post']));
            if (!$con->query("DELETE FROM `doctor-posts` WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'error', 'description' => 'Could Not Delete Data!'), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['add-admin'])) {
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $password = $con->real_escape_string(strip_tags($_POST['password']));
            $password = password_hash($password, PASSWORD_BCRYPT);

            if ($con->query("INSERT INTO `admin` (`email`, `name`, `password`) VALUES ('$email', '$name', '$password')")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Email Already Exists!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-admins'])) {
            $res = array();

            $admins = $con->query("SELECT `name`, `email`, `id` FROM `admin` ORDER BY `name`")->fetch_all(MYSQLI_ASSOC);

            foreach ($admins as $admin) {
                $res[] = $admin;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['delete-admin'])) {
            $id = $con->real_escape_string(strip_tags($_GET['delete-admin']));

            if ($con->query("DELETE FROM `admin` WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not delete Admin!!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['add-medicine-unit'])) {
            $type = $con->real_escape_string(strip_tags($_POST['type']));
            $type = strtoupper($type);

            if ($con->query("INSERT INTO `medicine-unit` (`type`) VALUES ('$type')")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not add data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-medicine-units'])) {
            $res = array();

            $units = $con->query("SELECT * FROM `medicine-unit` ORDER BY `type`")->fetch_all(MYSQLI_ASSOC);

            foreach ($units as $unit) {
                $res[] = $unit;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['delete-medicine-unit'])) {
            $id = $con->real_escape_string(strip_tags($_GET['delete-medicine-unit']));

            if ($con->query("DELETE FROM `medicine-unit` WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not delete data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['add-medicine'])) {
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $name = ucfirst($name);
            $description = $con->real_escape_string(strip_tags($_POST['description']));
            $type = $con->real_escape_string(strip_tags($_POST['type']));
            $quantity = $con->real_escape_string(strip_tags($_POST['quantity']));

            if ($con->query("INSERT INTO `medicines`(`name`, `description`, `type`, `quantity`) VALUES ('$name','$description','$type','$quantity')")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not add data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-medicines'])) {
            $res = array();

            $meds = $con->query("SELECT * FROM `medicines` ORDER BY `id` DESC")->fetch_all(MYSQLI_ASSOC);

            foreach ($meds as $med) {
                $res[] = $med;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_POST['update-medicine'])) {
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $name = ucfirst($name);
            $description = $con->real_escape_string(strip_tags($_POST['description']));
            $type = $con->real_escape_string(strip_tags($_POST['type']));
            $quantity = $con->real_escape_string(strip_tags($_POST['quantity']));
            $id = $con->real_escape_string(strip_tags($_POST['id']));

            if ($con->query("UPDATE `medicines` SET `name`='$name',`description`='$description',`type`='$type',`quantity`='$quantity' WHERE `id`='$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not update data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['delete-medicine'])) {
            $id = $con->real_escape_string(strip_tags($_GET['delete-medicine']));

            if ($con->query("DELETE FROM `medicines` WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not delete data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['search-medicines'])) {
            $res = array();
            $search = $con->real_escape_string(strip_tags($_GET['search-medicines']));

            $meds = $con->query("SELECT * FROM `medicines` WHERE `name` LIKE '%$search%' OR `type` LIKE '%$search%'")->fetch_all(MYSQLI_ASSOC);
            foreach ($meds as $med) {
                $res[] = $med;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_POST['add-receptionist'])) {
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $dob = $con->real_escape_string(strip_tags($_POST['dob']));
            $gender = $con->real_escape_string(strip_tags($_POST['gender']));
            $password = password_hash('hello admin', PASSWORD_BCRYPT);

            if ($con->query("INSERT INTO `receptionist`(`name`, `email`, `password`, `dob`, `gender`) VALUES ('$name','$email','$password','$dob','$gender')")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not Add Receptionist Data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-receptionists'])) {
            $res = array();

            $users = $con->query("SELECT * FROM `receptionist` ORDER BY `name`")->fetch_all(MYSQLI_ASSOC);
            foreach ($users as $user) {
                $res[] = $user;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_POST['update-receptionist'])) {
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $dob = $con->real_escape_string(strip_tags($_POST['dob']));
            $gender = $con->real_escape_string(strip_tags($_POST['gender']));
            $id = $con->real_escape_string(strip_tags($_POST['id']));

            if ($con->query("UPDATE `receptionist` SET `name`='$name',`email`='$email',`dob`='$dob',`gender`='$gender' WHERE `id`='$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not Update Receptionist Data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['search-receptionists'])) {
            $res = array();
            $search = $con->real_escape_string(strip_tags($_GET['search-receptionists']));
            $users = $con->query("SELECT * FROM `receptionist` WHERE `name` LIKE '%$search%' ORDER BY `name`")->fetch_all(MYSQLI_ASSOC);
            foreach ($users as $user) {
                $res[] = $user;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['delete-receptionist'])) {
            $id = $con->real_escape_string(strip_tags($_GET['delete-receptionist']));

            if ($con->query("DELETE FROM `receptionist` WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not delete data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['add-doctor'])) {
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $password = password_hash('hello admin', PASSWORD_BCRYPT);
            $gender = $con->real_escape_string(strip_tags($_POST['gender']));
            $postId = $con->real_escape_string(strip_tags($_POST['postId']));
            $fees = $con->real_escape_string(strip_tags($_POST['fees']));
            $mobile = $con->real_escape_string(strip_tags($_POST['mobile']));
            $experience = $con->real_escape_string(strip_tags($_POST['experience']));
            $open_time = $con->real_escape_string(strip_tags($_POST['open_time']));
            $close_time = $con->real_escape_string(strip_tags($_POST['close_time']));

            if ($con->query("INSERT INTO `doctors`(`name`, `email`, `password`, `gender`, `postId`, `fees`, `mobile`, `experience`, `open_time`, `close_time`) VALUES ('$name','$email','$password','$gender','$postId','$fees','$mobile','$experience','$open_time','$close_time')")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not Add Doctor Data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-doctors'])) {
            $res = array();

            $users = $con->query("SELECT d.*, p.`name` AS `post` FROM `doctors` d, `doctor-posts` p WHERE d.`postId` = p.`id` ORDER BY d.`name`")->fetch_all(MYSQLI_ASSOC);

            foreach ($users as $user) {
                $res[] = $user;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['search-doctors'])) {
            $res = array();
            $search = $con->real_escape_string(strip_tags($_GET['search-doctors']));

            $users = $con->query("SELECT d.*, p.`name` AS `post` FROM `doctors` d, `doctor-posts` p WHERE d.`postId` = p.`id` AND ( d.`name` LIKE '%$search%' OR p.`name` LIKE '%$search%' ) ORDER BY d.`name`")->fetch_all(MYSQLI_ASSOC);

            foreach ($users as $user) {
                $res[] = $user;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['delete-doctor'])) {
            $id = $con->real_escape_string(strip_tags($_GET['delete-doctor']));

            if ($con->query("DELETE FROM `doctors` WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not Delete Doctor Data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['update-doctor'])) {
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $password = password_hash('hello admin', PASSWORD_BCRYPT);
            $gender = $con->real_escape_string(strip_tags($_POST['gender']));
            $postId = $con->real_escape_string(strip_tags($_POST['postId']));
            $fees = $con->real_escape_string(strip_tags($_POST['fees']));
            $mobile = $con->real_escape_string(strip_tags($_POST['mobile']));
            $experience = $con->real_escape_string(strip_tags($_POST['experience']));
            $open_time = $con->real_escape_string(strip_tags($_POST['open_time']));
            $close_time = $con->real_escape_string(strip_tags($_POST['close_time']));
            $id = $con->real_escape_string(strip_tags($_POST['id']));

            if ($con->query("UPDATE `doctors` SET `name`='$name',`email`='$email',`gender`='$gender',`postId`='$postId',`fees`='$fees',`mobile`='$mobile',`experience`='$experience',`open_time`='$open_time',`close_time`='$close_time' WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not Update Doctor Data!'), JSON_PRETTY_PRINT);
            }
        }

        //Patient
        else if (isset($_POST['add-patient'])) {
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $password = $con->real_escape_string(strip_tags($_POST['password']));
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $dob = $con->real_escape_string(strip_tags($_POST['dob']));
            $gender = $con->real_escape_string(strip_tags($_POST['gender']));
            $mobile = $con->real_escape_string(strip_tags($_POST['mobile']));
            $address = $con->real_escape_string(strip_tags($_POST['address']));

            $password = password_hash($password, PASSWORD_BCRYPT);

            if (filter_var($email, FILTER_VALIDATE_EMAIL) && $con->query("INSERT INTO `patient`(`email`, `password`, `name`, `dob`, `gender`, `mobile`, `address`) VALUES ('$email','$password','$name','$dob','$gender','$mobile','$address')")) {

                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Invalid Email or Email already Exists'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['update-patient'])) {
            $id = $con->real_escape_string(strip_tags($_POST['id']));
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $name = $con->real_escape_string(strip_tags($_POST['name']));
            $gender = $con->real_escape_string(strip_tags($_POST['gender']));
            $mobile = $con->real_escape_string(strip_tags($_POST['mobile']));
            $address = $con->real_escape_string(strip_tags($_POST['address']));

            if (filter_var($email, FILTER_VALIDATE_EMAIL) && $con->query("UPDATE `patient` SET `name`='$name',`email`='$email',`gender`='$gender',`mobile`='$mobile',`address`='$address' WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Could not Update Patient Data!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['update-patient-image'])) {
            $id = $con->real_escape_string(strip_tags($_POST['id']));
            $img = $con->query("SELECT `image` FROM `patient` WHERE `id` = '$id'")->fetch_assoc()['image'];
            if (!empty($_FILES['file']['name'])) {
                if ($img != 'uploads/default.png') {
                    unlink("./" . $img);
                }
                $fileName = rand(1000, 10000) . '-' . basename($_FILES['file']['name']);
                $imageUploadpath = $uploadPath . $fileName;
                $fileType = pathinfo($imageUploadpath, PATHINFO_EXTENSION);
                if (in_array(strtolower($fileType), $allowTypes)) {
                    $imageTemp = $_FILES['file']['tmp_name'];
                    $compressedImage = compressImage($imageTemp, $imageUploadpath, 50);
                    if ($con->query("UPDATE `patient` SET `image` = '$compressedImage' WHERE `id` = '$id'")) {
                        echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
                    }
                } else {
                    echo json_encode(array('status' => 'error', 'description' => 'Invalid Extension'), JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(array('status' => 'success', 'description' => 'No File Found!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['change-patient-password'])) {
            $cpass = $con->real_escape_string(strip_tags($_POST['cpass']));
            $npass1 = $con->real_escape_string(strip_tags($_POST['npass1']));
            $npass2 = $con->real_escape_string(strip_tags($_POST['npass2']));
            $id = $con->real_escape_string(strip_tags($_POST['id']));

            $password = $con->query("SELECT `password` FROM `patient` WHERE `id` = '$id'")->fetch_assoc()['password'];
            if (password_verify($cpass, $password) && $npass1 === $npass2) {
                $password = password_hash($npass1, PASSWORD_BCRYPT);
                if ($con->query("UPDATE `patient` SET `password` = '$password' WHERE `id` = '$id'")) {
                    echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
                } else {
                    echo json_encode(array('status' => 'error', 'description' => 'Could not update Password!'), JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Passwords do not match!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['patient-login'])) {
            $res;
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $password = $con->real_escape_string(strip_tags($_POST['password']));

            $user = $con->query("SELECT * FROM `patient` WHERE `email` = '$email'");
            if ($user->num_rows == 1) {
                $user = $user->fetch_assoc();
                if (password_verify($password, $user['password'])) {
                    $res = array('status' => 'success', 'description' => $email);
                } else {
                    $res = array('status' => 'error', 'description' => 'Invalid Password');
                }
            } else {
                $res = array('status' => 'error', 'description' => 'Invalid Email');
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-patient'])) {
            $res = array();
            $email = $con->real_escape_string(strip_tags($_GET['get-patient']));
            $user = $con->query("SELECT `id`, `email`, `name`, `dob`, `gender`, `mobile`, `address`, `image`, FLOOR(DATEDIFF(CURDATE(), `dob`)/365.25) AS `age` FROM `patient` WHERE `email` = '$email'");
            $rows = $user->num_rows;

            if ($rows == 1) {
                $user = $user->fetch_assoc();
                $res = $user;
            }
            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_POST['add-appointment'])) {
            $date = $con->real_escape_string(strip_tags($_POST['date']));
            $time = $con->real_escape_string(strip_tags($_POST['time']));
            $postId = $con->real_escape_string(strip_tags($_POST['postId']));
            $doctorId = $con->real_escape_string(strip_tags($_POST['doctorId']));
            $remarks = $con->real_escape_string(strip_tags($_POST['remarks']));
            $patientId = $con->real_escape_string(strip_tags($_POST['patientId']));

            if ($con->query("INSERT INTO `appointments`(`date`, `time`, `postId`, `doctorId`, `remarks`, `patientId`) VALUES ('$date','$time','$postId','$doctorId','$remarks','$patientId')")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'There was an error creating appointemnt!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-appointments'])) {
            $patientId = $con->real_escape_string(strip_tags($_GET['get-appointments']));

            $appointments = $con->query("SELECT a.*, d.`name` AS `doctorName` FROM `appointments` a INNER JOIN `doctors` d ON d.`id` = a.`doctorId` WHERE a.`patientId` = '$patientId'")->fetch_all(MYSQLI_ASSOC);
            echo json_encode($appointments, JSON_PRETTY_PRINT);
        }

        //Receptionist
        else if (isset($_POST['receptionist-login'])) {
            $res = array();
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $password = $con->real_escape_string(strip_tags($_POST['password']));

            $user = $con->query("SELECT * FROM `receptionist` WHERE `email` = '$email'");
            if ($user->num_rows == 1) {
                $user = $user->fetch_assoc();
                if (password_verify($password, $user['password'])) {
                    $res = array('email' => $user['email'], 'name' => $user['name'], 'id' => $user['id']);
                } else {
                    $res = array('status' => 'error', 'description' => 'Invalid Password');
                }
            } else {
                $res = array('status' => 'error', 'description' => 'Invalid Email');
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-receptionist'])) {
            $email = $con->real_escape_string(strip_tags($_GET['get-receptionist']));

            $user = $con->query("SELECT * FROM `receptionist` WHERE `email` = '$email'")->fetch_assoc();

            echo json_encode($user, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-pending-appointments'])) {
            $res = array();

            $appointments = $con->query("SELECT * FROM `appointments` WHERE `confirmed` = '0' ORDER BY `date`")->fetch_all(MYSQLI_ASSOC);

            foreach ($appointments as $app) {
                $appId = $app['patientId'];
                $patient = $con->query("SELECT p.* FROM `patient` p, `appointments` a WHERE a.`patientId` = '$appId'")->fetch_assoc();
                $res[] = $app + array('patient' => $patient);
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_POST['update-appointment'])) {
            $date = $con->real_escape_string(strip_tags($_POST['date']));
            $time = $con->real_escape_string(strip_tags($_POST['time']));
            $postId = $con->real_escape_string(strip_tags($_POST['postId']));
            $doctorId = $con->real_escape_string(strip_tags($_POST['doctorId']));
            $remarks = $con->real_escape_string(strip_tags($_POST['remarks']));
            $id = $con->real_escape_string(strip_tags($_POST['id']));

            if ($con->query("UPDATE `appointments` SET `date`='$date',`time`='$time',`postId`='$postId',`doctorId`='$doctorId',`remarks`='$remarks',`confirmed`='1' WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'There was an error updating appointemnt!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['cancel-appointment'])) {
            $id = $con->real_escape_string(strip_tags($_GET['cancel-appointment']));

            if ($con->query("UPDATE `appointments` SET `confirmed`='-1' WHERE `id` = '$id'")) {
                echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'There was an error updating appointemnt!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-doctor'])) {
            $id = $con->real_escape_string(strip_tags($_GET['get-doctor']));

            $user = $con->query("SELECT d.*, dp.`name` AS `post` FROM `doctors` d, `doctor-posts` dp WHERE d.id = '$id' AND d.`postId` = dp.`id`")->fetch_assoc();
            echo json_encode($user, JSON_PRETTY_PRINT);
        } else if (isset($_POST['change-receptionist-password'])) {
            $cpass = $con->real_escape_string(strip_tags($_POST['cpass']));
            $npass1 = $con->real_escape_string(strip_tags($_POST['npass1']));
            $npass2 = $con->real_escape_string(strip_tags($_POST['npass2']));
            $id = $con->real_escape_string(strip_tags($_POST['id']));

            $password = $con->query("SELECT `password` FROM `receptionist` WHERE `id` = '$id'")->fetch_assoc()['password'];
            if (password_verify($cpass, $password) && $npass1 === $npass2) {
                $password = password_hash($npass1, PASSWORD_BCRYPT);
                if ($con->query("UPDATE `receptionist` SET `password` = '$password' WHERE `id` = '$id'")) {
                    echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
                } else {
                    echo json_encode(array('status' => 'error', 'description' => 'Could not update Password!'), JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Passwords do not match!'), JSON_PRETTY_PRINT);
            }
        }

        //Doctor
        else if (isset($_POST['doctor-login'])) {
            $res = array();
            $email = $con->real_escape_string(strip_tags($_POST['email']));
            $password = $con->real_escape_string(strip_tags($_POST['password']));

            $user = $con->query("SELECT * FROM `doctors` WHERE `email` = '$email'");
            if ($user->num_rows == 1) {
                $user = $user->fetch_assoc();
                if (password_verify($password, $user['password'])) {
                    $res = array('email' => $user['email'], 'name' => $user['name'], 'id' => $user['id']);
                } else {
                    $res = array('status' => 'error', 'description' => 'Invalid Password');
                }
            } else {
                $res = array('status' => 'error', 'description' => 'Invalid Email');
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-my-appointments'])) {
            $res = array();
            $id = $con->real_escape_string(strip_tags($_GET['get-my-appointments']));
            $appointments = $con->query("SELECT * FROM `appointments` WHERE `confirmed` = '1' AND `doctorId` = '$id' AND `date` = DATE(NOW())")->fetch_all(MYSQLI_ASSOC);

            foreach ($appointments as $app) {
                $appId = $app['patientId'];
                $patient = $con->query("SELECT p.* FROM `patient` p, `appointments` a WHERE a.`patientId` = '$appId'")->fetch_assoc();
                $res[] = $app + array('patient' => $patient);
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-medicine-type'])) {
            $name = $con->real_escape_string(strip_tags($_GET['get-medicine-type']));

            $res = $con->query("SELECT DISTINCT `type` FROM `medicines` WHERE `name` = '$name'")->fetch_all(MYSQLI_ASSOC);
            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-distinct-medicines'])) {
            $res = array();

            $meds = $con->query("SELECT DISTINCT `name` FROM `medicines` ORDER BY `id` DESC")->fetch_all(MYSQLI_ASSOC);

            foreach ($meds as $med) {
                $res[] = $med;
            }

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-doctor-medicine'])) {
            $name = $con->real_escape_string(strip_tags($_GET['name']));
            $type = $con->real_escape_string(strip_tags($_GET['type']));

            $res = $con->query("SELECT * FROM `medicines` WHERE `name` = '$name' AND `type` = '$type'")->fetch_assoc();

            echo json_encode($res, JSON_PRETTY_PRINT);
        } else if (isset($_POST['create-prescription'])) {
            $patientId = $con->real_escape_string(strip_tags($_POST['patientId']));
            $doctorId = $con->real_escape_string(strip_tags($_POST['doctorId']));
            $doctorRemark = $con->real_escape_string(strip_tags($_POST['doctorRemark']));
            $counter = $con->real_escape_string(strip_tags($_POST['counter']));
            $appointmentId = $con->real_escape_string(strip_tags($_POST['appointmentId']));
            $flag = true;

            for ($i = 0; $i < (int)($counter); $i++) {
                $name = $con->real_escape_string(strip_tags($_POST['name'][$i]));
                $type = $con->real_escape_string(strip_tags($_POST['type'][$i]));
                $quantity = $con->real_escape_string(strip_tags($_POST['quantity'][$i]));
                $description = $con->real_escape_string(strip_tags($_POST['description'][$i]));

                $med = $con->query("SELECT * FROM `medicines` WHERE `name` = '$name' AND `type` = '$type'")->fetch_assoc();

                if ($quantity > (int)($med['quantity'])) {
                    $flag = false;
                    break;
                } else {
                    $con->query("INSERT INTO `prescriptions`(`doctorId`, `patientId`, `name`, `type`, `quantity`, `description`, `appointmentId`) VALUES ('$doctorId', '$patientId', '$name', '$type', '$quantity', '$description', '$appointmentId')");
                    $new_quantity = (int)($med['quantity']) - (int)($quantity);
                    $con->query("UPDATE `medicines` SET `quantity` = '$new_quantity' WHERE `name` = '$name' AND `type` = '$type'");
                }
            }


            if ($flag) {
                if ($con->query("UPDATE `appointments` SET `confirmed`='2' WHERE `id`='$appointmentId'")) {
                    if ($doctorRemark || $doctorRemark != '') {
                        $con->query("INSERT INTO `doctor-remarks`(`patientId`, `doctorId`, `remarks`) VALUES ('$patientId','$doctorId','$doctorRemark')");
                    }
                    echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
                } else {
                    echo json_encode(array('status' => 'error', 'description' => 'There was an error!'), JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Quantity exceeds available resource!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_POST['change-doctor-password'])) {
            $cpass = $con->real_escape_string(strip_tags($_POST['cpass']));
            $npass1 = $con->real_escape_string(strip_tags($_POST['npass1']));
            $npass2 = $con->real_escape_string(strip_tags($_POST['npass2']));
            $id = $con->real_escape_string(strip_tags($_POST['id']));

            $password = $con->query("SELECT `password` FROM `doctors` WHERE `id` = '$id'")->fetch_assoc()['password'];
            if (password_verify($cpass, $password) && $npass1 === $npass2) {
                $password = password_hash($npass1, PASSWORD_BCRYPT);
                if ($con->query("UPDATE `doctors` SET `password` = '$password' WHERE `id` = '$id'")) {
                    echo json_encode(array('status' => 'success', 'description' => ''), JSON_PRETTY_PRINT);
                } else {
                    echo json_encode(array('status' => 'error', 'description' => 'Could not update Password!'), JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode(array('status' => 'error', 'description' => 'Passwords do not match!'), JSON_PRETTY_PRINT);
            }
        } else if (isset($_GET['get-prescription'])) {
            $id = $con->real_escape_string(strip_tags($_GET['get-prescription']));

            $app = $con->query("SELECT a.*, d.`name` AS `doctorName`, d.`fees` FROM `appointments` a INNER JOIN `doctors` d ON d.`id` = a.`doctorId` WHERE a.`id` = '$id'")->fetch_assoc();
            $prescriptions = $con->query("SELECT * FROM `prescriptions` WHERE `appointmentId` = '$id'")->fetch_all(MYSQLI_ASSOC);
            $app += array( 'prescriptions' => $prescriptions);
            
            echo json_encode($app, JSON_PRETTY_PRINT);
        } else if (isset($_GET['get-doctor-remarks'])) {
            $id = $con->real_escape_string(strip_tags($_GET['get-doctor-remarks']));

            $res = $con->query("SELECT `remarks` FROM `doctor-remarks` WHERE `patientId` = '$id'")->fetch_all(MYSQLI_ASSOC);
            echo json_encode($res, JSON_PRETTY_PRINT);
        }

        //Main Logic End
    } else {
        echo json_encode(array('status' => 'error', 'description' => 'Invalid Api Key Found!'), JSON_PRETTY_PRINT);
    }
} else {
    echo json_encode(array('status' => 'error', 'description' => 'No Api Key Found!'), JSON_PRETTY_PRINT);
}

$con->close();
