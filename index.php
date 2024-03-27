<?php

// Simple router example
switch ($_SERVER['REQUEST_URI']) {
    case '/backend/authentication/auth':
        require 'backend/authentication/auth.php';
        break;
    case '/backend/comment/comment':
        require 'backend/comment/comment.php';
        break;
    case '/backend/likedislike/likeDislike':
        require 'backend/likedislike/likeDislike.php';
        break;
    case '/backend/login':
        require 'backend/login/login.php';
        break;
    case '/backend/logout/logout':
        require 'backend/logout/logout.php';
        break;
    case '/backend/register/register':
        require 'backend/register/register.php';
        break;
    case '/backend/removeuser/remove':
        require 'backend/removeuser/remove.php';
        break;
    case '/backend/searchAlgorithm/search':
        require 'backend/searchAlgorithm/search.php';
        break;
    case '/backend/searchFilter/searchFilter':
        require 'backend/searchFilter/searchFilter.php';
        break;
    case '/backend/sendemail/send':
        require 'backend/sendemail/send.php';
        break;
    case '/backend/sendmessage/message':
        require 'backend/sendmessage/message.php';
        break;

        // You should add all necessary routes here following the directory structure

    default:
        header('HTTP/1.0 404 Not Found');
        echo '404 Not Found';
        break;
}
