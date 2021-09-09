const http = require('http');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');

const app = express();
 
app.use(express.json());

app.set('view engine','hbs');
app.use('/public', express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: false}));

app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
        },
        store: new session.MemoryStore(),
        resave: false,
        saveUninitialized: true, 
        secret: 'SangatRahasiaa',

    })
);

app.use(function(req,res,next){
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})
app.use('/script',express.static(path.join(__dirname,'script')));
app.use('/img',express.static(path.join(__dirname,'/img')));


const dbConnections = require('./connection/db_conections');    

const isLogin = false;

hbs.registerPartials(__dirname + '/views/partials');
  
app.use(function(req,res,next){
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(
    session({
        cookie: {
            maxAge: 1000 * 60 * 60 * 2,
        },
        store: new session.MemoryStore(),
        resave: false,
        saveUninitialized: true, 
        secret: 'SangatRahasiaa',

    })
);

app.get('/', function (request, response){
    const title = 'app webWiki-games';
    response.render('indxhome',{
        title: title   
    });
});

app.get('/addheroes', function (request, response){
    const title = 'addHeroes';
    response.render('addheroes',{
        title: title   
    });
});
app.get('/addtypeheroes', function (request, response){
    const title = 'addtypeHeroes';
    response.render('addtypeheroes',{
        title: title   
    });
});

app.post('/additem-heroes',function(request,response){
    const {nameheroes,photoheroes} = request.body;

    if(nameheroes == '' | photoheroes == '' ){
        request.session.message = {
            type: 'danger',
            message: 'please insert all field!'
        };
        return response.redirect('/addheroes')
    }
    

    const query = `INSERT INTO heroes_tb (name,photo) VALUES("${nameheroes}","${photoheroes}")`
    dbConnections.getConnection(function( err, conn) {
      if(err)throw err;
      conn.query(query, function(err,result){
          if(err)throw err;

          request.session.message = {
            type: 'success',
            message: 'successfully added data...'
        };

          response.redirect('/addheroes')
      });
   });
});



const port = 3600;
const server = http.createServer(app);
server.listen(port);
console.debug(`server listening on port ${port}`);