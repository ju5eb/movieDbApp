<?php

/**
 * ActorsController Class
 *
 * Implements actions regarding actors management
 */
class PersonController extends Controller
{
    /**
    * Get the index page of actor's module
    */
    public function action_index()
    {   
        // Create the actors view
        return View::make('person.index');
    }    

    /**
    * Get the detail page of actor's module
    */
    public function view_detail($id)
    {   
        // Create the detail view
        return View::make('person.view');
    }  
}
