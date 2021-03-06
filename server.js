var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;

var dbconfig = {
    user: 'pvbharath',
    database: 'pvbharath',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));




function createTemplate (DataObject){
    var Titl = DataObject.title;
    var Heading = DataObject.heading;
    var Date = DataObject.date;
    var Content = DataObject.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${Titl}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class = "Container">
                <div>
                    <a href = "/">Home</a>
                </div>
                <hr/>
                ${Heading} 
                ${Date.toDateString()}
                <div>
                    ${Content}
                </div>
            </div>
        </body>
    </html>
    
    `;
    return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter = 0;
app.get('/counter',  function(req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var pool = new Pool(dbconfig);

app.get('/test-db', function (req,res){
    pool.query('select * from dbtest', function(err, result){
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result.rows));
       }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

function hash(input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
   var hashedString = hash(req.params.input, 'random-string') ;
   res.send(hashedString);
});

app.get('/create-user', function (req,res) {
   var salt = crypto.getRandomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('Insert into users (username, password) values ($1, $2'), [username, dbstring], function(err,result) {
      if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send('User created');
       } 
   };
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var nameslist = [];
app.get('/submit-name', function(req,res) {
   var nameitem = req.query.name;
   nameslist.push(nameitem);
   res.send(JSON.stringify(nameslist));
}); 

app.get('/:articleName',function(req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(Articles[articleName]));
});

app.get('/articles/:articleName',function(req, res) {
    // var articleName = req.params.articleName;
    pool.query("Select * from article where title = '"+ req.params.articleName + "'", function(err, result){
       if (err) {
           res.status(500).send(err.toString());
       } else {
           if (result.rows.length === 0) {
               res.status(404).send("Article not found");
           }
           else {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
    });
    
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log('Hello from the Server Side');
  console.log(`IMAD course app listening on port ${port}!`);
});