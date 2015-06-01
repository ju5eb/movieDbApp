<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>{{Lang::get('dashboard_fields.title')}}</title>
		<meta name="description" content="description">
		<meta name="author" content="Ju5eb">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
		<link href='http://fonts.googleapis.com/css?family=Righteous' rel='stylesheet' type='text/css'>
		{{ HTML::style('plugins/bootstrap/bootstrap.css', array('media' => 'screen')) }}
		{{ HTML::style('plugins/jquery-ui/jquery-ui.min.css', array('media' => 'screen')) }}
				
		{{ HTML::style('css/style.css', array('media' => 'screen')) }}
		{{ HTML::script('plugins/jquery/jquery-2.1.0.min.js') }}
		{{ HTML::script('plugins/jquery-ui/jquery-ui.min.js') }}		

	</head>
<body>
<header class="navbar">
	<div class="container-fluid expanded-panel">
		<div class="row">
			<div id="logo" class="col-xs-12 col-sm-5 top-panel-left">
				<a href="#">{{Lang::get('dashboard_fields.title')}}</i></a>
			</div>
			<div id="top-panel" class="col-xs-12 col-sm-7">
				
			</div>
		</div>
	</div>
</header>
<!--End Header-->
<!--Start Container-->
<div id="main" class="container-fluid">	
	<div class="row">
		<div id="sidebar-left" class="col-xs-2 col-sm-2">
			<ul class="nav main-menu">				
				<li class="dropdown">
					<a href="#" class="dropdown-toggle">
						<i class="fa fa-list"></i>
						<span class="hidden-xs">{{Lang::get('dashboard_fields.list')}}</span>
					</a>
					<ul class="dropdown-menu">						
						<li>
							<a href="movies" class="ajax-link">
								<i class="fa fa-video-camera"></i>
								<span class="hidden-xs">{{Lang::get('dashboard_fields.menuTitleMovies')}}</span>
							</a>							
						</li>
						<li>
							<a href="actors" class="ajax-link">
								<i class="fa fa-users"></i>
								<span class="hidden-xs">{{Lang::get('dashboard_fields.menuTitleActors')}}</span>
							</a>
						</li>						
					</ul>
				</li>						
			</ul>
		</div>
		<!--Start Content-->
		<div id="content" class="col-xs-12 col-sm-10">
			<div class="preloader">
				{{ HTML::image('img/devoops_getdata.gif', 'preloader', array('class'=>'devoops-getdata')) }}
			</div>
			<div id="ajax-content"></div>
		</div>
		<!--End Content-->
	</div>
</div>
<!--End Container-->
<!-- Include all compiled plugins (below), or include individual files as needed -->
		{{ HTML::script('plugins/bootstrap/bootstrap.min.js') }}
		{{ HTML::script('plugins/datatables/jquery.dataTables.js') }}
		{{ HTML::script('plugins/datatables/ZeroClipboard.js') }}
		{{ HTML::script('plugins/datatables/TableTools.js') }}
		{{ HTML::script('plugins/datatables/dataTables.bootstrap.js') }}
				
		<!-- All functions for this theme + document.ready processing -->
		{{ HTML::script('js/devoops.js') }}
</body>

</html>
