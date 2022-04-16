const FoodItem = require('../models/foodItem.js');

//get all food item
async function itemsGet(req, res) {
    const items = await FoodItem.findAll();
    res.render('index', { items: items });
}

//get fooditem by id
async function itemGet(req, res){
    const id = req.params.id;
    const item = await FoodItem.findByPk(id);
    res.render('item', { item: item });
}

//post fooditem
async function itemPost(req, res){
    const addItem =  await item.create(req.body);
    res.redirect('/menu');
}


//
module.exports = {
    itemsGet,
    itemGet,
    itemPost
}