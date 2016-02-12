<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('welcome', function () {
    return view('welcome');
});

Route::get('/'
	, ['as' => 'Main'
		, 'uses' => 'PagesController@getIndex']);
Route::get('about'
	, ['as' => 'about'
		, 'uses' => 'PagesController@getAbout']);
Route::get('about/{id}'
	, ['as' => 'aboutId'
		, 'uses' => 'PagesController@getAboutId']);
Route::get('help/contact'
	, ['as' => 'help'
		, 'uses' => 'PagesController@getContact']);
Route::get('help'
	, ['as' => 'help'
		, 'uses' => 'PagesController@getHelp']);
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});
