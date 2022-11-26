const express = require('express');
const config = require('./src/settings');
const cors = require('cors');
const createAccount = require('./src/routes/createAccountRoutes');
const confirmAccountRoute = require('./src/routes/confirmAccountRoutes');
const loginRoute = require('./src/routes/loginRoute');
const budgetRoute = require('./src/routes/budgetRouter');
const incomeExpenseRoute = require('./src/routes/incomeExpenseRoute');
const transfersDepostisRoute = require('./src/routes/transfersDepositsRoute');
const validateTokenRoute = require('./src/routes/validateToken');
const checkAuthUser = require('./src/middlewares/checkAuthUser');

// Define the app
const app = express();

// White list URLS
const whiteLists = [ config.front_url ]

// Allow valid endpoints
const corsOptions = {
    origin: function(origin, callback) {
        if(whiteLists.includes( origin )) {
            callback(null, true)
        }else {
            callback( new Error(`The URL provided is not a valid URL`))
        }
    }
}
// Enable cors with withe list allowed
//app.use(cors(corsOptions))

// Enable cors
app.use( cors() ); // Option added for development procces once it is deployed should be changed
// Enable JSON
app.use(express.json({ extended: true}));

// Configure the port
const port = config.port;

// Routes will be created here
app.use('/api/create-account', createAccount);
app.use('/api/confirm-account', confirmAccountRoute);
app.use('/api/login', loginRoute);
app.use('/api/validate', validateTokenRoute)

// Protected Routes for making CRUD Operantions
app.use('/api/budget', checkAuthUser, budgetRoute);
app.use('/api/incomes-expenses', checkAuthUser, incomeExpenseRoute);
app.use('/api/movements', checkAuthUser, transfersDepostisRoute);

// Server
app.listen( (port), () => {
    console.log(`App is running on port ${port}`);
});


// Postgres sql port 5432
// password super admin 123456