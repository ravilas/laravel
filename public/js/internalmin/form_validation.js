$(document).ready(function(){           
    $("#salesforce-form").validate({
        rules:
        {
            Email: { 
                required: true,
                email: true
            }
        },
        submitHandler: function()
        {
            $.post("http://gapwebsite.staging.wpengine.com/wp-admin/admin-ajax.php", {
                action: 'submit_contact',
                FirstName: $("#FirstName").val(),
                LastName: $("#LastName").val(),
                Email: $("#Email").val(),
                Phone: $("#Phone").val(),
                Zip: $("#Zip").val()
            }, function(resp){
                $("#salesforce-form").hide();
                $("#thank-you").fadeIn();
            });
        }
    });
});
