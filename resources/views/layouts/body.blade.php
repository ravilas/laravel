<?php
/**
 * Creates common globals for the rest of WordPress
 *
 * Sets $pagenow global which is the current page. Checks
 * for the browser to set which one is currently being used.
 *
 * Detects which user environment WordPress is being used on.
 * Only attempts to check for Apache, Nginx and IIS -- three web
 * servers with known pretty permalink capability.
 *
 * Note: Though Nginx is detected, WordPress does not currently
 * generate rewrite rules for it. See https://codex.wordpress.org/Nginx
 *
 * @package WordPress
 */

global $is_lynx, $is_gecko, $is_winIE, $is_macIE, $is_opera, $is_NS4, $is_safari, $is_chrome, $is_iphone, $is_IE,
    $is_apache, $is_IIS, $is_iis7, $is_nginx;

// Simple browser detection
$is_lynx = $is_gecko = $is_winIE = $is_macIE = $is_opera = $is_NS4 = $is_safari = $is_chrome = $is_iphone = false;

if ( isset($_SERVER['HTTP_USER_AGENT']) ) {
    if ( strpos($_SERVER['HTTP_USER_AGENT'], 'Lynx') !== false ) {
        $is_lynx = true;
    } elseif ( stripos($_SERVER['HTTP_USER_AGENT'], 'chrome') !== false ) {
        if ( stripos( $_SERVER['HTTP_USER_AGENT'], 'chromeframe' ) !== false ) {
            $is_admin = is_admin();
            /**
             * Filter whether Google Chrome Frame should be used, if available.
             *
             * @since 3.2.0
             *
             * @param bool $is_admin Whether to use the Google Chrome Frame. Default is the value of is_admin().
             */
            if ( $is_chrome = apply_filters( 'use_google_chrome_frame', $is_admin ) )
                header( 'X-UA-Compatible: chrome=1' );
            $is_winIE = ! $is_chrome;
        } else {
            $is_chrome = true;
        }
    } elseif ( stripos($_SERVER['HTTP_USER_AGENT'], 'safari') !== false ) {
        $is_safari = true;
    } elseif ( ( strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false || strpos($_SERVER['HTTP_USER_AGENT'], 'Trident') !== false ) && strpos($_SERVER['HTTP_USER_AGENT'], 'Win') !== false ) {
        $is_winIE = true;
    } elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false && strpos($_SERVER['HTTP_USER_AGENT'], 'Mac') !== false ) {
        $is_macIE = true;
    } elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'Gecko') !== false ) {
        $is_gecko = true;
    } elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'Opera') !== false ) {
        $is_opera = true;
    } elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'Nav') !== false && strpos($_SERVER['HTTP_USER_AGENT'], 'Mozilla/4.') !== false ) {
        $is_NS4 = true;
    }
}

if ( $is_safari && stripos($_SERVER['HTTP_USER_AGENT'], 'mobile') !== false )
    $is_iphone = true;

$is_IE = ( $is_macIE || $is_winIE );

// Server detection

/**
 * Whether the server software is Apache or something else
 * @global bool $is_apache
 */
$is_apache = (strpos($_SERVER['SERVER_SOFTWARE'], 'Apache') !== false || strpos($_SERVER['SERVER_SOFTWARE'], 'LiteSpeed') !== false);

/**
 * Whether the server software is Nginx or something else
 * @global bool $is_nginx
 */
$is_nginx = (strpos($_SERVER['SERVER_SOFTWARE'], 'nginx') !== false);

/**
 * Whether the server software is IIS or something else
 * @global bool $is_IIS
 */
$is_IIS = !$is_apache && (strpos($_SERVER['SERVER_SOFTWARE'], 'Microsoft-IIS') !== false || strpos($_SERVER['SERVER_SOFTWARE'], 'ExpressionDevServer') !== false);

/**
 * Whether the server software is IIS 7.X or greater
 * @global bool $is_iis7
 */
$is_iis7 = $is_IIS && intval( substr( $_SERVER['SERVER_SOFTWARE'], strpos( $_SERVER['SERVER_SOFTWARE'], 'Microsoft-IIS/' ) + 14 ) ) >= 7;

/**
 * Test if the current browser runs on a mobile device (smart phone, tablet, etc.)
 *
 * @staticvar bool $is_mobile
 *
 * @return bool
 */
function wp_is_mobile() {
    static $is_mobile = null;

    if ( isset( $is_mobile ) ) {
        return $is_mobile;
    }

    if ( empty($_SERVER['HTTP_USER_AGENT']) ) {
        $is_mobile = false;
    } elseif ( strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false // many mobile devices (all iPhone, iPad, etc.)
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false ) {
            $is_mobile = true;
    } else {
        $is_mobile = false;
    }

    return $is_mobile;
}
?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10 blockScroll" <?php //language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js blockScroll" <?php //language_attributes(); ?>> <!--<![endif]-->
<?php
function jeg_get_js_option()
{
    $ismobile = wp_is_mobile();

    // populate option array
    $option = array();
    $option['ismobile'] = $ismobile;

    return $option;
}
?>
<head>
    <title>@yield('title')</title>
    <meta http-equiv="Content-Type" content="; charset=" />
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="" />
    <script type='text/javascript'>
    var joption = <?php echo json_encode(jeg_get_js_option());?>;
    </script>
    <script type="text/javascript">
        var urlQapTchaPHPfile = "{{ URL::asset('Qaptcha.jquery.php') }}";
    </script>
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
                width:100%;
            }

            .content {
                text-align: center;
                display: inline-block;
                width:100%;
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