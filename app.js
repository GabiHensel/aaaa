const express = require('express');
const router = require('./routers/route.js');
const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const handlebarsHelpers = require('./handlebarsHelpers');
const app = express();
app.use(express.static('public'));

let hbs = expressHandlebars.create({
  handlebars: Handlebars,
  defaultLayout: 'main',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router); 

app.use(session({
  secret: 'suaChaveSecreta',
  resave: false,
  saveUninitialized: false
}));

app.use(
    express.urlencoded({
        extended: true
    })
)

app.listen(4000,function(){
    console.log("server online");
});
