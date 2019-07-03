import * as http from 'http';
import * as socket from 'socket.io';

import app from './server';

const port = process.env.PORT || 3001;
const server = new http.Server(app);

export const io = socket(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', () => {
  io.emit('hello', { hello: 'hello' });
  console.log('New Socket Connection');
});
app.listen(port, () => console.log(`Server is starting on port - ${port}`));
