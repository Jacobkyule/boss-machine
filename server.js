const express = require('express');
const app = express();

module.exports = app;

app.use(express.static(__dirname))
/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json())

//logging
const morgan = require('morgan');
app.use(morgan('dev'));

// Mount your existing apiRouters below at the '/api' path.
const minionsRouter = require('./server/minions');
app.use('/api/minions', minionsRouter)

const ideasRouter = require('./server/ideas');
app.use('/api/ideas', ideasRouter)

const meetingsRouter = require('./server/meetings')
app.use('/api/meetings', meetingsRouter)

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
  })
}
