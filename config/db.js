'use strict;'
//Include crypto to generate the recipe id
var crypto = require('crypto');

module.exports = function() {
    return {
        recipeList : [],
        /*
         * Save the recipe inside the "db".
         */
        save(recipe) {
            recipe.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.recipeList.push(recipe);
            return 1;
        },
        /*
         * Retrieve a recipe with a given id or return all the recipes if the id is undefined.
         */
        find(id) {
            if(id) {
                return this.recipeList.find(element => {
                        return element.id === id;
                    });
            }else {
                return this.recipeList;
            }
        },
        /*
         * Delete a recipe with the given id.
         */
        remove(id) {
            var found = 0;
            this.recipeList = this.recipeList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;
        },
        /*
         * Update a recipe with the given id
         */
        update(id, recipe) {
            var recipeIndex = this.recipeList.findIndex(element => {
                return element.id === id;
            });
            if(recipeIndex !== -1) {
                this.recipeList[recipeIndex].title = recipe.title;
                this.recipeList[recipeIndex].ingredients = recipe.ingredients;
                this.recipeList[recipeIndex].method = recipe.method;
                this.recipeList[recipeIndex].difficulty = recipe.difficulty;
                this.recipeList[recipeIndex].cookingTime = recipe.cookingTime;
                return 1;
            }else {
                return 0;
            }
        }
    }
};