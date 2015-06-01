<div class="row">
	<div id="breadcrumb" class="col-md-12">
		<ol class="breadcrumb">			
			<li>
				{{ 												
					HTML::link('#', 
					Lang::get('movies_fields.title'), 
					$attributes = array('class'=>'ajax-link', 'onclick' => 'LoadAjaxContent("movies"); return false;'), 
					$secure = null);
				}}					
			<li>
				<a href="#">{{Lang::get('movies_fields.view')}}</a>
			</li>			
		</ol>
	</div>
</div>
<div class="row">
	<div class="col-xs-12 col-sm-12">
		<div class="box">
			<div class="box-header">
				<div class="box-name">
					<i class="fa fa-search"></i>
					<span>{{Lang::get('movies_fields.view')}}</span>
				</div>
				<div class="box-icons">
					
					<a class="expand-link">
						<i class="fa fa-expand"></i>
					</a>
					
				</div>
				<div class="no-move"></div>
			</div>
			<div class="box-content">
				<div id="errors_div"></div>
				<h4 class="page-header">{{Lang::get('movies_fields.view')}}</h4>
				{{ Form::open(array('class'=>'form-horizontal')) }}				
					
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
						    		'release_date',
						    		null, 
				    				array(	'id' => 'release_date',
				    						'class'=>'form-control', 
						    				'data-toggle'=>'tooltip', 
						    				'data-placement'=>'bottom')) 
							}}
					    </div>										
					</div>					   
				{{ Form::close() }}
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">

	$(document).ready(function() {	
		// Get the movie Id
		var movieId = "<?php echo $movieId; ?>";

		alert(movieId);
		// Load data from API
		getAPIData('movie', movieId);
	});
</script>