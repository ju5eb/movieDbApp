//
//    Main script of DevOOPS v1.0 Bootstrap Theme
//
"use strict";

var calendar;

// Se declaran las variables globales usadas para definir un evento
var currentWorker;
var currentWorkerFullName;
var currentWorkType;
var currentWTDescription;
var currentWTDuration;
var currentUser;

// Obtiene el valor de la variable global del tipo de trabajo
function GetCurrentWorkType() {
	// Retorna la variable global
	return currentWorkType;
}

// Establece el valor de la variable global del tipo de trabajo
function SetCurrentWorkType( workTypeId ) {
	console.log('Estableciendo tipo de trabajo ['+workTypeId+']');
	
	// Asigna la variable ingresada a la variable global
	currentWorkType = workTypeId;
}

// Obtiene el valor de la variable global del tipo de trabajo
function GetCurrentWtDescription() {
	// Retorna la variable global
	return currentWTDescription;
}

// Establece el valor de la variable global del tipo de trabajo
function SetCurrentWtDescription( workTypeDesc ) {
	console.log('Estableciendo tipo de trabajo ['+workTypeDesc+']');
	
	// Asigna la variable ingresada a la variable global
	currentWTDescription = workTypeDesc;
}

// Obtiene el valor de la variable global del trabajador
function GetCurrentWorker() {
	// Retorna la variable global
	return currentWorker;
}

// Establece el valor de la variable global del trabajador
function SetCurrentWorker( workerId ) {
	console.log('Estableciendo trabajador ['+workerId+']');
	
	currentWorker = workerId;	
}

// Obtiene el valor de la variable global del trabajador
function GetCurrentWorkerFullName() {
	// Retorna la variable global
	return currentWorkerFullName;
}

// Establece el valor de la variable global del trabajador
function SetCurrentWorkerFullName( workerFullName ) {
	console.log('Estableciendo trabajador ['+workerFullName+']');
	
	currentWorkerFullName = workerFullName;
}

// Obtiene el valor de la variable global de duración del tipo de trabajo
function GetCurrentWTDuration() {
	// Retorna la variable global
	return currentWTDuration;
}

// Establece el valor de la variable global de duración del tipo de trabajo
function SetCurrentWTDuration( duration ) {
	console.log('Estableciendo duración, en minutos, del tipo de trabajo ['+duration+']');

	// Asigna la variable ingresada a la variable global
	currentWTDuration = duration;
}

//
//	Se establece un texto remplazante en los filtros de las tablas de datos
//
function MakeSelect2(){
	$('select').select2();
	$('.dataTables_filter').each(function(){
		$(this).find('label input[type=text]').attr('placeholder', 'Escriba para buscar');
	});
}

// Carga el contenido realizando una petición a la dirección ingresada
function LoadContent(inURL){
	$.ajax({ // create an AJAX call...
	    data: '', // get the form data
		type: 'GET', // GET or POST
		url: inURL, // the file to call
		success: function(response) { // on success..
			
			var responseData = $.parseJSON(response);
			var successVal = responseData.success;				

			if (successVal == 1)
			{
				var urlData = responseData.url;
				LoadAjaxContent(urlData);					
			}
			else
			{					
				var errorsData = responseData.errors;

				var html = "<style>li.error{color: red}</style><ul>";
				$(errorsData).each(function(i,val)
				{
					console.log(val);
					html += "<li class='error'>" + val + "</li>"; 

				});
				html += "</ul>";
				$('#errors_div').html(html);
			}				
		}

	});
}	

// Guarda la información realizando una petición con los datos del formulario ingresado
function SaveContent(inFormId){
	
	console.log('SaveContent');

	// Se crea petición AJAX
	$.ajax({ 
	    data: $(inFormId).serialize(), // Serializa el formulario
		type: $(inFormId).attr('method'), // Obtiene el tipo de método GET o POST
		url: $(inFormId).attr('action'), // Obtiene la acción
		//contentType: $(inFormId).attr('enctype'), // Obtiene el tipo de contenido
		success: function(response) { // Si es exitosa la petición ejecuta lo siguiente
			
			// Se crea la variable con la respuesta de la petición
			var responseData = $.parseJSON(response);

			// Se obtiene el estado de exito de la respuesta
			var successVal = responseData.success;

			console.log(responseData);

			// Si la respuesta fue exitosa
			if (successVal == 1)
			{
				// Se obtiene la dirección de redireccionamiento
				var urlData = responseData.url;

				// Se ejecuta método de carga de contenido por petición ajax
				LoadAjaxContent(urlData);
			}
			else
			{
				// Se obtienen los errores
				var errorsData = responseData.errors;

				// Se crea lista de despliegue de errores
				var html = "<style>li.error{color: red}</style><ul>";

				// Se recorre cada error retornado
				$(errorsData).each(function(i,val)
				{
					console.log(val);
					// Se adiciona al cuadro de despliegue el mensaje de error
					html += "<li class='error'>" + val + "</li>";
				});

				// Se cierra la lista de despliegue
				html += "</ul>";

				// Se actualiza el div con la lista de despliegue de errores formada
				$('#errors_div').html(html);
			}
		}
	});
}

/*-------------------------------------------
	Main scripts used by theme
---------------------------------------------*/
//
//  Function for load content from url and put in "divName" block
//
function LoadAjaxContent(url, contentDiv, loadingDiv){
	// variables por defecto
	contentDiv = typeof(contentDiv) != 'undefined' ? contentDiv : '#ajax-content';
	loadingDiv = typeof(loadingDiv) != 'undefined' ? loadingDiv : '.preloader';	
	// Muestra div de cargando
	$(loadingDiv).show();		
	
	// Realiza la peticion a la url ingresada
	$.ajax({
		mimeType: 'text/html; charset=utf-8', // ! Need set mimeType only when run from local file
		url: url,
		type: 'GET',
		success: function(data) {
			$(contentDiv).html(data);
			$(loadingDiv).hide();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		},
		dataType: "html",
		async: false
	});
}

//
//  Function set min-height of window (required for this theme)
//
function SetMinBlockHeight(elem){
	elem.css('min-height', window.innerHeight - 50);
}

//
//  Helper for open ModalBox with requested header, content and bottom
//
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
//
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
//
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

/*-------------------------------------------
	Scripts for DataTables page (tables_datatables.html)
---------------------------------------------*/
//
// Function for table, located in element with id = datatable-1
//
function TestTable1(){
	$('#datatable-1').dataTable( {
		"aaSorting": [[ 0, "asc" ]],
		"sDom": "<'box-content'<'col-sm-6'f><'col-sm-6 text-right'l><'clearfix'>>rt<'box-content'<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>>",
		"sPaginationType": "bootstrap",
		"oLanguage": {
			"sSearch": "",
			"sLengthMenu": '_MENU_'
		}
	});
}

/*-------------------------------------------
	Function for File upload page (form_file_uploader.html)
---------------------------------------------*/
function FileUpload(){
	$('#bootstrapped-fine-uploader').fineUploader({
		//uploaderType: 'basic',
		template: 'qq-template-bootstrap',
		multiple: false,
		autoupload: true,
		interceptSubmit: false,
		classes: {
			success: 'alert alert-success',
			fail: 'alert alert-error'
		},
		thumbnails: {
			placeholders: {
				waitingPath: "img/logo.png",//"assets/waiting-generic.png",
				notAvailablePath: "img/logo-200.png" //"assets/not_available-generic.png"
			}
		},
		validation: {
			allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
			//itemLimit: 1,
			sizeLimit: 200000
		},
		messages: {
			sizeError: "{file} es demasiado grande, el tamaño máximo para el archivo debe ser {sizeLimit} Bytes.",
			//tooManyItemsError: "Demasiados elementos ({netItems}) para cargar. El límite de archivos es {itemLimit}.",
			typeError: "{file} tiene extensión inválida. Las extensiones válidas son: {extensions}."
		},
		callbacks: {
			onComplete: function(id, fileName, responseData) {
				// Se crea la variable con la respuesta de la petición
				//var responseData = $.parseJSON(responseJSON);

				// Se obtiene el estado de exito de la respuesta
				var successVal = responseData.success;				

				console.log(responseData);
				// Si la respuesta fue exitosa
				if (successVal == 1)
				{
					// Se obtiene la dirección de redireccionamiento
					var urlData = responseData.url;

					// Se ejecuta método de carga de contenido por petición ajax
					LoadAjaxContent(urlData);					
				}
				else
				{		
					// Se obtienen los errores			
					var errorsData = responseData.errors;

					// Se crea lista de despliegue de errores
					var html = "<style>li.error{color: red}</style><ul>";

					// Se recorre cada error retornado
					$(errorsData).each(function(i,val)
					{
						console.log(val);
						// Se adiciona al cuadro de despliegue el mensaje de error
						html += "<li class='error'>" + val + "</li>"; 

					});

					// Se cierra la lista de despliegue
					html += "</ul>";

					// Se actualiza el div con la lista de despliegue de errores formada
					$('#errors_div').html(html);
				}					
			}
		}
	});
	
}

/**
	Ejecuta validación del horario para no interferir con otras citas agendadas
*/	
function ValidSchedule(inData){

	// Variable retornada
	var validAppointment = true;

	// Se ejecuta la petición para validar que aún esté disponible el horario seleccionado
	var responseData = SyncExecuteFunction('appointments/checkinterference', inData);

	// Se verifica que la respuesta no sea nula
	if (responseData != null)
	{
		// Se obtiene el estado de la respuesta
		var successVal = responseData.success;

		// Se valida si falló al ejecutar el método
		if (successVal == 0)					
		{	
			// Se muestra mensaje de alerta
			alert('No es posible agendar en el horario seleccionado');

			// Se establece la variable de retorno como invalida
			validAppointment = false;
		}
	}

	// Retorna variable de salida
	return validAppointment;
}

/*
	Función que ejecuta llamado Ajax al método ingresado
*/
function SyncExecuteFunction(inType, inURL, inData){
	// Variable que guarda la respuesta de la petición
	var responseData;

	// Arreglo de datos de entrada
	var inputDataArray = $.map(inData, function(value, index) {
	    return [index+':['+value+']'];
	});

	console.log("Ajax Service Call:"+inURL);
	console.log("Input:"+inputDataArray);

	// Creación de petición ajax
	$.ajax({ // create an AJAX call...
	    data: inData, // get the form data
		type: inType, // GET or POST
		url: inURL, // the file to call
		success: function(response) { // on success..
			responseData = $.parseJSON(response);						
		},
		error: function(){
			responseData = 'Error al realizar la petición !!';		
		},
		async: false,
		cache: false
	});		

	console.log(responseData);
	return responseData;
}

/*-------------------------------------------
	Function for Calendar page (calendar.html)
---------------------------------------------*/
//
// Example form validator function
//
function DrawCalendar(){
	/* jsflorez. 
	Falta: 
	- Modificar para que el calendario funcione dependiendo del idioma establecido 
	- Cambiar el uso de atributos especificos por manejo de objetos al obtener la info de la petición
	*/

	/* initialize the calendar
	-----------------------------------------------------------------*/	
	calendar = $('#calendar').fullCalendar({
		height: window.innerHeight - 200,
		events: {
			url: 'appointments/getevents',
	        type: 'GET',	
	        data: function() {
	        	return {
		        	workTypeId: GetCurrentWorkType(),
		        	workerId: GetCurrentWorker()
		        };
	        },
	        error: function() {
	        	alert('No se pudo obtener eventos!');
	        },
            editable: false
		},
		lang: 'es',
		buttonText: {
			today:    'Hoy',
		    month:    'Mes',
		    week:     'Semana',
		    day:      'Día'
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaDay,month,agendaWeek,'
		},
		defaultView: 'agendaDay', 
		selectable: true,
		selectHelper: false,
		minTime: "6:00",
		maxTime: "22:00",
		slotEventOverlap: false,
		slotDuration: '00:15:00',				
		allDaySlot: false,
		lazyFetching: false,
		// Evento seleccionar un slot del calendario
		select: function(start, end, allDay) {
			
			console.log('workerId:'+currentWorker+', workTypeId:'+currentWorkType+', duration'+currentWTDuration);
			
			var view = $('#calendar').fullCalendar('getView');
			//console.log("The view's title is " + view.name);
			
			if (view.name == "agendaDay") {
				// Se valida si no se ha seleccionado un trabajador
				if (!currentWorker || !currentWorkType)
				{				
					return false;
				}

				// Se crea la fecha de fin del evento clonando la fecha seleccionada + la duración del evento
				end = start.clone().add('m',currentWTDuration);

				if (!isOverlapping('calendar', start, end)) {
					
					// Se crea un objeto con los valores a pasar en la petición
					var data = {
						workerId: currentWorker,
						workTypeId: currentWorkType,
						startTime: start.format("YYYY-MM-DD HH:mm:ss"),
						endTime: end.format("YYYY-MM-DD HH:mm:ss"),
						duration: currentWTDuration
					};

					// Valida si no es un horario valido para agendar interferiendo con otras citas
					if (! ValidSchedule(data)){
						// Retorna falso e impide continuar con el agendamiento
						return false;
					}
					
					// Se crea el formulario para obtener usuario de agendamiento jsflorez! Falta: Cambiar para solo buscar por telefono
					var getUserForm = 
					$(
						// Div para buscar o crear un usuario
						'<div id="getcreate_user_div" class="box-content">'+
							'<div id="errors_div"></div>'+
							'<div id="tabs">'+
								'<ul>'+
									'<li><a href="#get_user_div">Buscar usuario</a></li>'+
									'<li><a href="#create_user_div">Crear usuario</a></li>'+									
								'</ul>'+
								// Div para búsqueda de usuario								
								'<div id="get_user_div">'+
									'<form id="get_user_form" action="users/getUser">'+											
											'<p>Realize búsqueda por nombre o teléfono del cliente.'+
											'</p>'+
											'<div class="text-center">'+
												'<div class="form-group">'+
												 	'<label class="col-sm-4 control-label">Nombres</label>'+
													'<div class="col-sm-8">'+
														'<input type="text" id="search_username" class="form-control" placeholder="Nombres" title="Nombres del cliente">'+
												    '</div>'+
												'</div>'+										
												'<div class="form-group">'+
												    '<label class="col-sm-4 control-label">Teléfono</label>'+
													'<div class="col-sm-8">'+
														'<input type="text" id="search_phone" class="form-control" placeholder="Teléfono" title="Teléfono del cliente">'+
												 	'</div>'+
												'</div>'+										
											'</div>'+
										'<div class="form-group has-success has-feedback">'+
										'</div>'+
									'</form>'+
								'</div>'+

								// Div para creación de usuario
								'<div id="create_user_div">'+
									'<form id="create_user_form" action="users/postcreate">'+										
										'<div class="text-center">'+
											'<div class="form-group">'+
											 	'<label class="col-sm-4 control-label">Nombres</label>'+
												'<div class="col-sm-8">'+
													'<input type="text" id="username" class="form-control" placeholder="Nombres" title="Nombres del cliente">'+
											    '</div>'+
											'</div>'+
											'<div class="form-group">'+
											 	'<label class="col-sm-4 control-label">Email</label>'+
												'<div class="col-sm-8">'+
													'<input type="text" id="email" class="form-control" placeholder="Email" title="E-mail del cliente">'+
											    '</div>'+
											'</div>'+
											'<div class="form-group">'+
											    '<label class="col-sm-4 control-label">Teléfono</label>'+
												'<div class="col-sm-8">'+
													'<input type="text" id="phone" class="form-control" placeholder="Teléfono" title="Teléfono del cliente">'+
											 	'</div>'+
											'</div>'+
											'<div class="form-group">'+
											    '<label class="col-sm-4 control-label">Cumpleaños</label>'+
												'<div class="col-sm-8">'+
													'<div class="input-group">'+
														'<input class="form-control date_pickers" type="text" id="birthday" title="Fecha de Cumpleaños" placeholder="Click aquí para seleccionar fecha" data-placement="bottom" data-toggle="tooltip">'+
														'<span id="input-cleaner" class="input-group-addon"><i class="fa fa-minus-square"></i></span>'+
													'</div>'+
											 	'</div>'+
											'</div>'+
											'<div class="form-group">'+
											    '<label class="col-sm-4 control-label">Género</label>'+
												'<div class="col-sm-8">'+
													'<select id="gender" class="form-control" title="Género o tipo de cliente">'+
														'<option></option>'+
														'<option value="M">Mujer</option>'+
														'<option value="H">Hombre</option>'+
														'<option value="J">Junior</option>'+
													'</select>'+
											 	'</div>'+
											'</div>'+
										'</div>'+
									'</form>'+
								'</div>'+
							'</div>'+
						'</div>'+

						// Div para creación de evento
						'<div id = "set_event_div" hidden>'+
							'<form id="event_form" action="appointments/postcreate1">'+
								'<div class="text-center">'+
									'<div class="form-group">'+
									    '<label class="col-sm-4 control-label">Tipo de Trabajo</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="workTypeName" class="form-control" disabled>'+
									 	'</div>'+
									'</div>'+
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Responsable</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="workerName" class="form-control" disabled>'+
									    '</div>'+
									'</div>'+
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Cliente</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="clientName" class="form-control" disabled>'+
									    '</div>'+
									'</div>'+
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Horario</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="appointmentTime" class="form-control" disabled>'+
									    '</div>'+
									'</div>'+
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Comentario</label>'+
										'<div class="col-sm-8">'+
											'<textarea rows="3" id="extraComment" class="form-control" placeholder="Escriba aqui comentarios extra"></textarea>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</form>'+
						'</div>'+
						'<div id="users_div" hidden></div>'
					);

					// Se crean los botones para los formularios, se deshabilita el boton submit mientras no este visible el formulario de creación de evento
					var buttons = $(
						'<button id="event_cancel" type="cancel" class="btn btn-default btn-label-left">'+					
							'Cerrar'+
						'</button>'+
						'<button id="event_back" class="btn btn-default btn-label-left">'+					
							'Atras'+
						'</button>'+
						'<button type="submit" id="event_search" class="btn btn-info pull-right">'+							
							'Siguiente'+
						'</button>'+						
						'<button type="submit" id="event_submit" class="btn btn-primary btn-label-left pull-right">'+
							'<span><i class="fa fa-clock-o"></i></span>'+
							'Agendar'+
						'</button>'
					);

					// Se abre una ventana modal con el primer formulario de obtención de usuario
					OpenModalBox('Agendamiento de Cita', getUserForm, buttons);

					// Se establece el contenido en forma de tabs
					$( "#tabs" ).tabs();

					// Se establece el selector de fecha para el campo cumpleaños
					$('#birthday').datepicker( { 
						showButtonPanel: true,
						dateFormat: 'yy/mm/dd'
					} );

					// Se establece el limpiador del texto para el cumpleaños seleccionado
					$('#input-cleaner').click(function(){						
						$('#birthday').val("");
					});

					// Deshabilita el botón para agendar
					$('#event_submit').hide();
					
					// Deshabilita el boton de regresar
					$('#event_back').hide();

					// Se establece función en evento submit (buscar) del formulario de obtención de cliente
					$('#create_user_form').on("submit", function( event ) { 
						// Limpia el bloque de errores
						$('#errors_div').html("");
						
						console.log('Tratando de crear cliente...');

						// Se crea un objeto con los valores a pasar en la petición
						var data = {
							username: $('#username').val(), 
							phone: $('#phone').val(), 
							email: $('#email').val(),
							birthday: $('#birthday').val(),
							gender: $('#gender').val()							
						};
		  				
		  				// Se ejecuta la petición que crea u obtiene el cliente 
						var responseData = SyncExecuteFunction('users/postcreate', data);

						// Se verifica que la respuesta no sea nula
						if (responseData != null)
						{
							// Se obtiene el estado de la respuesta
							var successVal = responseData.state;

							// Se valida si falló al ejecutar el método
							if (successVal == 'fail')					
							{			
								console.log('Falló!');

								// Se obtienen los errores		
								var errorsData = responseData.errors;

								// Se crea el contenido html con los errores obtenidos
								var html = "<style>li.error{color: red}</style><ul>";
								$(errorsData).each(function(i,val)
								{
									console.log(val);
									html += "<li class='error'>" + val + "</li>"; 

								});
								html += "</ul>";
								$('#errors_div').html(html);
							}
							else
							{
								console.log('Cliente retornado: '+responseData.userId);
								
								// Establece el cliente del evento a registrar
								currentUser = responseData.userId;

								// Se modifica la hora de fin del evento dependiendo de la duración del tipo de trabajo
								end = start.clone().add('m',currentWTDuration);

								// Establece los datos del evento a crear para desplegarlos
								$('#clientName').val(responseData.userName);
								$('#workerName').val(currentWorkerFullName);
								$('#workTypeName').val(currentWTDescription);
								$('#appointmentTime').val(start.format('hh:mm a')+' - '+end.format('hh:mm a'));

								// Limpia los campos del formulario de creación
								$('#username').val(""); 
								$('#phone').val(""); 
								$('#email').val("");
								$('#birthday').val("");
								$('#gender').val("");
									
								// Habilita el botón para agendar
								$('#event_submit').show();

								// Oculta el panel de obtención de usuario
								$('#getcreate_user_div').hide(2000);

								// Muestra el panel de creación de evento
								$('#set_event_div').show(2000);

								// Deshabilita el botón para buscar cliente
								$('#event_search').hide();

								// Habilita el boton de regresar
								$('#event_back').show();
							}
						}
						
						// Retorna falso para impedir el evento submit
						return false;
					});

					// Se establece función en evento submit (buscar) del formulario de obtención de cliente
					$('#get_user_form').on( "submit", function( event ) { 
						
						// Limpia el bloque de errores
						$('#errors_div').html("");
						
						console.log('Tratando de obtener cliente...');

						// Se crea un objeto con los valores a pasar en la petición
						var data = {
							username: $('#search_username').val(), 
							phone: $('#search_phone').val(), 
							workTypeId: currentWorkType,
							workerId: currentWorker
						};
		  				
		  				// Se ejecuta la petición que crea u obtiene el cliente 
						var responseData = SyncExecuteFunction('users/getUser', data);

						// Se verifica que la respuesta no sea nula
						if (responseData != null)
						{
							// Se obtiene el estado de la respuesta
							var successVal = responseData.state;

							// Se valida si falló al ejecutar el método
							if (successVal == 'fail')					
							{			
								console.log('Falló!');

								// Se obtienen los errores		
								var errorsData = responseData.errors;

								// Se crea el contenido html con los errores obtenidos
								var html = "<style>li.error{color: red}</style><ul>";
								$(errorsData).each(function(i,val)
								{
									console.log(val);
									html += "<li class='error'>" + val + "</li>"; 

								});
								html += "</ul>";
								$('#errors_div').html(html);
							}
							// Se valida si encontró mas de 1 resultado
							else if (successVal == 'more-located')
							{
								console.log('Varios clientes encontrados');

								// Se obtienen los errores		
								var usersArray = responseData.users;

								// Se crea el contenido html con los usuarios obtenidos
								var html = 
								'<div class="box-content no-padding">'+
									'<p>Se encontraron varios usuarios que coincidían con su búsqueda. Seleccione el usuario correcto para agendar la cita.</p>'+
									'<div style="overflow:auto; max-height:300px;">'+
										'<table class="table table-bordered table-striped table-hover table-heading table-datatable" id="datatable-1">'+
											'<thead>'+
												'<tr>'+
													'<th>ID</th>'+
													'<th>Teléfono</th>'+
													'<th>Nombre de Usuario</th>'+
													'<th>E-mail</th>'+
													'<th>Género</th>'+
													'<th>Fecha de Cumpleaños</th>'+
												'</tr>'+
											'</thead>'+
											'<tbody>';

								// Por cada usuario encontrado
								$(usersArray).each(function(i,val)
								{
									console.log(val);

									var genderDesc = "";
									
									// Obtiene nombre del género
									switch(val.gender){
										case "M": genderDesc = "Mujer"; break;
										case "H": genderDesc = "Hombre"; break;
										case "J": genderDesc = "Junior"; break;
									} 		

									// Se crea una fila con la información del usuario
									html += '<tr class="user_selector" user_id="'+val.id+'" username="'+val.username+'">'+
												'<td>'+ val.id + '</td>'+
												'<td>'+ val.phone + '</td>'+
												'<td>'+ val.username + '</td>'+
												'<td>'+ val.email + '</td>'+
												'<td>'+ genderDesc + '</td>'+
												'<td>'+ val.birthday + '</td>'+
											'</tr>';
								});

								// Se cierra el contenido html
								html += 	'</tbody>'+
										'</div>'+
									'</table>'+
								'</div>';

								// Actualiza la vista
								$('#users_div').html(html);

								// Para cada link creado se define la función click
								$('.user_selector').each(function() {
									
									// Obtiene el trabajador seleccionado
									var userId = this.getAttribute("user_id");

									// Obtiene el trabajador seleccionado
									var userName = this.getAttribute("username");
							
									// Define la función click del boton 
									$(this).on('click',function(){
										
										console.log('Usuario seleccionado: '+userId);
										
										// Establece el cliente del evento a registrar
										currentUser = userId;

										// Se modifica la hora de fin del evento dependiendo de la duración del tipo de trabajo
										end = start.clone().add('m',currentWTDuration);

										// Establece los datos del evento a crear para desplegarlos
										$('#clientName').val(userName);
										$('#workerName').val(currentWorkerFullName);
										$('#workTypeName').val(currentWTDescription);
										$('#appointmentTime').val(start.format('hh:mm a')+' - '+end.format('hh:mm a'));
											
										// Habilita el botón para agendar
										$('#event_submit').show();
										
										// Oculta el panel de selección de usuario
										$('#users_div').hide(2000);		

										// Oculta el panel de obtención de usuario
										$('#getcreate_user_div').hide(2000);

										// Muestra el panel de creación de evento
										$('#set_event_div').show(2000);

										// Deshabilita el botón para buscar cliente
										$('#event_search').hide();

										// Habilita el boton de regresar
										$('#event_back').show();

									});		
								});	
								
								// Oculta el panel de obtención de usuario
								$('#getcreate_user_div').hide(2000);

								// Muestra el panel de selección de usuarios
								$('#users_div').show(2000);

								// Deshabilita el botón para agendar
								$('#event_submit').hide();

								// Deshabilita el botón para buscar cliente
								$('#event_search').hide();

								// Habilita el boton de regresar
								$('#event_back').show();
							}
							// Se encontró 1 solo resultado
							else
							{
								console.log('Cliente retornado: '+responseData.userId);
								
								// Establece el cliente del evento a registrar
								currentUser = responseData.userId;

								// Se modifica la hora de fin del evento dependiendo de la duración del tipo de trabajo
								end = start.clone().add('m',currentWTDuration);

								// Establece los datos del evento a crear para desplegarlos
								$('#clientName').val(responseData.userName);
								$('#workerName').val(currentWorkerFullName);
								$('#workTypeName').val(currentWTDescription);
								$('#appointmentTime').val(start.format('hh:mm a')+' - '+end.format('hh:mm a'));
								
								// Habilita el botón para agendar
								$('#event_submit').show();

								// Oculta el panel de obtención de usuario
								$('#getcreate_user_div').hide(2000);

								// Muestra el panel de creación de evento
								$('#set_event_div').show(2000);

								// Deshabilita el botón para buscar cliente
								$('#event_search').hide();

								// Habilita el boton de regresar
								$('#event_back').show();
							}
						}

						// Retorna falso para impedir el evento submit
						return false;
					});

					// Se establece función en ejecución del submit del formulario de creación de evento
					$('#event_form').submit(function() { 
						console.log('Registrando evento.. worker:'+currentWorker+', workType:'+currentWorkType+', user:'+currentUser);
						
						// Se crea un objeto con los valores a pasar en la petición
						var data = {
							userId: currentUser,
							workerId: currentWorker,
							workTypeId: currentWorkType,
							duration: currentWTDuration,
							startTime: start.format("YYYY-MM-DD HH:mm:ss"),
							endTime: end.format("YYYY-MM-DD HH:mm:ss"),
							extraComment: $('#extraComment').val()
						};

						// Ejecuta la petición de creación del evento
						var responseData = SyncExecuteFunction('appointments/postcreate', data);

						// Se valida la respuesta de la petición
						if (responseData != null) {

							// Se valida si la respuesta fue negativa
							if (!responseData.success) {

								// Se desplega el mensaje de error
								alert(responseData.errors);
							}
						}

						// Actualiza los eventos desplegados en el calendario
						calendar.fullCalendar('refetchEvents');
						
						// Retorna falso para impedir el evento submit
						return false;
					});

					// Se establece función en evento atras 
					$('#event_back').on( "click", function() { 				
						
						// Oculta el panel de selección de usuario
						$('#users_div').hide(2000);		

						// Oculta el panel de obtención de usuario
						$('#getcreate_user_div').show(2000);

						// Muestra el panel de creación de evento
						$('#set_event_div').hide(2000);

						// Deshabilita el botón para agendar
						$('#event_submit').hide();

						// Deshabilita el botón para buscar cliente
						$('#event_search').show();
						
						// Deshabilita el boton de regresar
						$('#event_back').hide();
					});

					// Se establece función que realiza click en el botón de búsqueda
					$('#event_search').on('click', function(){

						// Getter
						var active = $( "#tabs" ).tabs( "option", "active" );
												
						// Valida si se está buscando o creando usuario
						if (active == 1)
						{
							// Realiza submit del formulario de crear cliente
							$('#create_user_form').submit();
						}
						else
						{
							// Realiza submit del formulario de buscar cliente
							$('#get_user_form').submit();
						}						
					});

					// Se establece función que cierra la ventana modal al hacer click en el boton cancelar
					$('#event_cancel').on('click', function(){
						CloseModalBox();
					});

					// Se establece función que realiza submit del formulario de creación de evento
					$('#event_submit').on('click', function(){
						// Realiza submit del formulario de creación de evento
						console.log(start+' - '+end);			
						$('#event_form').submit();
						
						// Cierra la ventana modal
						CloseModalBox();
					});

					// Deselecciona el slot del evento
					calendar.fullCalendar('unselect');
					
				}else{
					alert('La cita se cruza con la siguiente, por favor ajusta la hora.');
				}
			}else{
				$('#calendar').fullCalendar('changeView', 'agendaDay');
				$('#calendar').fullCalendar('gotoDate', start);
			}				
		},
		editable: true,
		droppable: false,		
		eventClick: function(calEvent, jsEvent, view) {						
			var eventDescription = calEvent.description ? calEvent.description : "";

			if(calEvent.id != '-1'){
				
				var view = $('#calendar').fullCalendar('getView');
				console.log("The view's title is " + view.name);
				
				if (view.name == "agendaDay") {
					
					// Se define el formulario de visualización de datos del evento
					var form = $(
						'<div id = "set_event_div">'+
							'<form id="event_form">'+
								'<div class="text-center">'+
									'<div class="form-group">'+						    
									    '<label class="col-sm-4 control-label">Tipo de Trabajo</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="workTypeName" class="form-control" value="'+calEvent.workTypeName+'" disabled>'+
									 	'</div>'+
									'</div>'+						
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Responsable</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="workerName" class="form-control" value="'+calEvent.workerNames+' '+calEvent.workerLastName+'" disabled>'+
										'</div>'+
									'</div>'+
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Cliente</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="clientName" class="form-control" value="'+calEvent.userName+'" disabled>'+							    
										'</div>'+
									'</div>'+
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Horario</label>'+
										'<div class="col-sm-8">'+
											'<input type="text" id="appointmentTime" class="form-control" value="'+calEvent.start.format('hh:mm a')+' - '+calEvent.end.format('hh:mm a')+'" disabled>'+
									    '</div>'+
									'</div>'+	
									'<div class="form-group">'+
									 	'<label class="col-sm-4 control-label">Comentario</label>'+
										'<div class="col-sm-8">'+
											'<textarea rows="3" id="extraComment" class="form-control" disabled>'+
												eventDescription+
											'</textarea>'+
										'</div>'+
									'</div>'+			
								'</div>'+						
							'</form>'+
						'</div>'
					);

					// Se crean los botones para los formularios, se deshabilita el boton submit mientras no este visible el formulario de creación de evento
					var buttons = $(
						'<button id="event_close" type="cancel" class="btn btn-default btn-label-left">'+					
							'Cerrar'+
						'</button>'+
						'<button type="submit" id="event_cancel" class="btn btn-danger btn-label-left pull-right">'+
							'<span><i class="fa fa-clock-o txt-danger"></i></span>'+
							'Cancelar Evento'+
						'</button>'
					);

					// Se abre una ventana modal con el formulario de visualización de evento
					OpenModalBox('Visualizar cita', form, buttons);

					// Se establece función que cierra la ventana modal al hacer click en el boton cerrar
					$('#event_close').on('click', function(){
						CloseModalBox();
					});

					// Se establece función en ejecución del submit del formulario de visualización de evento (cancelar evento)
					$('#event_form').submit(function() { 

						// Confirma la cancelación del evento
						var r=confirm("Está seguro de cancelar este evento?");
						
						// Verifica si se aprobó la cancelación
						if (r==true) {
							console.log('Cancelando evento.. AppointmentId['+calEvent.id+']');
						
							// Se crea un objeto con los valores a pasar en la petición
							var data = {
								appointmentId: calEvent.id					
							};

							// Ejecuta la petición de creación del evento
							var responseData = SyncExecuteFunction('appointments/postcancel', data);

							// Se valida la respuesta de la petición
							if (responseData != null) {

								// Se valida si la respuesta fue negativa
								if (!responseData.success) {

									// Se desplega el mensaje de error
									alert(responseData.errors);
								}
							}

							// Actualiza los eventos desplegados en el calendario
							calendar.fullCalendar('refetchEvents');
						}
						
						// Retorna falso para impedir el evento submit
						return false;
					});

					// Se establece función que realiza cancelación de evento
					$('#event_cancel').on('click', function(){
						// Realiza submit del formulario de visualización de evento (cancelar evento)							
						$('#event_form').submit();
						
						// Cierra la ventana modal
						CloseModalBox();
					});
					
				}else{
					$('#calendar').fullCalendar('changeView', 'agendaDay');
					$('#calendar').fullCalendar('gotoDate', calEvent.start);
				}	
				
			}
		}
	});
}

/*
 * Revisa si una cita se solapa con la siguiente
 */
function isOverlapping(calendarDiv, start, end){
    var array = $('#'+calendarDiv).fullCalendar('clientEvents');
    for (var i = 0; i < array.length; i++) {
    	//if(array[i].id != event.id){
        if(!(array[i].start >= end || array[i].end <= start)){
            return true;
        }
        //}
	}
    
    return false;
}

/*
* Ejecuta el calendario en modo lectura
*/
function DrawReadModeCalendar(){
	
	/* jsflorez. 
	Falta: 
	- Modificar para que el calendario funcione dependiendo del idioma establecido 
	- Cambiar el uso de atributos especificos por manejo de objetos al obtener la info de la petición
	*/

	/* initialize the calendar
	-----------------------------------------------------------------*/	
	calendar = $('#calendar').fullCalendar({
		height: window.innerHeight - 200,
		events: {
			url: 'appointments/getevents',
	        type: 'GET',	
	        data: function() {
	        	return {
		        	workTypeId: GetCurrentWorkType(),
		        	workerId: GetCurrentWorker()
		        };
	        },
	        error: function() {
	        	alert('No se pudo obtener eventos!');
	        },
            editable: false
		},
		lang: 'es',
		buttonText: {
			today:    'Hoy',
		    month:    'Mes',
		    week:     'Semana',
		    day:      'Día'
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'agendaDay,month,agendaWeek,'
		},
		defaultView: 'agendaDay', 
		selectable: true,
		selectHelper: false,
		minTime: "6:00",
		maxTime: "22:00",
		slotEventOverlap: false,
		slotDuration: '00:15:00',				
		allDaySlot: false,
		eventRender: function (event, element) {

			// Se remplaza el titulo del evento
 			element.find('.fc-event-title').text( '[' + event.workTypeName + '] Cliente: ' + event.userName );
		},
		// Evento seleccionar un slot del calendario
		select: function(start, end, allDay) {
			
			console.log('workerId:'+currentWorker+', workTypeId:'+currentWorkType+', duration'+currentWTDuration);
			
			var view = $('#calendar').fullCalendar('getView');
			//console.log("The view's title is " + view.name);
			
			if (view.name == "agendaDay") {

				// Se valida si no se ha seleccionado un trabajador
				if (!currentWorker || !currentWorkType)
				{				
					return false;
				}

				// Se crea la fecha de fin del evento clonando la fecha seleccionada + la duración del evento
				end = start.clone().add('m',currentWTDuration);

				// Se crea un objeto con los valores a pasar en la petición
				var data = {
					workerId: currentWorker,
					workTypeId: currentWorkType,
					startTime: start.format("YYYY-MM-DD HH:mm:ss"),
					endTime: end.format("YYYY-MM-DD HH:mm:ss"),
					duration: currentWTDuration
				};

				// Valida si no es un horario valido para agendar interferiendo con otras citas
				if (! ValidSchedule(data)){
					// Retorna falso e impide continuar con el agendamiento
					return false;
				}
				
				// Se crea el formulario para obtener usuario de agendamiento jsflorez! Falta: Cambiar para solo buscar por telefono
				var createEventform = 
				$(
					'<div id = "set_event_div">'+
						'<form id="event_form" action="appointments/postcreate1">'+
							'<div class="text-center">'+
								'<div class="form-group">'+						    
								    '<label class="col-sm-4 control-label">Tipo de Trabajo</label>'+
									'<div class="col-sm-8">'+
										'<input type="text" id="workTypeName" value="'+currentWTDescription+'" class="form-control" disabled>'+
								 	'</div>'+
								'</div>'+						
								'<div class="form-group">'+
								 	'<label class="col-sm-4 control-label">Responsable</label>'+
									'<div class="col-sm-8">'+
										'<input type="text" id="workerName" value="'+currentWorkerFullName+'" class="form-control" disabled>'+
								    '</div>'+
								'</div>'+
								'<div class="form-group">'+
								 	'<label class="col-sm-4 control-label">Horario</label>'+
									'<div class="col-sm-8">'+
										'<input type="text" id="appointmentTime" value="'+start.format('hh:mm a')+' - '+end.format('hh:mm a')+'" class="form-control" disabled>'+							    
								    '</div>'+
								'</div>'+	
								'<div class="form-group">'+
								 	'<label class="col-sm-4 control-label">Comentario</label>'+
									'<div class="col-sm-8">'+
										'<textarea rows="3" id="extraComment" class="form-control" placeholder="Escriba aqui comentarios extra"></textarea>'+
									'</div>'+
								'</div>'+			
							'</div>'+						
						'</form>'+
					'</div>'
				);

				// Se crean los botones para los formularios, se deshabilita el boton submit mientras no este visible el formulario de creación de evento
				var buttons = $(
					'<button id="event_cancel" type="cancel" class="btn btn-default btn-label-left">'+					
						'Cerrar'+
					'</button>'+
					'<button type="submit" id="event_submit" class="btn btn-primary btn-label-left pull-right">'+
						'<span><i class="fa fa-clock-o"></i></span>'+
						'Agendar'+
					'</button>'
				);

				// Se abre una ventana modal con el primer formulario de obtención de usuario
				OpenModalBox('Agendamiento de Cita', createEventform, buttons);

				// Se establece función en ejecución del submit del formulario de creación de evento
				$('#event_form').submit(function() { 
					console.log('Registrando evento.. worker:'+currentWorker+', workType:'+currentWorkType+', user:'+currentUser);
					
					// Se crea un objeto con los valores a pasar en la petición
					var data = {
						userId: currentUser,
						workerId: currentWorker,
						workTypeId: currentWorkType,
						duration: currentWTDuration,
						startTime: start.format("YYYY-MM-DD HH:mm:ss"),
						endTime: end.format("YYYY-MM-DD HH:mm:ss"),
						extraComment: $('#extraComment').val()
					};

					// Ejecuta la petición de creación del evento
					var responseData = SyncExecuteFunction('appointments/postcreate', data);

					// Se valida la respuesta de la petición
					if (responseData != null) {

						// Se valida si la respuesta fue negativa
						if (!responseData.success) {

							// Se desplega el mensaje de error
							alert(responseData.errors);
						}
					}

					// Actualiza los eventos desplegados en el calendario
					calendar.fullCalendar('refetchEvents');
					
					// Retorna falso para impedir el evento submit
					return false;
				});

				// Se establece función que cierra la ventana modal al hacer click en el boton cancelar
				$('#event_cancel').on('click', function(){
					CloseModalBox();
				});

				// Se establece función que realiza submit del formulario de creación de evento
				$('#event_submit').on('click', function(){
					// Realiza submit del formulario de creación de evento
					console.log(start+' - '+end);			
					$('#event_form').submit();
					
					// Cierra la ventana modal
					CloseModalBox();
				});

				// Deselecciona el slot del evento
				calendar.fullCalendar('unselect');		
			}else{
				$('#calendar').fullCalendar('changeView', 'agendaDay');
				$('#calendar').fullCalendar('gotoDate', start);
			}	
		},
		eventClick: function(calEvent, jsEvent, view) {						
			var eventDescription = calEvent.description ? calEvent.description : "";

			// Se define el formulario de visualización de datos del evento
			var form = $(
				'<div id = "set_event_div">'+
					'<form id="event_form">'+
						'<div class="text-center">'+
							'<div class="form-group">'+						    
							    '<label class="col-sm-4 control-label">Tipo de Trabajo</label>'+
								'<div class="col-sm-8">'+
									'<input type="text" id="workTypeName" class="form-control" value="'+calEvent.workTypeName+'" disabled>'+
							 	'</div>'+
							'</div>'+						
							'<div class="form-group">'+
							 	'<label class="col-sm-4 control-label">Responsable</label>'+
								'<div class="col-sm-8">'+
									'<input type="text" id="workerName" class="form-control" value="'+calEvent.workerNames+' '+calEvent.workerLastName+'" disabled>'+
								'</div>'+
							'</div>'+
							'<div class="form-group">'+
							 	'<label class="col-sm-4 control-label">Cliente</label>'+
								'<div class="col-sm-8">'+
									'<input type="text" id="clientName" class="form-control" value="'+calEvent.userName+'" disabled>'+							    
								'</div>'+
							'</div>'+
							'<div class="form-group">'+
							 	'<label class="col-sm-4 control-label">Horario</label>'+
								'<div class="col-sm-8">'+
									'<input type="text" id="appointmentTime" class="form-control" value="'+calEvent.start.format('hh:mm a')+' - '+calEvent.end.format('hh:mm a')+'" disabled>'+
							    '</div>'+
							'</div>'+	
							'<div class="form-group">'+
							 	'<label class="col-sm-4 control-label">Comentario</label>'+
								'<div class="col-sm-8">'+
									'<textarea rows="3" id="extraComment" class="form-control" disabled>'+
										eventDescription+
									'</textarea>'+
								'</div>'+
							'</div>'+			
						'</div>'+						
					'</form>'+
				'</div>'
			);

			// Se crean los botones para los formularios
			var buttons = $(
				'<button id="event_close" type="cancel" class="btn btn-default btn-label-left">'+					
					'Cerrar'+
				'</button>'+
				'<button type="submit" id="event_cancel" class="btn btn-danger btn-label-left pull-right">'+
					'<span><i class="fa fa-clock-o txt-danger"></i></span>'+
					'Cancelar Evento'+
				'</button>'
			);

			// Se abre una ventana modal con el formulario de visualización de evento
			OpenModalBox('Visualizar cita', form, buttons);

			// Se establece función que cierra la ventana modal al hacer click en el boton cerrar
			$('#event_close').on('click', function(){
				CloseModalBox();
			});

			// Se establece función en ejecución del submit del formulario de visualización de evento (cancelar evento)
			$('#event_form').submit(function() { 

				// Confirma la cancelación del evento
				var r=confirm("Está seguro de cancelar este evento?");
				
				// Verifica si se aprobó la cancelación
				if (r==true) {
					console.log('Cancelando evento.. AppointmentId['+calEvent.id+']');
				
					// Se crea un objeto con los valores a pasar en la petición
					var data = {
						appointmentId: calEvent.id					
					};

					// Ejecuta la petición de creación del evento
					var responseData = SyncExecuteFunction('appointments/postcancel', data);

					// Se valida la respuesta de la petición
					if (responseData != null) {

						// Se valida si la respuesta fue negativa
						if (!responseData.success) {

							// Se desplega el mensaje de error
							alert(responseData.errors);
						}
					}

					// Actualiza los eventos desplegados en el calendario
					calendar.fullCalendar('refetchEvents');
				}
				
				// Retorna falso para impedir el evento submit
				return false;
			});

			// Se establece función que realiza cancelación de evento
			$('#event_cancel').on('click', function(){
				// Realiza submit del formulario de visualización de evento (cancelar evento)							
				$('#event_form').submit();
				
				// Cierra la ventana modal
				CloseModalBox();
			});		
		}
	});
}

/*-------------------------------------------
	Demo graphs for xCharts page (charts_xcharts.html)
---------------------------------------------*/
//
// Graph1 created in element with id = xchart-1
//
function xGraph1(){
	var tt = document.createElement('div'),
	leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
	topOffset = -32;
	tt.className = 'ex-tooltip';
	document.body.appendChild(tt);
	var data = {
		"xScale": "time",
		"yScale": "linear",
		"main": [
			{
			"className": ".xchart-class-1",
			"data": [
				{
				  "x": "2012-11-05",
				  "y": 6
				},
				{
				  "x": "2012-11-06",
				  "y": 6
				},
				{
				  "x": "2012-11-07",
				  "y": 8
				},
				{
				  "x": "2012-11-08",
				  "y": 3
				},
				{
				  "x": "2012-11-09",
				  "y": 4
				},
				{
				  "x": "2012-11-10",
				  "y": 9
				},
				{
				  "x": "2012-11-11",
				  "y": 6
				},
				{
				  "x": "2012-11-12",
				  "y": 16
				},
				{
				  "x": "2012-11-13",
				  "y": 4
				},
				{
				  "x": "2012-11-14",
				  "y": 9
				},
				{
				  "x": "2012-11-15",
				  "y": 2
				}
			]
			}
		]
	};
	var opts = {
		"dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
		"tickFormatX": function (x) { return d3.time.format('%A')(x); },
		"mouseover": function (d, i) {
			var pos = $(this).offset();
			$(tt).text(d3.time.format('%A')(d.x) + ': ' + d.y)
				.css({top: topOffset + pos.top, left: pos.left + leftOffset})
				.show();
		},
		"mouseout": function (x) {
			$(tt).hide();
		}
	};
	var myChart = new xChart('line-dotted', data, '#xchart-1', opts);
}
//
// Graph2 created in element with id = xchart-2
//
function xGraph2(){
	var data = {
	"xScale": "ordinal",
	"yScale": "linear",
	"main": [
		{
		"className": ".xchart-class-2",
		"data": [
			{
			  "x": "Apple",
			  "y": 575
			},
			{
			  "x": "Facebook",
			  "y": 163
			},
			{
			  "x": "Microsoft",
			  "y": 303
			},
			{
			  "x": "Cisco",
			  "y": 121
			},
			{
			  "x": "Google",
			  "y": 393
			}
		]
		}
		]
	};
	var myChart = new xChart('bar', data, '#xchart-2');
}
//
// Graph3 created in element with id = xchart-3
//
function xGraph3(){
	var data = {
		"xScale": "time",
		"yScale": "linear",
		"type": "line",
		"main": [
		{
			"className": ".xchart-class-3",
			"data": [
				{
				  "x": "2012-11-05",
				  "y": 1
				},
				{
				  "x": "2012-11-06",
				  "y": 6
				},
				{
				  "x": "2012-11-07",
				  "y": 13
				},
				{
				  "x": "2012-11-08",
				  "y": -3
				},
				{
				  "x": "2012-11-09",
				  "y": -4
				},
				{
				  "x": "2012-11-10",
				  "y": 9
				},
				{
				  "x": "2012-11-11",
				  "y": 6
				},
				{
				  "x": "2012-11-12",
				  "y": 7
				},
				{
				  "x": "2012-11-13",
				  "y": -2
				},
				{
				  "x": "2012-11-14",
				  "y": -7
				}
			]
			}
		]
	};
	var opts = {
		"dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
		"tickFormatX": function (x) { return d3.time.format('%A')(x); }
	};
	var myChart = new xChart('line', data, '#xchart-3', opts);
}

//Get all the movies with similar name
function getMovies(movieName){

	var url = 'http://api.themoviedb.org/3/',
        mode = 'search/movie?query=',
        key = '&api_key=352dc2e4ed8183bd9fbd6f7c5e235f48';
    
        $.ajax({
            type: 'GET',
            url: url + mode + movieName + key,
            async: false,
            jsonpCallback: 'testing',
            contentType: 'application/json',
            dataType: 'jsonp',
            success: function(json) {
                console.dir(json);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
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

	$.support.cors = true;

	$('.show-sidebar').on('click', function () {
		$('div#main').toggleClass('sidebar-show');
		setTimeout(MessagesMenuWidth, 250);
	});
	
	var ajax_url = location.hash.replace(/^#/, '');
	if (ajax_url.length < 1) {
		ajax_url = 'reports';
	}
	//LoadAjaxContent(ajax_url);

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
			window.location.hash = url;
			//LoadAjaxContent(url);
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
			window.location.hash = url;
			//LoadAjaxContent(url);
		}
	});
});
