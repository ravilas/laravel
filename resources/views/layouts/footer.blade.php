							</div> <!-- .content -->
						</div> <!-- contentholder -->
					</div> <!-- #rightsidecontainer -->
				</div> <!-- .containerwrapper -->
				<div class="contentoverflow"></div> 
			</div> <!-- .container -->
 		</div> <!-- .jviewport --> 		 				
<?php
	function get_stylesheet_directory_uri() {
		return '';
	}
	$folder = '';
	$minifiedJs = stristr($_SERVER['SERVER_NAME'], ".com" );
	if($minifiedJs) {
?>
	<script type="text/javascript" src="{{ URL::asset('js/internal/min/jquery-2.0.3.core.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internal/min/custom.min.js') }}"></script>
<?php
	} else {
?>
	<script type="text/javascript" src="{{ URL::asset('js/jquery-2.1.4.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internalmin/jquery.validate.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internalmin/jquery-ui.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internalmin/jquery.ui.touch.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internalmin/QapTcha.jquery.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internal/jquery.animations.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internal/jquery.reorder.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internalmin/txtRWDScale.jquery.min.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internal/search_validation.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internal/ie_fix.js') }}"></script>
	<script type="text/javascript" src="{{ URL::asset('js/internal/custom.js') }}"></script>
<?php
	}
?>
	</body>
</html>