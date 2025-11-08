# Recipe Finder

A smart recipe finder web application that helps you discover delicious recipes based on ingredients you have available.

## Features

- **Ingredient-Based Search**: Enter the ingredients you have, and find recipes you can make
- **Smart Matching**: Recipes are matched and scored based on how many ingredients you have
- **Multiple Filters**:
  - **Cuisine Types**: Italian, Mexican, Asian, Indian, American, Mediterranean
  - **Dietary Preferences**: Vegetarian, Gluten Free, Low Carb, Low Fat, Low Calorie, Spicy
  - **Cooking Methods**: Quick (Under 30 min), Crockpot, Instant Pot, Make Ahead, Freezable
- **Pantry Staples**: Common ingredients are automatically included (salt, pepper, oil, water, flour, sugar, baking soda, baking powder)
- **Match Percentage**: See how many ingredients you have for each recipe
- **Responsive Design**: Works great on desktop, tablet, and mobile devices

## How to Use

1. **Enter Your Ingredients**: Type the ingredients you have in the text area (one per line or comma-separated)
2. **Select Filters** (optional): Choose cuisine types, dietary preferences, or cooking methods
3. **Click "Find Recipes"**: The app will show you matching recipes sorted by match percentage
4. **Browse Results**: Each recipe card shows:
   - Recipe name and description
   - Cuisine type and cooking time
   - Dietary tags and cooking method
   - List of ingredients
   - Match percentage (you'll only see recipes with 50%+ match)
   - Missing ingredients (if any)

## Example Usage

### Example 1: Quick Dinner
```
Ingredients: chicken, broccoli, soy sauce, garlic
Filters: Quick
Result: Chicken Stir Fry, Teriyaki Chicken Bowl
```

### Example 2: Vegetarian Meal
```
Ingredients: tomatoes, pasta, basil, mozzarella
Filters: Vegetarian, Italian
Result: Margherita Pizza, Caprese Salad, Pesto Pasta
```

### Example 3: Low-Carb Option
```
Ingredients: beef, broccoli, eggs
Filters: Low Carb
Result: Beef and Broccoli, Shakshuka
```

## Technology Stack

- **HTML5**: Structure and content
- **CSS3**: Styling with modern flexbox and grid layouts
- **Vanilla JavaScript**: No frameworks - pure, fast JavaScript
- **JSON**: Recipe database storage

## File Structure

```
recipe_lookup/
├── index.html       # Main HTML file
├── styles.css       # All styling
├── app.js          # Application logic
├── recipes.json    # Recipe database (30 recipes)
└── README.md       # This file
```

## GitHub Pages Deployment

This project is designed to work seamlessly with GitHub Pages:

1. Push all files to your GitHub repository
2. Go to repository Settings > Pages
3. Select the branch to deploy (e.g., `main` or your feature branch)
4. Your site will be available at: `https://[username].github.io/[repository-name]/`

## Recipe Database

The current prototype includes 30 diverse recipes covering:
- Multiple cuisines (Italian, Mexican, Asian, Indian, American, Mediterranean)
- Various dietary options (vegetarian, gluten-free, low-carb, etc.)
- Different cooking methods (quick, crockpot, instant pot, etc.)

### Adding More Recipes

To add more recipes, edit `recipes.json`:

```json
{
  "id": 31,
  "name": "Recipe Name",
  "cuisine": "italian",
  "dietary": ["vegetarian"],
  "method": ["quick"],
  "time": 20,
  "description": "Brief description",
  "ingredients": ["ingredient1", "ingredient2"],
  "instructions": "Cooking instructions"
}
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Add recipe instructions display
- Save favorite recipes (localStorage)
- Print recipe functionality
- Share recipe links
- Filter by cooking time
- Nutrition information
- User-submitted recipes
- Recipe images
- Integration with recipe APIs

## License

This is a prototype project for demonstration purposes.

## Contributing

Feel free to fork this project and add your own recipes or features!
