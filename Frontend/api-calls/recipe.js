var recipeId = sessionStorage.getItem('recipeId');
document.addEventListener("DOMContentLoaded", handle);


function handle(){
    var xh = new XMLHttpRequest;

    xh.open("GET", `https://ode-to-code.herokuapp.com/recipe/info/${recipeId}`, true);
    xh.setRequestHeader("Content-Type", "application/json");
    
    xh.send();
    xh.onload=function(){
        if (this.status == 200){
            var data = JSON.parse(this.responseText);
            var ingredients=data.extendedIngredients;
            var nutrition=data.nutrition;
            $('.recipe-h1').html(data.title);
            $('#like').html(data.aggregateLikes);
            $('.recipe-time').html(`${data.cookingMinutes} mins`);
            for(var i=0; i<ingredients.length; i++){
                var current=ingredients[i];
                var row=`<tr>
                <td>${current.name}</td>
                <td>
                ${current.amount}
                </td>
                </tr>`
                $('#ing-after').after(row);
            } 
            for(var i=0; i<nutrition.nutrients.length; i++)  
            {
                var current=nutrition.nutrients[i];
                var row=`<tr>
                <td>${current.title}</td>
                <td>
                ${current.amount} ${current.unit}
                </td>
                </tr>`
                $('#nutrients').after(row);
            }
        }
    }


    var xhr = new XMLHttpRequest;

    xhr.open("GET", `https://ode-to-code.herokuapp.com/recipe/similar/${recipeId}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.send();
    xhr.onload=function(){
        if (this.status == 200)
        {
            var data = JSON.parse(this.responseText);

            for(var i=0; i<data.length; i++)
            {
                let e=data[i];
                var card=`<div class="card">
                <img src="" alt="" class="recipe-img">
                <div class="card-header">
                    <h4>${e.title}</h4>
                    
                  
                    
                </div>
                <h5>${e.readyInMinutes} mins</h5>  
           
                <a href ="./Frontend/recipe.html" class="read">
                    Read 
                </a>
                    <span class="hide element-id">${e.id}</span>
            </div>`
            
           

             
            $('#card-after').after(card);
            }
 
        }
    }
}
