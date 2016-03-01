(function ($) {
    $(document).ready(function(){
        $( ".widget_search_form" ).submit(function( e ) {
            var hasError = false;
            var searchReg = new RegExp(";");
            var searchReg2 = new RegExp("[a-zA-Z0-9]+");;
            var searchVal = $('.widget_search form [type="text"]').val();
            if(searchVal == '') {
                $(".widget_search .error").html('Please enter a search term.');
                hasError = true;
            } else if(searchReg.test(searchVal)||!searchReg2.test(searchVal)) {
                $(".widget_search .error").html('Enter valid text.');
                hasError = true;
            }
            if(hasError) {
                $(".widget_search .error").show();
                if(!e.defaultPrevented) e.preventDefault();
                return false;
            }
            else {
                $(".widget_search .error").hide();
            }
        });
    });
})(jQuery);