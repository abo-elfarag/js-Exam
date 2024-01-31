// Global variables for DOM elements
let foodList = [];
let inputSearchLetter = document.getElementById('inputSearchletter');
let inputSearchName = document.getElementById('inputSearchName');
let inputFirstName = document.getElementById('inputFirstName');
let inputPhone = document.getElementById('inputPhone');
let inputEmail = document.getElementById('inputEmail');
let inputPassword = document.getElementById('inputPassword');
let inputRepassword = document.getElementById('inputRepassword');
let close = document.getElementById('close');
// ---------------------------------------------------------------------------------------------------------------------------
// Fetch and display initial food data on page load
async function getFood(){
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    let response = await request.json();

    displayFood(response.meals)
}
// Display a grid of food items on the main page
function displayFood(meals){
    let cols ="";
    for( var i = 0 ; i < meals.length ; i++){
        cols += `<div class="col-lg-3 col-md-4" onclick="displayDetails(${meals[i].idMeal})" role="button">
        <div class="item rounded-3 overflow-hidden position-relative  role="button">
            <img src="${meals[i].strMealThumb}" alt="" class="w-100">
            <div class="item-content position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center bg-white opacity-75">
                <h2 class="text-black">${meals[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("dataRow").innerHTML = cols;
}
// Initialize the application by fetching and displaying food data
getFood();

// ---------------------------------------------------------------------------------------------------------------------------
// Display detailed information about a selected food item
async function displayDetails(id){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let response = await request.json();

    details(response.meals[0]);
}
// Display detailed information about a selected food item, including ingredients and instructions
function details(details){
    let ulRecipes = '';
    for (let i = 1; i < 21; i++) {
        if(details[`strIngredient${i}`] == "" || details[`strIngredient${i}`] == null){
            ulRecipes += ''
        }else{
            ulRecipes += `<li>${details[`strMeasure${i}`]} ${details[`strIngredient${i}`]}</li>`
        }
    }
    let ulTags = '';
    if(details.strTags == null){
        ulTags += `<li class="bg-black"></li>`;
    }else{
        let arrTags = details.strTags.split(',');
        for (let i = 0; i < 21; i++){
            if(arrTags[i] == "" || arrTags[i] == null){
                ulTags += ''
            }else{
                ulTags += `<li>${arrTags[i]}</li>`
            }
        }
    }
    let contentDetails = `<div class="row g-4 text-white">
    <div class="col-md-4">
        <img src="${details.strMealThumb}" alt="" class="w-100 rounded-2">
        <h2>${details.strMeal}</h2>
    </div>
    <div class="col-md-8 content">
        <h3>Instructions</h3>
        <p>${details.strInstructions}</p>
        <h3>Area : ${details.strArea}</h3>
        <h3>Category :  ${details.strCategory} </h3>
        <h3 class="mb-0">Recipes : <br>
            <ul class="d-flex flex-wrap recipes mt-3 ms-3 mb-2">
                ${ulRecipes}
            </ul>
        </h3>
        <h3 class="mb-5">Tags  : <br> 
            <ul class="d-flex flex-wrap mt-3 ms-3 mb-2 tags">
                ${ulTags}
            </ul>
        </h3>
        <a class="btn btn-success" href="${details.strSource}" target="_blank">Source</a>
        <a class="btn btn-danger" href="${details.strYoutube}" target="_blank">youtube</a>
    </div>
</div>`
    document.getElementById("dataDetails").innerHTML = contentDetails;
    $('.details').css("display", "block");
    $('body').css('overflow','hidden');
}
// Close the detailed view
$('#close').on('click',function(){
    $('.details').css("display", "none");
    $('body').css('overflow','auto');
})

// ----------------------------------------------------------------------------------------------------------------------------
// Search functionality based on the first letter of the meal name
inputSearchLetter.addEventListener('keyup',function(){
    let term = inputSearchLetter.value;
    searchFood(term);
})
// Fetch and display search results based on the first letter of the meal name
async function searchFood(letters){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letters}`)
    let response = await request.json();

    displaySearch(response.meals)
}
// Display search results on the page
function displaySearch(searchMeals){
    let cols ="";
    for( var i = 0 ; i < searchMeals.length ; i++){
        cols += `<div class="col-lg-3 col-md-4" onclick="displayDetails(${searchMeals[i].idMeal})" role="button">
        <div class="item rounded-3 overflow-hidden position-relative">
            <img src="${searchMeals[i].strMealThumb}" alt="" class="w-100">
            <div class="item-content position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center bg-white opacity-75">
                <h2 class="text-black">${searchMeals[i].strMeal}</h2>
            </div>
        </div>
    </div>`
    }
    document.getElementById("rowSearch").innerHTML = cols;
}
// Event listener for the search button
$('#search').on('click' , function(){
    $('#loader2').fadeIn(0);
    $('.search').css('display','block');
    $('.categories').css('display','none');
    $('.area').css('display','none');
    $('.main').css('display','none');
    $('.ingredients').css('display','none');
    $('.contact').css('display','none');
    // close the side bar
    $('.close-icon').css('display','none');
    $('.open-icon').css('display','block');
    $('.side-navbar').css('margin-left','-256px');
    $('#loader2').fadeOut(1000);
})
// ------------------------------------------------------------------------------------------------------------------------
// Event listener for searching by meal name
inputSearchName.addEventListener('keyup',function(){
    let term = inputSearchName.value;
    searchName(term);
})
// Fetch and display search results based on meal name
async function searchName(term){
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    let response = await request.json();

    displaySearch(response.meals,term);
}

// --------------------------------------------------------------------------------------------------------------------------
// Fetch and display food categories
async function categoryFood(){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let response = await request.json();
    
    displayCategory(response.categories);
}
// Display food categories
function displayCategory(categories){
    let cols ="";
    for( var i = 0 ; i < categories.length ; i++){
        cols += `<div class="col-lg-3 col-md-4" >
        <div class="item rounded-3 overflow-hidden position-relative" role="button" onclick="categoryMeals('${categories[i].strCategory}')">
            <img src="${categories[i].strCategoryThumb}" alt="" class="w-100">
            <div class="item-content position-absolute top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center bg-white opacity-75 text-center overflow-hidden">
                <p><span>${categories[i].strCategory}</span> <br> ${categories[i].strCategoryDescription.slice(0,100)}</p>
            </div>
        </div>
    </div>`
    }
    document.getElementById("rowCategory").innerHTML = cols;
}
// Event listener for category button
$('#category').on('click' , function(){
    $('#loader2').fadeIn(0);
    $('.categories').css('display','block');
    $('.main').css('display','none');
    $('.search').css('display','none');
    $('.area').css('display','none');
    $('.ingredients').css('display','none');
    $('.contact').css('display','none');
    categoryFood();
    // close the side bar
    $('.close-icon').css('display','none');
    $('.open-icon').css('display','block');
    $('.side-navbar').css('margin-left','-256px');
    $('#loader2').fadeOut(1000);
})
// Event listener for selecting a category and displaying related meals
async function categoryMeals(category){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let response = await request.json();

    displayCategoryMeals(response.meals);
}
// Display meals based on selected category
function displayCategoryMeals(meals){
    $('.categories').css('display','none');
    displayFood(meals);
    $('.main').css('display','block');
}
// ------------------------------------------------------------------------------------------------------------------------------
// Fetch and display areas
async function areaFood(){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let response = await request.json();
    
    displayArea(response.meals);
}
// Display areas
function displayArea(area){
    let cols ="";
    for( var i = 0 ; i < area.length ; i++){
        cols += `<div class="col-lg-3 col-md-4" >
        <div class="text-white text-center" role="button" onclick="areaMeals('${area[i].strArea}')">
            <i class="fa-solid fa-house-laptop"></i>
            <h3>${area[i].strArea}</h3>
        </div>
    </div>`
    }
    document.getElementById("rowArea").innerHTML = cols;
}
// Event listener for area button
$('#area').on('click' , function(){
    $('#loader2').fadeIn(0);
    $('.area').css('display','block');
    $('.search').css('display','none');
    $('.main').css('display','none');
    $('.categories').css('display','none');
    $('.ingredients').css('display','none');
    $('.contact').css('display','none');
    areaFood();
    // close the side bar
    $('.close-icon').css('display','none');
    $('.open-icon').css('display','block');
    $('.side-navbar').css('margin-left','-256px');
    $('#loader2').fadeOut(1000);
})
// Event listener for selecting an area and displaying related meals
async function areaMeals(area){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await request.json();
    
    displayAreaMeals(response.meals);
}
// Display meals based on selected area
function displayAreaMeals(meals){
    $('.area').css('display','none');
    displayFood(meals);
    $('.main').css('display','block');
}

// -----------------------------------------------------------------------------------------------------------------------------------
// Fetch and display ingredients
async function ingredientsFood(){
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let response = await request.json();
    
    displayIngredients(response.meals);
}
// Display ingredients
function displayIngredients(ing){
    let cols ="";
    for( var i = 0 ; i < 20 ; i++){
        cols += `<div class="col-lg-3 col-md-4 onclick="ingredientsMeals('${ing[i].strIngredient}')"">
        <div class="text-white text-center" role="button">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h2>${ing[i].strIngredient}</h2>
            <p>${ing[i].strDescription.slice(0,100)}</p>
        </div>
    </div>`
    }
    document.getElementById("rowIngredients").innerHTML = cols;
}
// Event listener for ingredients button
$('#ingredients').on('click' , function(){
    $('#loader2').fadeIn(0);
    $('.ingredients').css('display','block');
    $('.area').css('display','none');
    $('.search').css('display','none');
    $('.main').css('display','none');
    $('.categories').css('display','none');
    $('.contact').css('display','none');
    ingredientsFood();
    // close the side bar
    $('.close-icon').css('display','none');
    $('.open-icon').css('display','block');
    $('.side-navbar').css('margin-left','-256px');
    $('#loader2').fadeOut(1000);
})
// Event listener for selecting an ingredient and displaying related meals
async function ingredientsMeals(ingredients){
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let response = await request.json();
    
    displayIngredientsMeals(response.meals);
}
// Display meals based on selected ingredient
function displayIngredientsMeals(meals){
    $('.ingredients').css('display','none');
    displayFood(meals);
    $('.main').css('display','block');
}
// -----------------------------------------------------------------------------------------------------------------------------------
// Event listener for contact button
$('#contact').on('click' , function(){
    $('#loader2').fadeIn(0);
    $('.contact').css('display','block');
    $('.ingredients').css('display','none');
    $('.area').css('display','none');
    $('.search').css('display','none');
    $('.main').css('display','none');
    $('.categories').css('display','none');
    // close the side bar
    $('.close-icon').css('display','none');
    $('.open-icon').css('display','block');
    $('.side-navbar').css('margin-left','-256px');
    $('#loader2').fadeOut(1000);
})
// Validation functions for user input fields
function validUserName(){
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(inputFirstName.value.trim());
}
function validEmail(){
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(inputEmail.value);
}
function validPhone(){
    var regex = /^(?:\+?20)?(01)[0125]\d{8}$/;
    return regex.test(inputPhone.value);
}
function validPassword(){
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(inputPassword.value);
}
// Event listeners for user input fields
$('#inputFirstName').on('keyup',function(){
    if(validUserName() == false){
        $(this).next().css('display','block');
    }else{
        $(this).next().css('display','none');
    }
})

$('#inputEmail').on('keyup',function(){
    if(validEmail() == false){
        $(this).next().css('display','block');
    }else{
        $(this).next().css('display','none');
    }
})

$('#inputPhone').on('keyup',function(){
    if(validPhone() === false){
        $(this).next().css('display','block');
    }else{
        $(this).next().css('display','none');
    }
})

$('#inputPassword').on('keyup',function(){
    if(validPassword() == false){
        $(this).next().css('display','block');
    }else{
        $(this).next().css('display','none');
    }
})

$('#inputRepassword').on('keyup',function(){
    if(inputPassword.value !== inputRepassword.value){
        $(this).next().css('display','block');
    }else{
        $(this).next().css('display','none');
    }
})

$('.form-control').on('keyup',function(){
    if(validUserName() == true && validEmail() == true && validPassword() == true &&  inputPassword.value == inputRepassword.value){
        $('#submitBtu').removeAttr("disabled");
    }
})

// -------------------------------------------------------------------------------------------------------------------------------------
// Code for opening the side navbar...
$('.open-icon').on('click' , function(){
    $('.side-navbar').css('margin-left','0px');
    $('.close-icon').css('display','block');
    $('.open-icon').css('display','none');
})
// Code for closing the side navbar...
$('.close-icon').on('click' , function(){
    $('.close-icon').css('display','none');
    $('.open-icon').css('display','block');
    $('.side-navbar').css('margin-left','-256px');
})
// Code for handling document ready state...
$(document).ready(function(){
    $('#loader').fadeOut(1000,function(){
        $('body').css('overflow','auto');
    });
})

$(document).ready(function () {
    $('#loader2').fadeOut(1000);
    $('body').css('overflow','auto')
})
