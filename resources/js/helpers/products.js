export const  commaSeparateIngredients = (ingredients) =>
    ingredients.reduce((ingredientsString, ingredient, i) => {
            if (i === 0) {
                return ingredient.name
            }
            return ingredientsString += ", " + ingredient.name
        }
        , "")
