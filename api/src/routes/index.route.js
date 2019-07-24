const express = require('express');
const router  = express.Router();

// Authorization Middleware
const AuthorizationMiddleware = require('./../middlewares/authorizations.middleware');

// Controller
const UserController = require('./../controllers/user.controller');
const AuthController = require('./../controllers/auth.controller');

// Routes
router.get('/users/:id?', AuthorizationMiddleware.validate, UserController.list);
router.post('/register', UserController.validate('createUser'), UserController.add);
router.put('/user/update/:id', UserController.validate('updateUser'), UserController.update);
router.delete('/user/delete/:id', UserController.delete);
router.post('/login', AuthController.validate('loginUser'), AuthController.login);

module.exports = router;