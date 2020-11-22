/*const { $where } = require("../../Backend/api/models/user");*/
$('.search-submit').click(function(e){

    let type=$('#search-type option:selected').text();
    sessionStorage.setItem("searchType", type);
    let searchString=$('.form-input').val();
    sessionStorage.setItem("searchStr", searchString);
})


document.addEventListener("DOMContentLoaded", handle);
function handle(){
    var xh = new XMLHttpRequest;
    
    xh.open("GET", "https://ode-to-code.herokuapp.com/recipe/random", true);
    xh.setRequestHeader("Content-Type", "application/json");
    xh.send();
    xh.onload = function () {
        if (this.status == 200){
            var data = JSON.parse(this.responseText);
            
            for(var i=0; i<data.recipes.length; i++){
                let e=data.recipes[i];
                var card=`<div class="card">
                <img src="${e.image}" alt="" class="recipe-img">
                <div class="card-header">
                    <h4>${e.title}</h4>
                    <span class="likes">
                        <img src="./Frontend/assets/img/heart.png" alt="" class="like">
                        ${e.aggregateLikes}
                    </span>
                </div>
                <h5>${e.readyInMinutes} mins</h5>  
           
                <a href ="./Frontend/recipe.html" class="read">
                    Read 
                </a>
                    <span class="hide element-id">${e.id}</span>
            </div>`
            
           

             
            $('#card-after').after(card);
            let reads=$('.read');
            $.each(reads, function(key, value){
                $(value).click(function(e){
                    
                   
                    let id=$(value).parent().children('.element-id').html();
                    
                     sessionStorage.setItem("recipeId", id);

                })
            })
            

            
            
            }


            
        }
    }
}
