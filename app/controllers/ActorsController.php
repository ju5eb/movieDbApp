<?php

/**
 * ActorsController Class
 *
 * Implements actions regarding actors management
 */
class ActorsController extends Controller
{

    /**
    * Get the index page of actor's module
    */
    public function action_index()
    {   
        // Create the actors view
        return View::make('actors.index');
    }    
}
