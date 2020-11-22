
$('.orange-btn').click(function(e){
    obj={
    "email": $('#email').val(),
    "password": $('#password').val()
    }
    console.log(obj)
    var data = JSON.stringify(obj); 
    $.post("https://ode-to-code.herokuapp.com/user/login",obj, function(response, status){
        console.log('response ', response);
        console.log('status ',status)
        let authToken=response.token;
        sessionStorage.setItem("authToken", authToken);        
        if(status=='success'){
            $('#red').html('Logged in.')
            /*Redirect to search page*/
        }
        else if(status='error'){
            $('#red').html('Error :(')
        }    
      });
})

