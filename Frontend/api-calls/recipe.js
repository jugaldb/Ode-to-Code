var recipeId = sessionStorage.getItem('recipeId');
let datagl;


document.addEventListener("DOMContentLoaded", handle);

function handle() {
    var xh = new XMLHttpRequest;

    xh.open("GET", `https://ode-to-code.herokuapp.com/recipe/info/${recipeId}`, true);
    xh.setRequestHeader("Content-Type", "application/json");

    xh.send();
    xh.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            datagl=data;
            var ingredients = data.extendedIngredients;
            var nutrition = data.nutrition;
            $('.expand-recipe-img').attr('src', data.image)
            $('.recipe-h1').html(data.title);
            $('#like').html(data.aggregateLikes);
            $('.recipe-time').html(`${data.cookingMinutes} mins`);
            for (var i = 0; i < ingredients.length; i++) {
                var current = ingredients[i];
                var row = `<tr>
                <td>${current.name}</td>
                <td>
                ${current.amount}
                </td>
                </tr>`
                $('#ing-after').after(row);
            }
            for (var i = 0; i < nutrition.nutrients.length; i++) {
                var current = nutrition.nutrients[i];
                var row = `<tr>
                <td>${current.title}</td>
                <td>
                ${current.amount} ${current.unit}
                </td>
                </tr>`
                $('#nutrients').after(row);
            }






            $('.orange-btn').click(function (e) {
                e.preventDefault();
                
                obj = {
                    "recipeId": datagl.id,
                    "image": datagl.image,
                    "likes": datagl.aggregateLikes,
                    "name": datagl.title
                }
                console.log(obj)
                var data = JSON.stringify(obj);
                    var xhr = new XMLHttpRequest;
                    
                xhr.open("POST", "https://ode-to-code.herokuapp.com/recipe/save");

                    xhr.setRequestHeader('Content-Type', 'application/json');
                    let token = sessionStorage.getItem('authToken');
                    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                    xhr.send(data);
                    xhr.onload = function () {
                        if (this.status == 200) {
                            console.log('saved recipe to user')
                        }
                    }
                })
            }
        }


     
      
        
    }