<div class="row">
	<div id="breadcrumb" class="col-md-12">
		<ol class="breadcrumb">			
			<li><a class="ajax-call" href="person">{{Lang::get('actors_fields.title')}}</a></li>			
			<li><a href="#">{{Lang::get('actors_fields.detail_title')}}</a></li>
		</ol>
	</div>
</div>
<div class="row">
	<div class="col-xs-12 col-md-12">
		<div class="box">
			<div class="box-header">
				<div id="person_title" class="box-name">
					<h3>					
						<span>{{Lang::get('actors_fields.detail_title')}}</span>
					</h3>
				</div>
				<div class="box-icons">					
					<a class="expand-link">
						<i class="fa fa-expand"></i>
					</a>					
				</div>
				<div class="no-move"></div>
			</div>
			<div class="box-content form-horizontal">					
					
				<div class="form-group">
				    <label class="col-sm-2 control-label">{{Lang::get('actors_fields.image')}}</label>
					<div id="profile_pic_div" class="col-sm-4">
					    {{ HTML::image('http://vicsport.com.au/wp-content/themes/vicsport/img/no_image.jpg', 'profile_path', array('id' => 'person_profile_path')) }}
				    </div>

				    <div class="form-group">
						<label class="col-sm-2 control-label">{{Lang::get('actors_fields.name')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'person_name',
						    		null, 
				    				array(	'id' => 'person_name',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>						
					
					    <label class="col-sm-2 control-label">{{Lang::get('actors_fields.birthdate')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'person_birthdate',
						    		null, 
				    				array(	'id' => 'person_birthdate',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>

						<label class="col-sm-2 control-label">{{Lang::get('actors_fields.place_of_birth')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'person_place_of_birth',
						    		null, 
				    				array(	'id' => 'person_place_of_birth',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>	
					
					    <label class="col-sm-2 control-label">{{Lang::get('actors_fields.popularity')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'person_popularity',
						    		null, 
				    				array(	'id' => 'person_popularity',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>	

					    <label class="col-sm-2 control-label">{{Lang::get('actors_fields.biography')}}</label>
						<div class="col-sm-4">
						    {{ Form::textarea('notes', null, array('id' => 'person_biography', 'class' => 'form-control')) }}
					    </div>		
					</div>
				</div>				
			</div>						
			<hr/>
			<h3>					
				<span>{{Lang::get('actors_fields.related_movies')}}</span>
			</h3>		
			<div class="box-content no-padding">
				
				<table class="table table-bordered table-striped table-hover table-heading table-datatable" id="datatable-1">
					<thead>
						<tr>							
							<th>{{Lang::get('movies_fields.poster')}}</th>
							<th>{{Lang::get('movies_fields.name')}}</th>							
							<th>{{Lang::get('movies_fields.date')}}</th>
							<th>{{Lang::get('movies_fields.character')}}</th>
						</tr>
					</thead>
					<tbody>					

					</tbody>					
				</table>


			</div>	


		</div>
	</div>
</div>
