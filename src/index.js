import createConnection from './io';

import Interview from './components/Interview';

Interview.connection = createConnection();

Interview.connection.on('connect', () => {
  console.log(`Create connection: ${Interview.connection.id}`);
});

customElements.define('webrtc-interview', Interview);
