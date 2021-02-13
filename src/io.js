import { io } from 'socket.io-client';

function createConnection() {
  const connection = io(`${window.location.hostname}:5454`);

  return connection;
}

export default createConnection;
