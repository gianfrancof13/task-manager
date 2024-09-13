require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/database');
const Usuario = require('./models/User');
const Tarea = require('./models/Task'); 

app.use(express.json());

//Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

sequelize.sync({ force: true })  //force para eliminar y recrear tablas al iniciar serv
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
