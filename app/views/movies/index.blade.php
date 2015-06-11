<script type="text/javascript">
	
	$(document).ready(function() {	

		// Create Data Table component
		CreateDataTable()

		// Load data from API
		getAPIData('movie',null);		
	});

	// Search function using the movieDB API
	function search(){		
		// Load data from API
		getAPIData('movie',$('#movie_name').val());
	}

</script>
<div class="row">
	<div id="breadcrumb" class="col-md-12">
		<ol class="breadcrumb">			
			<li><a href="#">{{Lang::get('movies_fields.title')}}</a></li>			
		</ol>
	</div>
</div>
<div class="row">
	<div class="col-xs-12 col-md-12">
		<div class="box">
			<div class="box-header">
				<div class="box-name">
					<h3>					
						<span>{{Lang::get('movies_fields.title')}}</span>
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
					<button class="btn btn-primary btn-label-left" onclick="search();">{{Lang::get('movies_fields.search')}}</button>
					<div class="loadingDiv box-content" style="display:none;">
						{{ HTML::image('img/devoops_getdata.gif', 'preloader', array('class'=>'devoops-getdata')) }}
					</div>					
				</div>				
			</div>			
			<div class="box-content no-padding">
				
				<table class="table table-bordered table-striped table-hover table-heading table-datatable" id="datatable-1">
					<thead>
						<tr>							
							<th>{{Lang::get('movies_fields.poster')}}</th>
							<th>{{Lang::get('movies_fields.name')}}</th>							
							<th>{{Lang::get('movies_fields.date')}}</th>
							<th>{{Lang::get('movies_fields.vote_average')}}</th>
							<th>{{Lang::get('movies_fields.vote_count')}}</th>
						</tr>
					</thead>
					<tbody>					

					</tbody>					
				</table>


			</div>	


		</div>
	</div>
</div>
