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
Route::get('movie', 'MovieController@action_index');
Route::get('movie{id}', 'MovieController@view_detail');

// -------------------- Actors ---------------------
Route::get('person', 'PersonController@action_index');
Route::get('person{id}', 'PersonController@view_detail');
