const app = require('express').Router();
const appController = require('../controllers/users');
const middleware = require('../middleware/auth')

app.post('/',middleware, appController.postReq);
app.get('/', appController.getReq);
app.patch('/:id',middleware, appController.updPost);
app.delete('/:id',middleware, appController.deletePost);
app.patch('/:id/likepost',middleware, appController.likePost);

module.exports = app;