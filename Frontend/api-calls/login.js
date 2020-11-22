
$('.orange-btn').click(function(e){
    e.preventDefault();
    obj={
    "email": $('#email').val(),
    "password": $('#password').val()
    }
    console.log(obj)
    var data = JSON.stringify(obj); 
    $.post("https://ode-to-code.herokuapp.com/user/login",obj, function(response, status){
        
        if(status=='success'){
            $('#red').html('Logged in.')
            /*Redirect to search page*/
        }
        else if(status='error'){
            $('#red').html('Error :(')
        }
        
        
      });
   
})

