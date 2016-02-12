<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js blockScroll" <?php //language_attributes(); ?>> <!--<![endif]-->
<?php
function get_site_url() {
    return '';
}
?>
<head>
    <title>@yield('tile')</title>
    <meta http-equiv="Content-Type" content="; charset=" />
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="" />
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Helvetica, Arial, calibri';
                color:#333;
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
            #routeId {
                background-color:red;
                color:white;
                font: 600;
            }
        </style>
</head>
<body>
<!--[if lt IE 9]>
    <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
<![endif]-->
<div class="jviewport">
    <div class="container">
        <div class="containerwrapper">
            <div id="rightsidecontainer">
                <div class="contentholder">
                    <div class="content">
@yield('body')

@include('layouts.footer')