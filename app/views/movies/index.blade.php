<script type="text/javascript">
	
	// Se ejecutan los plug-in de la tabla de datos y los combos
	$(document).ready(function() {	
		TestTable1();
		getMovies();
	});

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
			<div class="box-content no-padding">
				<table class="table table-bordered table-striped table-hover table-heading table-datatable" id="datatable-1">
					<thead>
						<tr>							
							<th>{{Lang::get('movies_fields.name')}}</th>							
							<th>{{Lang::get('movies_fields.date')}}</th>
							<th>{{Lang::get('movies_fields.genre')}}</th>
							<th>{{Lang::get('movies_fields.director')}}</th>
						</tr>
					</thead>
					<tbody>
					<!-- Start: list_row -->
						

					</tbody>					
				</table>
			</div>			
		</div>
	</div>
</div>