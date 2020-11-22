
$('.orange-btn').click(function(e){
    e.preventDefault();
    obj={
        "name": $('#name').val(),
    "email": $('#email').val(),
    "password": $('#password').val()
    }
    console.log(obj)
    var data = JSON.stringify(obj); 
    $.post("https://ode-to-code.herokuapp.com/user/signup",obj, function(response, status){
        
        if(status=='success'){
            $('#red').html('Registered Successfully, please login.')
        }
        else if(status='error'){
            $('#red').html('Email already exists')
        }
        
        
      });
   
})

