// app.js
require('dotenv').config();

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const query = searchInput.value.trim();

    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${query}`, {
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
    }
});

function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h2>${recipe.title}</h2>
            <ul>
                <li><strong>Ingredients:</strong> ${recipe.ingredients}</li>
                <li><strong>Servings:</strong> ${recipe.servings}</li>
                <li><strong>Instructions:</strong> ${recipe.instructions}</li>
            </ul>
        `;
        recipeContainer.appendChild(recipeElement);
    });
}
