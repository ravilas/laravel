@extends('layouts.body')

@section('title')
    About {{$id}}
@stop

@section('body')
@include('layouts.menu')
        <div class="container">
            <div class="content">
                <div class="title">about</div>
                <div class="title" id='routeId'>{{$id}}</div>
                @if($isUserRegistered == true)
                <p>Hi</p>
                @else
                <p>Please register!</p>
                @endif
                <div>
                    <?php
                    for ($i = 0; $i < $id; $i++) {
                        echo ($i!=0 ? ', ' : '').($i+1);
                    }
                    ?>
                </div>
                <div>
                    @for ($i = 0; $i < $id; $i++)
                        {{ ($i!=0 ? ', ' : '').($i+1) }}
                    @endfor
                </div>
                <div>
                    @foreach ($arrFE as $k => $v)
                        <p>This is {{$k}} my val is {{ $v }}</p>
                    @endforeach
                </div>
            </div>
        </div>
@stop
