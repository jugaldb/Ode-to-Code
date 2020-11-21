document.addEventListener("DOMContentLoaded", handle);

function handle(){
    var xh = new XMLHttpRequest;
    xh.open("GET", "https://ode-to-code.herokuapp.com/recipe/random", true);
    xh.setRequestHeader("Content-Type", "application/json");
    xh.send();
    xh.onload = function () {
        if (this.status == 200){
            var data = JSON.parse(this.responseText);
            console.log(data)
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
                <a href ="" class="read">
                    Read
                </a>
            </div>`
           


            $('#card-after').after(card);
            }
        }
    }
}
