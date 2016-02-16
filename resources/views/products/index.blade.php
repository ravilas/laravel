@extends('layouts.body')

@section('title')
    Main
@stop

@section('body')
@include('layouts.menu')
        <div class="container">
            <div class="content">
                <div class="title">Main</div>
                @foreach($products as $product)
                    <div>
                    	<h1>{{$product->login}}</h1>
                    	<p>{{$product->ranking_value}}</p>
                    </div>
                @endforeach
            </div>
        </div>
@stop
