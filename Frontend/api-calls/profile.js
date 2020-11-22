document.addEventListener("DOMContentLoaded", handle);

function handle() {

    var xhr = new XMLHttpRequest;
    
xhr.open("GET", "https://ode-to-code.herokuapp.com/user/me");

    xhr.setRequestHeader('Content-Type', 'application/json');
    let token = sessionStorage.getItem('authToken');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send();
    xhr.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data)
            $('.p-name').html(data.user.name);
            $('.p-email').html(data.user.email)

            for (let i = 0; i < data.user.recipes.length; i++) {
                let current = data.user.recipes[i];
                let card = ` <div class="card">
            <img src="${current.image}" alt="" class="recipe-img">
            <div class="card-header">
                <h4>${current.name}</h4>
                <span class="likes">
                <img src="./Frontend/assets/img/heart.png" alt="" class="like">
                ${current.likes}
                </span>
            </div>
            <h5></h5>  
            <a href ="./recipe.html" class="read">
                Read
            </a>
            <span class="hide recipe-id">${current.recipeId}</span>
        </div>`



                $('#saved').after(card)


            }
            let reads = $('.read');
            $.each(reads, function (key, value) {
                $(value).click(function (e) {


                    let id = $(value).parent().children('.recipe-id').html();

                    sessionStorage.setItem("recipeId", id);

                })
            })

        }
    }


}