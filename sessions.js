// setup express and handlebars
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require('express-session');
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set port number to command line argument
app.set('port', process.argv[2]);

//app.use(express.static('public'));
var path = require("path");
app.use(express.static(path.join(__dirname, 'public')))

// home page
app.get('/',function(req,res){
  res.render('home.handlebars');
});


// GET request
app.get('/getpost',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get.handlebars', context);
});


// POST request
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/getpost', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.dataList = qParams;
  res.render('post.handlebars', context);
});


app.get('/weather', function(req,res){
    var context = {};
    res.render('weather.handlebars', context);
});

// count
app.get('/count',function(req,res){
  var context = {};
  context.count = req.session.count || 0;
  req.session.count = context.count + 1;
  res.render('count', context);
});

app.post('/count',function(req,res){
  var context = {};
  if(req.body.command === "resetCount"){
    //req.session.count = 0;
    req.session.destroy();
  } else {
    context.err = true;
  }
  if(req.session){
    context.count = req.session.count;
  } else {
    context.count = 0;
  }
  //req.session.count = context.count + 1;
  res.render('count', context);
});

app.get('/todo',function(req,res,next){
  var context = {};
  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }
  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length || 0;
  context.toDo = req.session.toDo || [];
  console.log(context.toDo);
  res.render('toDo',context);
});

app.post('/todo',function(req,res){
  var context = {};

  if(req.body['New List']){
    req.session.name = req.body.name;
    req.session.toDo = [];
    req.session.curId = 0;
  }

  //If there is no session, go to the main page.
  if(!req.session.name){
    res.render('newSession', context);
    return;
  }

  if(req.body['Add Item']){
    req.session.toDo.push({"name":req.body.name, "id":req.session.curId});
    req.session.curId++;
  }

  if(req.body['Done']){
    req.session.toDo = req.session.toDo.filter(function(e){
      return e.id != req.body.id;
    })
  }

  context.name = req.session.name;
  context.toDoCount = req.session.toDo.length;
  context.toDo = req.session.toDo;
  console.log(context.toDo);
  res.render('toDo',context);
});


app.get('/time',function(req,res){
  res.render('time.handlebars');
});


// random number between 1 and 10
function genRandom(){
  var display = {};
  display.random = Math.floor(Math.random() * 10 + 1);
  return display;
}

app.get('/random', function(req,res){
  res.render('random.handlebars', genRandom());
});

app.get('/form', function(req,res){
  res.render('form.handlebars', genRandom());
});

app.get('/scroll', function(req,res){
  res.render('scroll.handlebars');
});

// error pages
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


// listen on port
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
