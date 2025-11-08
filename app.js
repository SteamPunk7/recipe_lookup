// Recipe Finder Application

// Common pantry ingredients that are assumed to be available
const PANTRY_STAPLES = [
    'salt', 'pepper', 'oil', 'olive oil', 'vegetable oil',
    'water', 'flour', 'all-purpose flour', 'sugar',
    'baking soda', 'baking powder', 'black pepper'
];

let allRecipes = [];
let userIngredients = [];
let selectedFilters = {
    cuisine: [],
    dietary: [],
    method: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await loadRecipes();
    setupEventListeners();
});

// Load recipes from JSON file
async function loadRecipes() {
    try {
        const response = await fetch('recipes.json');
        allRecipes = await response.json();
        console.log(`Loaded ${allRecipes.length} recipes`);
    } catch (error) {
        console.error('Error loading recipes:', error);
        showError('Failed to load recipes. Please refresh the page.');
    }
}

// Setup event listeners
function setupEventListeners() {
    const findBtn = document.getElementById('find-recipes-btn');
    const clearBtn = document.getElementById('clear-filters-btn');
    const ingredientsInput = document.getElementById('ingredients-input');

    findBtn.addEventListener('click', handleFindRecipes);
    clearBtn.addEventListener('click', handleClearFilters);

    // Add event listeners for filter checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });

    // Allow Enter key to trigger search
    ingredientsInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleFindRecipes();
        }
    });
}

// Handle filter changes
function handleFilterChange(event) {
    const filterType = event.target.name;
    const filterValue = event.target.value;

    if (event.target.checked) {
        if (!selectedFilters[filterType].includes(filterValue)) {
            selectedFilters[filterType].push(filterValue);
        }
    } else {
        selectedFilters[filterType] = selectedFilters[filterType].filter(
            value => value !== filterValue
        );
    }
}

// Handle find recipes button click
function handleFindRecipes() {
    const ingredientsInput = document.getElementById('ingredients-input');
    const ingredientsText = ingredientsInput.value.trim();

    if (ingredientsText === '') {
        showError('Please enter at least one ingredient.');
        return;
    }

    // Parse user ingredients
    userIngredients = parseIngredients(ingredientsText);

    // Add pantry staples to user ingredients
    const allAvailableIngredients = [...userIngredients, ...PANTRY_STAPLES];

    // Filter and match recipes
    let filteredRecipes = filterRecipes(allRecipes);
    let matchedRecipes = matchRecipes(filteredRecipes, allAvailableIngredients);

    // Sort by match percentage
    matchedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Display results
    displayRecipes(matchedRecipes);
}

// Handle clear filters button click
function handleClearFilters() {
    // Clear all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Clear selected filters
    selectedFilters = {
        cuisine: [],
        dietary: [],
        method: []
    };

    // Clear ingredients input
    document.getElementById('ingredients-input').value = '';

    // Clear results
    document.getElementById('recipes-container').innerHTML = '';
    document.getElementById('results-header').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';

    userIngredients = [];
}

// Parse ingredients from user input
function parseIngredients(text) {
    // Split by commas and newlines
    let ingredients = text.split(/[,\n]+/)
        .map(ingredient => ingredient.trim().toLowerCase())
        .filter(ingredient => ingredient.length > 0);

    // Remove duplicates
    ingredients = [...new Set(ingredients)];

    return ingredients;
}

// Filter recipes based on selected filters
function filterRecipes(recipes) {
    return recipes.filter(recipe => {
        // Check cuisine filter
        if (selectedFilters.cuisine.length > 0) {
            if (!selectedFilters.cuisine.includes(recipe.cuisine)) {
                return false;
            }
        }

        // Check dietary filter (recipe must have ALL selected dietary properties)
        if (selectedFilters.dietary.length > 0) {
            const hasAllDietary = selectedFilters.dietary.every(dietary =>
                recipe.dietary.includes(dietary)
            );
            if (!hasAllDietary) {
                return false;
            }
        }

        // Check method filter (recipe must have at least ONE selected method)
        if (selectedFilters.method.length > 0) {
            const hasAnyMethod = selectedFilters.method.some(method =>
                recipe.method.includes(method)
            );
            if (!hasAnyMethod) {
                return false;
            }
        }

        return true;
    });
}

// Match recipes based on available ingredients
function matchRecipes(recipes, availableIngredients) {
    return recipes.map(recipe => {
        const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
        const matches = recipeIngredients.filter(ingredient =>
            availableIngredients.some(available =>
                ingredient.includes(available) || available.includes(ingredient)
            )
        );

        const matchPercentage = Math.round((matches.length / recipeIngredients.length) * 100);
        const missingIngredients = recipeIngredients.filter(ingredient =>
            !availableIngredients.some(available =>
                ingredient.includes(available) || available.includes(ingredient)
            )
        );

        return {
            ...recipe,
            matchPercentage,
            matchedIngredients: matches.length,
            totalIngredients: recipeIngredients.length,
            missingIngredients
        };
    }).filter(recipe => recipe.matchPercentage >= 50); // Only show recipes with at least 50% match
}

// Display recipes in the results section
function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    const resultsHeader = document.getElementById('results-header');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');

    container.innerHTML = '';

    if (recipes.length === 0) {
        resultsHeader.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    resultsHeader.style.display = 'block';
    noResults.style.display = 'none';
    resultsCount.textContent = `Found ${recipes.length} recipe${recipes.length !== 1 ? 's' : ''} matching your criteria`;

    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
    });
}

// Create a recipe card element
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    const title = document.createElement('h3');
    title.textContent = recipe.name;
    card.appendChild(title);

    // Meta information (badges)
    const meta = document.createElement('div');
    meta.className = 'recipe-meta';

    // Cuisine badge
    const cuisineBadge = document.createElement('span');
    cuisineBadge.className = 'badge cuisine';
    cuisineBadge.textContent = recipe.cuisine;
    meta.appendChild(cuisineBadge);

    // Time badge
    const timeBadge = document.createElement('span');
    timeBadge.className = 'badge time';
    timeBadge.textContent = `${recipe.time} min`;
    meta.appendChild(timeBadge);

    // Dietary badges
    recipe.dietary.forEach(diet => {
        const badge = document.createElement('span');
        badge.className = 'badge dietary';
        badge.textContent = diet;
        meta.appendChild(badge);
    });

    // Method badges
    recipe.method.forEach(method => {
        const badge = document.createElement('span');
        badge.className = 'badge method';
        badge.textContent = method;
        meta.appendChild(badge);
    });

    card.appendChild(meta);

    // Description
    const description = document.createElement('p');
    description.className = 'recipe-description';
    description.textContent = recipe.description;
    card.appendChild(description);

    // Ingredients section
    const ingredientsSection = document.createElement('div');
    ingredientsSection.className = 'recipe-ingredients';

    const ingredientsTitle = document.createElement('h4');
    ingredientsTitle.textContent = 'Ingredients:';
    ingredientsSection.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement('ul');
    recipe.ingredients.slice(0, 6).forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    if (recipe.ingredients.length > 6) {
        const li = document.createElement('li');
        li.textContent = `+ ${recipe.ingredients.length - 6} more ingredients`;
        li.style.fontStyle = 'italic';
        ingredientsList.appendChild(li);
    }

    ingredientsSection.appendChild(ingredientsList);
    card.appendChild(ingredientsSection);

    // Match information
    const matchInfo = document.createElement('div');
    matchInfo.className = 'match-info';

    const matchText = document.createElement('p');
    matchText.innerHTML = `
        <span class="match-percentage">${recipe.matchPercentage}% Match</span> -
        You have ${recipe.matchedIngredients} of ${recipe.totalIngredients} ingredients
    `;
    matchInfo.appendChild(matchText);

    if (recipe.missingIngredients.length > 0 && recipe.missingIngredients.length <= 3) {
        const missingText = document.createElement('p');
        missingText.textContent = `Missing: ${recipe.missingIngredients.join(', ')}`;
        missingText.style.fontSize = '0.8rem';
        missingText.style.marginTop = '5px';
        matchInfo.appendChild(missingText);
    }

    card.appendChild(matchInfo);

    return card;
}

// Show error message
function showError(message) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = `
        <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c33;">
            ${message}
        </div>
    `;
    document.getElementById('results-header').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';
}
