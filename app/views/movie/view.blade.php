<div class="row">
	<div id="breadcrumb" class="col-md-12">
		<ol class="breadcrumb">			
			<li><a class="ajax-call" context="movie_top" href="movie">{{Lang::get('movies_fields.title')}}</a></li>			
			<li><a href="#">{{Lang::get('movies_fields.detail_title')}}</a></li>
		</ol>
	</div>
</div>
<div class="row">
	<div class="col-xs-12 col-md-12">
		<div class="box">
			<div class="box-header">
				<div id="movie_title" class="box-name">
					<h3>					
						<span>{{Lang::get('movies_fields.detail_title')}}</span>
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
				    <label class="col-sm-2 control-label">{{Lang::get('movies_fields.poster')}}</label>
					<div id="poster_div" class="col-sm-4">
					    {{ HTML::image('http://vicsport.com.au/wp-content/themes/vicsport/img/no_image.jpg', 'poster', array('id' => 'movie_poster')) }}
				    </div>

				    <div class="form-group">
						<label class="col-sm-2 control-label">{{Lang::get('movies_fields.name')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'movie_name',
						    		null, 
				    				array(	'id' => 'movie_name',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>						
					
					    <label class="col-sm-2 control-label">{{Lang::get('movies_fields.date')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'movie_date',
						    		null, 
				    				array(	'id' => 'movie_date',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>

						<label class="col-sm-2 control-label">{{Lang::get('movies_fields.vote_average')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'movie_vote_average',
						    		null, 
				    				array(	'id' => 'movie_vote_average',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>	
					
					    <label class="col-sm-2 control-label">{{Lang::get('movies_fields.vote_count')}}</label>
						<div class="col-sm-4">
						    {{
						    	Form::text(	
						    		'movie_vote_count',
						    		null, 
				    				array(	'id' => 'movie_vote_count',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>	

					    <label class="col-sm-2 control-label">{{Lang::get('movies_fields.overview')}}</label>
						<div class="col-sm-4">
						    {{ Form::textarea('notes', null, array('id' => 'movie_overview', 'class' => 'form-control')) }}
					    </div>		
					</div>
				</div>				
			</div>						
			<hr/>
			<h3>					
				<span>{{Lang::get('movies_fields.cast')}}</span>
			</h3>		
			<div class="box-content no-padding">
				
				<table class="table table-bordered table-striped table-hover table-heading table-datatable" id="datatable-1">
					<thead>
						<tr>							
							<th>{{Lang::get('actors_fields.image')}}</th>
							<th>{{Lang::get('actors_fields.id')}}</th>							
							<th>{{Lang::get('actors_fields.name')}}</th>
							<th>{{Lang::get('actors_fields.character')}}</th>
						</tr>
					</thead>
					<tbody>					

					</tbody>					
				</table>


			</div>	


		</div>
	</div>
</div>
