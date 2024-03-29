const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection');

//store user cookies in database
const sequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express(); //what does this do ?
const PORT = process.env.PORT || 3001; //process.env is for heroku

const hbs = exphbs.create({ helpers }) //what does this do?

//config for sessions on express server
const sess = {
    secret: "secret key",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

//add middleware
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => { //force true?
    app.listen(PORT, () => console.log('Now listening'))
})