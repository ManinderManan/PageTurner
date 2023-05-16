const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
//const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
// setup express to use sessions and cookies
// process the cookie
const sessionConfig = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: false,
};


// const hbs = exphbs.create({
//   helpers
// });


const app = express();

const PORT = process.env.PORT || 3001;

// setup express handlebars engine

app.use(session(sessionConfig));
//app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');




// Express middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use(routes);


sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});