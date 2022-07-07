const express = require('express');
const path = require('path');
const socket = require('socket.io');

const tasks = [
  // { id: 1, name: 'Shopping' }, 
  // { id: 2, name: 'Go out with a dog' }
];

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', (socket) => {
  console.log('socket.id', socket.id);
  // send all list of task
  socket.on('updateData', (task) => {
    console.log('Sending a list of tasks to a new client...');
    socket.emit('updateData', task);
  });
  
  // new task from client and send this task to the other client
  socket.on('addTask', (task) => {
    tasks.push(task);
    // console.log('task:', task);
    console.log(tasks);
    socket.broadcast.emit('addTask', task);
    // socket.broadcast.emit('addTask', { id: 2, name: 'Test' });   // test
  });

  // remove task and send removed task (id) to the other client
  socket.on('removeTask', (id) => {
    const taskIndex = tasks.findIndex(tasks => tasks.id == id);
    if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1);
      socket.broadcast.emit('removeTask', id);
      console.log(tasks);
    }
  });
  

});

// app.use(express.static(path.join(__dirname, '/client/')));

// Endpoint: not found pages
app.use((req, res) => {
  if (res.status(404)) res.json({ message: '404: Page not found!' });
})