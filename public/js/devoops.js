//
//    Main script of DevOOPS v1.0 Bootstrap Theme
//
"use strict";

//
//  Function for load content from url and put in "divName" block
//  Created by DevOOPS.
//
function LoadAjaxContent(url, contentDiv, loadingDiv){
	contentDiv = typeof(contentDiv) != 'undefined' ? contentDiv : '#ajax-content';
	loadingDiv = typeof(loadingDiv) != 'undefined' ? loadingDiv : '.preloader';	
	
	$(loadingDiv).show();
	
	$.ajax({
		mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
		url: url,
		type: 'GET',
		success: function(data) {
			// Set the view data
			$(contentDiv).html(data);			
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		},
		dataType: "html",
		async: false
	});	

	// Create Data Table component
	CreateDataTable();

	// Click function for search actors
	$('#searchActorsButton').on('click',function(e){	
		// Load data from API
		LoadData('person');
	});

	// Click function for search movies
	$('#searchMoviesButton').on('click',function(e){
		// Load data from API
		LoadData('movie');
	});

	// Hide the loading div
	$(loadingDiv).hide();
}

//
//  Function set min-height of window (required for this theme)
//  Created by DevOOPS.
//
function SetMinBlockHeight(elem){
	elem.css('min-height', window.innerHeight - 50);
}

//
//  Helper for open ModalBox with requested header, content and bottom
// 	Created by DevOOPS.
//
function OpenModalBox(header, inner, bottom){
	var modalbox = $('#modalbox');
	modalbox.find('.modal-header-name span').html(header);
	modalbox.find('.devoops-modal-inner').html(inner);
	modalbox.find('.devoops-modal-bottom').html(bottom);
	modalbox.fadeIn('fast');
	$('body').addClass("body-expanded");
}

//
//  Close modalbox
//  Created by DevOOPS.
//
function CloseModalBox(){
	var modalbox = $('#modalbox');
	modalbox.fadeOut('fast', function(){
		modalbox.find('.modal-header-name span').children().remove();
		modalbox.find('.devoops-modal-inner').children().remove();
		modalbox.find('.devoops-modal-bottom').children().remove();
		$('body').removeClass("body-expanded");
	});
}

//
//  Beauty tables plugin (navigation in tables with inputs in cell)
//  Created by DevOOPS.
//
(function( $ ){
	$.fn.beautyTables = function() {
		var table = this;
		var string_fill = false;
		this.on('keydown', function(event) {
		var target = event.target;
		var tr = $(target).closest("tr");
		var col = $(target).closest("td");
		if (target.tagName.toUpperCase() == 'INPUT'){
			if (event.shiftKey === true){
				switch(event.keyCode) {
					case 37: // left arrow
						col.prev().children("input[type=text]").focus();
						break;
					case 39: // right arrow
						col.next().children("input[type=text]").focus();
						break;
					case 40: // down arrow
						if (string_fill==false){
							tr.next().find('td:eq('+col.index()+') input[type=text]').focus();
						}
						break;
					case 38: // up arrow
						if (string_fill==false){
							tr.prev().find('td:eq('+col.index()+') input[type=text]').focus();
						}
						break;
				}
			}
			if (event.ctrlKey === true){
				switch(event.keyCode) {
					case 37: // left arrow
						tr.find('td:eq(1)').find("input[type=text]").focus();
						break;
					case 39: // right arrow
						tr.find('td:last-child').find("input[type=text]").focus();
						break;
				case 40: // down arrow
					if (string_fill==false){
						table.find('tr:last-child td:eq('+col.index()+') input[type=text]').focus();
					}
					break;
				case 38: // up arrow
					if (string_fill==false){
						table.find('tr:eq(1) td:eq('+col.index()+') input[type=text]').focus();
					}
						break;
				}
			}
			if (event.keyCode == 13 || event.keyCode == 9 ) {
				event.preventDefault();
				col.next().find("input[type=text]").focus();
			}
			if (string_fill==false){
				if (event.keyCode == 34) {
					event.preventDefault();
					table.find('tr:last-child td:last-child').find("input[type=text]").focus();}
				if (event.keyCode == 33) {
					event.preventDefault();
					table.find('tr:eq(1) td:eq(1)').find("input[type=text]").focus();}
			}
		}
		});
		table.find("input[type=text]").each(function(){
			$(this).on('blur', function(event){
			var target = event.target;
			var col = $(target).parents("td");
			if(table.find("input[name=string-fill]").prop("checked")==true) {
				col.nextAll().find("input[type=text]").each(function() {
					$(this).val($(target).val());
				});
			}
		});
	})
};
})( jQuery );

//
// Beauty Hover Plugin (backlight row and col when cell in mouseover)
// Created by DevOOPS.
//
(function( $ ){
	$.fn.beautyHover = function() {
		var table = this;
		table.on('mouseover','td', function() {
			var idx = $(this).index();
			var rows = $(this).closest('table').find('tr');
			rows.each(function(){
				$(this).find('td:eq('+idx+')').addClass('beauty-hover');
			});
		})
		.on('mouseleave','td', function(e) {
			var idx = $(this).index();
			var rows = $(this).closest('table').find('tr');
			rows.each(function(){
				$(this).find('td:eq('+idx+')').removeClass('beauty-hover');
			});
		});
	};
})( jQuery );

// Create Data Table
function CreateDataTable(){
	// Init the component
	$('#datatable-1').dataTable( {
		"aaSorting": [[ 3, "desc" ]],
		"sDom": "<'box-content'<'col-sm-6'><'col-sm-6 text-right'l><'clearfix'>>rt<'box-content'<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sSearch": "",
			"sLengthMenu": '_MENU_'
		}
	});
}

// Function for fill table, located in element with id = datatable-1
function FillDataTable(data){
	// Get the dataTable object
	var dt = $('#datatable-1').dataTable();
	// Clear the table
	dt.fnClearTable();
	// Add the data
    dt.fnAddData(data);
    // Draw the table
    dt.fnDraw();   	
    // Hide the loading Div
    $('.loadingDiv').hide(); 
}

// Function for fill table, located in element with id = datatable-1
function FillDataTable(data){
	// Get the dataTable object
	var dt = $('#datatable-1').dataTable();
	// Clear the table
	dt.fnClearTable();
	// Add the data
    dt.fnAddData(data);
    // Draw the table
    dt.fnDraw();   	
    // Hide the loading Div
    $('.loadingDiv').hide(); 
}

//Make the call to the API
function LoadApiData(context, index){

	// Define the constants for get the API
	var MAIN_URL = 'http://api.themoviedb.org/3/';
	var API_KEY = '352dc2e4ed8183bd9fbd6f7c5e235f48';
	var urlFunction = '';
	
	switch(context) {
	    case 'movie_top':
	        // Define the urlFunction by default
			urlFunction = 'movie/popular?api_key=';

			// Validates the index to search
			if (!!index)
			{
				// Define the url function
				urlFunction = 'search/movie?query=' + index + '&api_key=';
			}
	        break;
	    case 'person_top':
	        // Define the urlFunction by default
			urlFunction = 'person/popular?api_key=';

			// Validates the index to search
			if (!!index)
			{
				// Define the url function
				urlFunction = 'search/person?query=' + index + '&api_key=';
			}
	        break;
	    case 'movie_detail':

			// Validates the index to search
			if (!!index)
			{
				// Define the url function
				urlFunction = 'movie/' + index + '?append_to_response=credits&api_key=';
			}
	        break;
	    case 'person_detail':

			// Validates the index to search
			if (!!index)
			{
				// Define the url function
				urlFunction = 'person/' + index + '?append_to_response=movie_credits&api_key=';
			}
	        break;
	}

	// Define the URL for the moviedb API
	var fullUrl = MAIN_URL + urlFunction + API_KEY;

	console.log(fullUrl);

	if (!!urlFunction){
	    // Define the response
	    var results;    

	    // Make the ajax call
	    $.ajax({
	        type: 'GET',
	        url: fullUrl,
	        async: false,
	        contentType: 'application/json',
	        dataType: 'jsonp',
	        success: function(json) {

	        	console.dir(json);

	        	JSON.stringify(json);	    	
	        	
				LoadDataOnFields(json, context);
	        },
	        error: function(e) {
	            console.log(e.message);            
	        }
	    });	
	}    
}

// Load the data from the API in the fields
function LoadDataOnFields(data, context){

	var result = [];
	
	switch(context) {
	    case 'movie_top':
	        // Iterate the results 
			$(data.results).each(function(i,val)
			{
		        var imgURL;
				var imgLink = '<a class="ajax-call" href="movie'+val.id+'"><i>No file</i></a>';
				
				// Validate the not null img
				if (!!val.poster_path){
					// Create the image url
				 	imgURL = '"http://image.tmdb.org/t/p/w500'+val.poster_path+'"';
				 	imgLink = '<a class="ajax-call" href="movie'+val.id+'"><img src='+imgURL+'></a>';
				}
				
				// Add each row to the response for movie
				result.push([
					imgLink,
					val.title, 
					val.release_date, 
					val.vote_average, 
					val.vote_count]
				);
			});	

			if(!!result)
			{		
				// Fill the data table
				FillDataTable(result);
			}
	        break;
	    case 'person_top':
	    	// Iterate the results 
			$(data.results).each(function(i,val)
			{
		        var imgURL;
				var imgLink = '<a class="ajax-call" href="person'+val.id+'"><i>No file</i></a>';
				
				// Validate the not null img
				if (!!val.profile_path){
					// Create the image url
				 	imgURL = '"http://image.tmdb.org/t/p/w500'+val.profile_path+'"';
				 	imgLink = '<a class="ajax-call" href="person'+val.id+'"><img src='+imgURL+'></a>';
				}
				
				// Add each row to the response for actor
				result.push([imgLink, val.id, val.name, val.popularity]);
			});

			if(!!result)
			{		
				// Fill the data table
				FillDataTable(result);
			}	
	        break;
	    case 'movie_detail':

	    	var imgURL = '<img class="col-sm-12" src="http://vicsport.com.au/wp-content/themes/vicsport/img/no_image.jpg">';

	        if(!!data.poster_path)
	        {
	    		imgURL = '<img class="col-sm-12" src="http://image.tmdb.org/t/p/w500'+data.poster_path+'">';
	        }	    	

	    	// Fill the basic fields
	    	$('#poster_div').html(imgURL);
	    	$('#movie_title').html('<h3><span>'+data.title+'</span></h3>');
	    	$('#movie_name').val(data.title);
	    	$('#movie_date').val(data.release_date);
	    	$('#movie_vote_average').val(data.vote_average);
	    	$('#movie_vote_count').val(data.vote_count);	    	
	    	$('#movie_overview').val(data.overview);

	        // Iterate the results 
			$(data.credits.cast).each(function(i,val)
			{
		        var imgURL;
				var imgLink = '<a class="ajax-call" registerId="'+val.id+'" context="person_detail" href="person'+val.id+'"><i>No file</i></a>';
				
				// Validate the not null img
				if (!!val.profile_path){
					// Create the image url
				 	imgURL = '"http://image.tmdb.org/t/p/w500'+val.profile_path+'"';
				 	imgLink = '<a class="ajax-call" registerId="'+val.id+'" context="person_detail" href="person'+val.id+'"><img src='+imgURL+'></a>';
				}
				
				// Add each row to the response for actor
				result.push([imgLink, val.id, val.name, val.character]);
			});

			if(!!result)
			{		
				// Fill the data table
				FillDataTable(result);
			}
	        break;
	    case 'person_detail':
	        
	    	var imgURL = '<img class="col-sm-12" src="http://vicsport.com.au/wp-content/themes/vicsport/img/no_image.jpg">';

	        if(!!data.profile_path)
	        {
	        	imgURL = '<img class="col-sm-12" src="http://image.tmdb.org/t/p/w500'+data.profile_path+'">';	
	        }	    	

	    	// Fill the basic fields
	    	$('#profile_pic_div').html(imgURL);
	    	$('#person_title').html('<h3><span>'+data.name+'</span></h3>');
	    	$('#person_name').val(data.name);
	    	$('#person_birthdate').val(data.birthday);
	    	$('#person_place_of_birth').val(data.place_of_birth);
	    	$('#person_popularity').val(data.popularity);	    	
	    	$('#person_biography').val(data.biography);

	        // Iterate the results 
			$(data.movie_credits.cast).each(function(i,val)
			{
		        var imgURL;
				var imgLink = '<a class="ajax-call" registerId="'+val.id+'" context="movie_detail" href="movie'+val.id+'"><i>No file</i></a>';
				
				// Validate the not null img
				if (!!val.poster_path){
					// Create the image url
				 	imgURL = '"http://image.tmdb.org/t/p/w500'+val.poster_path+'"';
				 	imgLink = '<a class="ajax-call" registerId="'+val.id+'" context="movie_detail" href="movie'+val.id+'"><img src='+imgURL+'></a>';
				}
				
				// Add each row to the response for movie
				result.push([
					imgLink,
					val.title, 
					val.release_date, 
					val.character]
				);
			});

			if(!!result)
			{		
				// Fill the data table
				FillDataTable(result);
			}
	        break;
	}

	$('.ajax-call').on('click', function (e) {    	
		e.preventDefault();
		var url = $(this).attr('href');
		var context = $(this).attr('context');
		var registerId = $(this).attr('registerId');
		
		window.location.hash = url;
		LoadAjaxContent(url);
		LoadData(url);
	});
}

// Get the context and index by the URL and load data
function LoadData(url){
	var context, registerId;
	// Decide the way from the url info
	if(url == 'movie')
	{
		context = 'movie_top';
		registerId = $('#movie_name').val();
	}
	else if(url.includes('movie'))
	{
		context =  'movie_detail';
		registerId = url.replace(/\D/g,'');
	}
	else if(url == 'person')
	{
		context = 'person_top';
		registerId = $('#actor_name').val();
	}
	else if(url.includes('person'))
	{
		context = 'person_detail';
		registerId = url.replace(/\D/g,'');
	}
	// Get the info from API
	LoadApiData(context, registerId);		
}


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//
//      MAIN DOCUMENT READY SCRIPT OF DEVOOPS THEME
//
//      In this script main logic of theme
//
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
$(document).ready(function () {

	$('.show-sidebar').on('click', function () {
		$('div#main').toggleClass('sidebar-show');
		setTimeout(MessagesMenuWidth, 250);
	});
	
	var ajax_url = location.hash.replace(/^#/, '');
	if (ajax_url.length < 1) {
		ajax_url = 'movie';
	}
	LoadAjaxContent(ajax_url);
	LoadData(ajax_url);

	$('.main-menu').on('click', 'a', function (e) {
		var parents = $(this).parents('li');
		var li = $(this).closest('li.dropdown');
		var another_items = $('.main-menu li').not(parents);
		another_items.find('a').removeClass('active');
		another_items.find('a').removeClass('active-parent');
		if ($(this).hasClass('dropdown-toggle') || $(this).closest('li').find('ul').length == 0) {
			$(this).addClass('active-parent');
			var current = $(this).next();
			if (current.is(':visible')) {
				li.find("ul.dropdown-menu").slideUp('fast');
				li.find("ul.dropdown-menu a").removeClass('active')
			}
			else {
				another_items.find("ul.dropdown-menu").slideUp('fast');
				current.slideDown('fast');
			}
		}
		else {
			if (li.find('a.dropdown-toggle').hasClass('active-parent')) {
				var pre = $(this).closest('ul.dropdown-menu');
				pre.find("li.dropdown").not($(this).closest('li')).find('ul.dropdown-menu').slideUp('fast');
			}
		}
		if ($(this).hasClass('active') == false) {
			$(this).parents("ul.dropdown-menu").find('a').removeClass('active');
			$(this).addClass('active')
		}
		if ($(this).hasClass('ajax-link')) {
			e.preventDefault();
			if ($(this).hasClass('add-full')) {
				$('#content').addClass('full-content');
			}
			else {
				$('#content').removeClass('full-content');
			}
			var url = $(this).attr('href');
			var context = $(this).attr('context');
			window.location.hash = url;
			LoadAjaxContent(url);
			LoadData(url);
		}
		if ($(this).attr('href') == '#') {
			e.preventDefault();
		}
	});	

	var height = window.innerHeight - 49;

	$('#main').css('min-height', height)
		.on('click', '.expand-link', function (e) {
			var body = $('body');
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			button.toggleClass('fa-expand').toggleClass('fa-compress');
			box.toggleClass('expanded');
			body.toggleClass('body-expanded');
			var timeout = 0;
			if (body.hasClass('body-expanded')) {
				timeout = 100;
			}
			setTimeout(function () {
				box.toggleClass('expanded-padding');
			}, timeout);
			setTimeout(function () {
				box.resize();
				box.find('[id^=map-]').resize();
			}, timeout + 50);
		})
		.on('click', '.collapse-link', function (e) {
			e.preventDefault();
			var box = $(this).closest('div.box');
			var button = $(this).find('i');
			var content = box.find('div.box-content');
			content.slideToggle('fast');
			button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
			setTimeout(function () {
				box.resize();
				box.find('[id^=map-]').resize();
			}, 50);
		})
		.on('click', '.close-link', function (e) {
			e.preventDefault();
			var content = $(this).closest('div.box');
			content.remove();
		});

	$('body').on('click', 'a.close-link', function(e){
		e.preventDefault();
		CloseModalBox();
	});

	$('#top-panel').on('click','a', function(e){
		if ($(this).hasClass('ajax-link')) {
			e.preventDefault();
			if ($(this).hasClass('add-full')) {
				$('#content').addClass('full-content');
			}
			else {
				$('#content').removeClass('full-content');
			}
			var url = $(this).attr('href');			
			var context = $(this).attr('context');
			window.location.hash = url;
			LoadAjaxContent(url);
			LoadData(url);
		}
	});
});
	