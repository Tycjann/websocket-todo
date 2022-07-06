const express = require('express');
const path = require('path');
const socket = require('socket.io');

const tasks = [
  { id: 1, name: 'Shopping' }, 
  { id: 2, name: 'Go out with a dog' }
];

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server);

io.on('connection', (socket) => {
  
  // send all list of task
  socket.on('updateData', (tasks) => {
    console.log('Sending a list of tasks to a new client...');
    socket.emit('updateData', tasks);
  });

  // new task from client and send this task to the other client
  socket.on('addTask', (task) => {
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });

  // remove task and send removed taskId to the other client
  socket.on('removeTask', (taskId) => {
    const taskIndex = tasks.findIndex(tasks => tasks.id == taskId);
    if (userIndex >= 0) {
      tasks.splice(taskIndex, 1);
      socket.broadcast.emit('removeTask', taskId);
    }
  });

});

// app.use(express.static(path.join(__dirname, '/client/')));

// Endpoint: not found pages
app.use((req, res) => {
  if (res.status(404)) res.json({ message: '404: Page not found!' });
})