<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

// -------------------- Dashboard ---------------------
Route::get('/', function()
{
	return View::make('dashboard');
});

// -------------------- Movies ---------------------
Route::get('movies', 'MoviesController@action_index');
Route::get('movies/view{id}', 'MoviesController@action_view');

// -------------------- Actors ---------------------
Route::get('actors', 'ActorsController@action_index');
