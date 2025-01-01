// Načtení receptů z Local Storage
function loadRecipes(filter = 'vše') {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes
        .filter(recipe => filter === 'vše' || recipe.type === filter)
        .forEach((recipe, index) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';

            recipeDiv.innerHTML = `
                <h2>${recipe.title}</h2>
                <div class="ingredients">
                    <h3>Ingredience:</h3>
                    <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                </div>
                <div class="steps">
                    <h3>Postup:</h3>
                    <ol>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
                </div>
                <button onclick="confirmDeleteRecipe(${index})">Smazat recept</button>
            `;

            recipesContainer.appendChild(recipeDiv);
        });
}

// Přidání nového receptu
function addRecipe() {
    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(i => i.trim());
    const steps = document.getElementById('recipe-steps').value.split(',').map(s => s.trim());
    const type = document.getElementById('recipe-type').value;

    if (!title || ingredients.length === 0 || steps.length === 0) {
        alert('Vyplňte všechny údaje!');
        return;
    }

    const newRecipe = { title, ingredients, steps, type };
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    document.getElementById('recipe-title').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-steps').value = '';

    loadRecipes();
}

// Zobrazení potvrzení a smazání receptu
function confirmDeleteRecipe(index) {
    const confirmed = confirm('Opravdu chcete smazat tento recept?');
    if (confirmed) {
        deleteRecipe(index);
    }
}

// Smazání receptu
function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    loadRecipes();
}

// Filtrování receptů
function filterRecipes(filter) {
    loadRecipes(filter);
}

// Načíst recepty při načtení stránky
window.onload = () => loadRecipes();
