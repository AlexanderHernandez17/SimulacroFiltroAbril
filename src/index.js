const express = require('express');
const connectDB = require('../src/config/db');
const routes = require('../src/routes/indexRoutes');
const auth = require('../src/middleware/auth');

const app = express();
const port = 3000;

//conecta a la base de datos MongoDB
connectDB()

//Analiza las solicitudes entrantes con el tipo de contenido application/json.
app.use(express.json())

// Analiza las solicitudes entrantes con el tipo de contenido application/x-www-form-urlencoded.
// Al establecer extended en false, se utiliza la función querystring de Node.js para analizar los cuerpos de las solicitudes entrantes.
// Al establecer extended en true, se utiliza la biblioteca qs para analizar los cuerpos de las solicitudes entrantes, lo que permite analizar objetos anidados y matrices.
app.use(express.urlencoded({ extended: false }));

app.use(auth.initialize());

//Configura las rutas
app.use('/', routes);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
