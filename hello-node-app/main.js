const http = require('http');
const terminus = require('node_modules/@godaddy/terminus');

function onSignal () {
  console.log('server is starting cleanup');
  return Promise.all([
    // your clean logic, like closing database connections
  ]);
}

function onShutdown () {
  console.log('cleanup finished, server is shutting down');
}

const server = http.createServer((request, response) => {
  response.end(
    `<html>
      <body>
        <h1>Hello, Olympus Griffin!</h1>
       </body>
     </html>`
   );
})

const options = {
  // healtcheck options
  healthChecks: {
    '/healthcheck': check          // a promise returning function indicating service health
  },

  // cleanup options
  timeout: 1000,                   // [optional = 1000] number of milliseconds before forcefull exiting
  signal,                          // [optional = 'SIGTERM'] what signal to listen for relative to shutdown
  onSignal,                        // [optional] cleanup function, returning a promise (used to be onSigterm)
  onShutdown,                      // [optional] called right before exiting

  // both
  logger                           // [optional] logger function to be called with errors
};

terminus(server, options);

server.listen(PORT || 8000);
