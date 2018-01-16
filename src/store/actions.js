import * as aT from './actionTypes';

export const addRecipe = (name, instructions, ingredients) => {
    return {
        type: aT.ADD_RECIPE,
        name: name,
        instructions: instructions,
        ingredients: ingredients 
    };
};

export const getRecipes = () => {
    return {
        type: aT.GET_RECIPES
    }
};

export const removeRecipe = (name) => {
    return {
        type: aT.REMOVE_RECIPE,
        name: name
    }
};

export const editRecipe = (oName, name, instructions, ingredients) => {
    return {
        type: aT.EDIT_RECIPE,
        oName: oName,
        name: name,
        instructions: instructions,
        ingredients: ingredients 
    }
};
