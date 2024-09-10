const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Crear tarea
router.post('/', auth, async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await Task.create({ title, description, userId: req.user.userId });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creando la tarea', error });
    }
});

// Leer tareas
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.userId } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error leyendo las tareas', error });
    }
});

// Actualizar tarea
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const task = await Task.findOne({ where: { id, userId: req.user.userId } });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        task.title = title;
        task.description = description;
        task.completed = completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error actualizando la tarea', error });
    }
});

// Eliminar tarea
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findOne({ where: { id, userId: req.user.userId } });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

        await task.destroy();
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error eliminando la tarea', error });
    }
});

module.exports = router;
