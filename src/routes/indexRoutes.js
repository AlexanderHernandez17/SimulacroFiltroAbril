const express = require('express');
// Llamamos el enrutador a traves del metodo Router() 
const router = express.Router();
//Importacion del controlador de usuario
const userController = require('../controllers/userController');
// Importamos la estrategia e inicializacion de la autenticacion
const auth = require('../middleware/auth');



//Definicion de rutas y asignaciones a funciones del controlador
router.post('/api/users/create', userController.createUser);
router.get('/api/users', userController.getAllUsers);
router.get('/api/users/id/:id', userController.getUserById);
router.patch('/api/users/update/:userName', userController.updateUser);
router.delete('/api/users/delete/:userName', userController.deleteUser)

module.exports = router;