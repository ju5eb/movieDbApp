<?php

/**
 * MoviesController Class
 *
 * Implements actions regarding movies management
 */
class MovieController extends Controller
{
    /**
    * Get the index page of movie's module
    */
    public function action_index()
    {   
        // Create the movies view
        return View::make('movie.index');
    }

    /**
    * Get the detail page of movie's module
    */
    public function view_detail($id)
    {   
        // Create the detail view
        return View::make('movie.view');
    }      
}