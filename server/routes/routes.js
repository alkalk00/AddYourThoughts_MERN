const app = require('express').Router();
const appController = require('../controllers/users');

app.post('/',appController.postReq);
app.get('/',appController.getReq);
app.patch('/:id',appController.updPost);
app.delete('/:id',appController.deletePost);
app.patch('/:id/likepost',appController.likePost);

module.exports = app;