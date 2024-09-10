require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const sequelize = require('./config/database'); // Importar la conexión a la base de datos
const Usuario = require('./models/User'); // Importar modelo de Usuario
const Tarea = require('./models/Task');   // Importar modelo de Tarea

// Middleware para parsear JSON
app.use(express.json());

// Rutas de usuario y tareas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Sincronizar base de datos
sequelize.sync({ force: true })  // Eliminar y volver a crear las tablas cada vez que se ejecuta
  .then(() => {
    console.log('Base de datos sincronizada');
    
    // Iniciar el servidor una vez que la base de datos esté sincronizada
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
