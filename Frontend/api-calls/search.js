

let token= sessionStorage.getItem("authToken");   
if(token){
    $('.login-btn').addClass('hide');
    $('.logout-btn').removeClass('hide');
    $('.profile-btn').removeClass('hide');
    $('.register-btn').addClass('hide');
}
else{
    $('.login-btn').removeClass('hide');
    $('.logout-btn').addClass('hide');
    $('.profile-btn').addClass('hide');
    $('.register-btn').removeClass('hide');
}



$('.search-submit').click(function(){
    let type=$('#search-type option:selected').text();
    sessionStorage.setItem("searchType", type);
    let searchString=$('.form-input').val();
    sessionStorage.setItem("searchStr", searchString);
var searchType = sessionStorage.getItem('searchType');
var searchStr = sessionStorage.getItem('searchStr');
/*Please change searchStr to correct format*/

if (searchType == 'Ingredient') {
    let ss=searchStr.split(',')
    console.log(ss)
    let previousChips=$('.chip');
    $.each(previousChips, function(key, val){
        $(val).addClass('hide');
    })
    for(var i=0; i<ss.length; i++){
        var chip=`<div class="chip">${ss[i]} <i class="fas fa-times"></i></div>`;
        $('#chip').after(chip);
    }

    var xh = new XMLHttpRequest;

    xh.open("GET", `https://ode-to-code.herokuapp.com/recipe/ingredients/${searchStr}`, true);
    xh.setRequestHeader("Content-Type", "application/json");

    xh.send();
    xh.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data)
            for(var i=0; i<data.length; i++){
                
                let current=data[i];
                let card=`<div class="search-c">
                <div class="sc-f">
                    <img src="${current.image}" alt="" class="search-img">
                    <span>
                        <h4> ${current.title}</h4>
                       
                        <h5>Missing: ${current.missedIngredients.name}</h5>
                        
                    </span>
                </div>
                <div class="sc-l">
                    <a href="./recipe.html" class="read">
                        Read
                    </a>
                    <span class="element-id hide">${current.id}</span>
                </div>
    
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
else{
    let previousChips=$('.chip');
    $.each(previousChips, function(key, val){
        $(val).addClass('hide');
    })
    var xh = new XMLHttpRequest;

    xh.open("GET", `https://ode-to-code.herokuapp.com/recipe/name/${searchStr}`, true);
    xh.setRequestHeader("Content-Type", "application/json");

    xh.send();
    xh.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data)
            for(var i=0; i<data.results.length; i++){
                let current=data.results[i];
                let card=`<div class="search-c">
                <div class="sc-f">
                    <img src="${current.image} alt="" class="search-img">
                    <span>
                        <h4> ${current.title}</h4>
                       
                    </span>
                </div>
                <div class="sc-l">
                    <a href="./recipe.html" class="read">
                        Read
                    </a>
                    <span class="element-id hide">${current.id}</span>
                </div>
    
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
})


var searchType = sessionStorage.getItem('searchType');
var searchStr = sessionStorage.getItem('searchStr');
/*Please change searchStr to correct format*/

if (searchType == 'Ingredient') {
    let ss=searchStr.split(',')
    console.log(ss)
    let previousChips=$('.chip');
    $.each(previousChips, function(key, val){
        $(val).addClass('hide');
    })
    for(var i=0; i<ss.length; i++){
        var chip=`<div class="chip">${ss[i]} <i class="fas fa-times"></i></div>`;
        $('#chip').after(chip);
    }

    var xh = new XMLHttpRequest;

    xh.open("GET", `https://ode-to-code.herokuapp.com/recipe/ingredients/${searchStr}`, true);
    xh.setRequestHeader("Content-Type", "application/json");

    xh.send();
    xh.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data)
            for(var i=0; i<data.length; i++){
                let current=data[i];
                let card=`<div class="search-c">
                <div class="sc-f">
                    <img src="${current.image} alt="" class="search-img">
                    <span>
                        <h4> ${current.title}</h4>
                       
                        
                    </span>
                </div>
                <div class="sc-l">
                    <a href="./recipe.html" class="read">
                        Read
                    </a>
                    <span class="element-id hide">${current.id}</span>
                </div>
    
            </div>`;


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
else if(searchType=='Recipe'){
    let previousChips=$('.chip');
    $.each(previousChips, function(key, val){
        $(val).addClass('hide');
    })
    var xh = new XMLHttpRequest;

    xh.open("GET", `https://ode-to-code.herokuapp.com/recipe/name/${searchStr}`, true);
    xh.setRequestHeader("Content-Type", "application/json");
    xh.send();
    xh.onload = function () {
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
           
            for(var i=0; i<data.results.length; i++){

                let current=data.results[i];
                let card=`<div class="search-c">
                <div class="sc-f">
                    <img class="search-img"  src="${current.image}" >
                    <span>
                        <h4> ${current.title}</h4>
                       
                    </span>
                </div>
                <div class="sc-l">
                    <a href="./recipe.html" class="read">
                        Read
                    </a>
                    <span class="element-id hide">${current.id}</span>
                </div>
    
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
$('.logout-btn').click(function(){
    localStorage.removeItem("authToken");
})