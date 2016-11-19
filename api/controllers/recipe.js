 'use strict';
// Include our "db"
var db = require('../../config/db')();
// Exports all the functions to perform on the db
module.exports = {getAll, save, getOne, update, delRecipe};

//GET /recipe operationId
function getAll(req, res, next) {
  res.json({ recipes: db.find()});
}
//POST /recipe operationId
function save(req, res, next) {
    res.json({success: db.save(req.body), description: "Recipe added to the list!"});
}
//GET /recipe/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var recipe = db.find(id);
    if(recipe) {
        res.json(recipe);
    }else {
        res.status(204).send();
    }
}
//PUT /recipe/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var recipe = req.body;
    if(db.update(id, recipe)){
        res.json({success: 1, description: "recipe updated!"});
    }else{
        res.status(204).send();
    }

}
//DELETE /recipe/{id} operationId
function delRecipe(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    if(db.remove(id)){
        res.json({success: 1, description: "recipe deleted!"});
    }else{
        res.status(204).send();
    }

}