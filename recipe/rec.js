function downloadRecipe(recipeUrl) {
    const link = document.createElement('a');
    link.href = recipeUrl;
    link.download = 'recipes.html';
    link.click();
  }
  


// const search= document.getElementById("searchInput")

// search.addEventListener('input', ()=>{
//     const searchedTerm= search.value.toLowerCase();

//     const recipeCard=document.getElementsByClassName("menu");


//     for (let i=0;i<recipeCard.length; i++){
//         const recipeCards = recipeCard[i];
//         const recipeTitle = recipeCards.querySelector('h4').textContent.toLowerCase();

//         if (recipeTitle.includes(searchedTerm)) {
//             recipeCards.style.display = 'block';
//         }
//         else{
//             recipeCards.style.display = 'none';
//         }
//     }

  
// })