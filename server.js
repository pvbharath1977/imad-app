var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

var Articles = {
    'article-one': {
        Titl: "Article One",
        Heading: 'This is the revised Article One from template',
        Content : `<p>
                        This is the content areaThis is the content areaThis is the content areaThis is the content areaThis is the content areaThis is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>`
    },
    'article-two': {
        Titl: "Article Two",
        Heading: 'This is the revised Article Two from template',
        Content : `<p>
                        This is the content areaThis is the content areaThis is the content areaThis is the content areaThis is the content areaThis is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>`
    },
    'article-three': {
        Titl: "Article Three",
        Heading: 'This is the revised Article Three from template',
        Content : `<p>
                        This is the content areaThis is the content areaThis is the content areaThis is the content areaThis is the content areaThis is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>
                    <p>
                        This is the content area
                    </p>`
    }
};


var pool = new Pool(dbconfig);

app.get('test-db', function (req,res){
    pool.query('select * from dbtest', function(err, result){
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send(JSON.stringify(result));
       }
    });
});


function createTemplate (DataObject){
    var Titl = DataObject.Titl;
    var Heading = DataObject.Heading;
    var Content = DataObject.Content;
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



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
