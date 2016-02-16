<?php
$referer = isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:'';
$method = isset($_SERVER['REQUEST_METHOD'])?$_SERVER['REQUEST_METHOD']:'';
$requestUri = $_SERVER['REQUEST_URI'];
$redirectUrl = $_SERVER['REDIRECT_URL'];
$home = $_SERVER['SERVER_NAME'];
?>
@extends('layouts.body')

@section('title')
    About
@stop

@section('body')
@include('layouts.menu')
        <div class="container">
            <div class="content">
                <h1 class="title">404</h1>
                @if($method == 'GET' || $method == 'POST')
	                @if($referer)
	                <p><a href="{{$referer}}"><< Go Back</a></p>
	                @endif
                @endif
                <div></div>
                <div>The url requested has not been found ({{$redirectUrl}})</div>
                <div><a href="{{$home}}">Home sweet home</a></div>
                <div>{{$requestUri}}</div>
                <div>{{$e}}</div>
            </div>
        </div>
@stop
