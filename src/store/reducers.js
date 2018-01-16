import * as aT from './actionTypes';
const initalState = {
    recipes: {
        'Apple Pie': {
            name: 'Apple Pie',
            ingredients: {
                apples: '2',
                cinnamon: '1 tbs',
                butter: '1 stick'},
            instructions: 'cooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooking'
        },
        'potato soup': {
            name: 'potato soup',
            ingredients: {
                potatos: '2',
                milk: '1 cup',
                butter: '1 stick'},
            instructions: 'cooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooking'
        }
    }
};

const reducer = (state = initalState, action) => {
    switch(action.type) {
        case aT.ADD_RECIPE:
            let newIngredients = {};
            for (let ing in action.ingredients) {
                newIngredients[ing] = action.ingredients[ing];
            }
            let newState = {...state};
            newState.recipes = {
                ...state.recipes, 
                [action.name]: {
                    name: action.name,
                    ingredients: newIngredients, 
                    instructions: action.instructions
                } 
            }
            localStorage.setItem('recipes', JSON.stringify(newState.recipes));
            return newState;
        case aT.GET_RECIPES:
            if (!localStorage.recipes) {
                localStorage.setItem('recipes', JSON.stringify(state.recipes));
                return state;
            }
            return {recipes: JSON.parse(localStorage.getItem('recipes'))};
        case aT.REMOVE_RECIPE:
            let recipes = JSON.parse(localStorage.getItem('recipes'));
                delete recipes[action.name];
                localStorage.setItem('recipes', JSON.stringify(recipes));
                return {recipes: recipes};
        case aT.EDIT_RECIPE:
            let editedRecipes = JSON.parse(localStorage.getItem('recipes'));
            if (action.oName !== action.name){
                delete editedRecipes[action.oName];
            }
            let editedIngredients = {};
            for (let ing in action.ingredients) {
                editedIngredients[ing] = action.ingredients[ing];
            }
            editedRecipes[action.name] = {
                name: action.name,
                ingredients: editedIngredients,
                instructions: action.instructions
            }
            localStorage.setItem('recipes', JSON.stringify(editedRecipes));
            return {recipes: editedRecipes};
        default: return state;
    }
};

export default reducer;
