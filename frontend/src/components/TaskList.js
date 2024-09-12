import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulamos la obtención de tareas
    setTasks([
      { id: 1, title: 'Tarea 1', description: 'Descripción de tarea 1' },
      { id: 2, title: 'Tarea 2', description: 'Descripción de tarea 2' },
    ]);
  }, []);

  return (
    <div>
      <h2>Mis Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
