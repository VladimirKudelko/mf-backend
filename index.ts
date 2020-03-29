import * as http from 'http';
import * as socket from 'socket.io';

import app from './server';

const port = process.env.PORT || 3001;
const server = http.createServer(app);

export const io = socket(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', (socketIO) => {
  console.log('New Socket Connection');
});

server.listen(port, () => console.log(`Server is starting on port - ${port}`));
