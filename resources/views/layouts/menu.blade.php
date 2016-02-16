<div>
	<a href="/">Home</a>
	<a href="/about">About</a>
	<a href="/about/35">About id 35</a>
	<a href="/aboutAuth/35">about Auth id 35</a>
	<a href="/help">Help</a>
	<a href="/help/contact">Contact</a>
	<a href="/tv">TV</a>
	<a href="/login">Login</a>
<?php
/*GET	/{{$model}}	index	{{$model}}.index
GET	/{{$model}}/create	create	{{$model}}.create
POST	/{{$model}}	store	{{$model}}.store
GET	/{{$model}}/1	show	{{$model}}.show
GET	/{{$model}}/1/edit	edit	{{$model}}.edit
PUT/PATCH	/{{$model}}/1	update	{{$model}}.update
DELETE	/{{$model}}/1	destroy	{{$model}}.destroy*/
	$RestModels = ['product','image'];
?>
                @foreach($RestModels as $model)
                    <div>
                    	<a href="/{{$model}}">{{$model}}</a>
                    	<a href="/{{$model}}/create">{{$model}}</a>
                    	<a href="/{{$model}}/1">{{$model}} 1</a>
                    	<a href="/{{$model}}/1/edit">Edit {{$model}} 1</a>
                    </div>
                @endforeach
</div>