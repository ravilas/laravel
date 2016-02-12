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
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internal/min/jquery-2.0.3.core.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internal/min/custom.min.js"></script>
<?php
	} else {
?>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internalmin/jquery.validate.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internalmin/jquery-ui.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internalmin/jquery.ui.touch.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internalmin/QapTcha.jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internal/jquery.animations.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internal/jquery.reorder.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internalmin/txtRWDScale.jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internal/search_validation.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internal/ie_fix.js"></script>
	<script type="text/javascript" src="<?php echo get_stylesheet_directory_uri() . '/public/js/' . $folder; ?>internal/custom.js"></script>
<?php
	}
?>
	</body>
</html>