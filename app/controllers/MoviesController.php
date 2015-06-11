<?php

/**
 * MoviesController Class
 *
 * Implements actions regarding movies management
 */
class MoviesController extends Controller
{
    /**
    * Get the index page of movie's module
    */
    public function action_index()
    {   
        // Create the movies view
        return View::make('movies.index');
    }   
}