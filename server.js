var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var ArticleOne = {
    Title: "Article One",
    Heading: 'This is the revised Article One',
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

function createTemplate (DataObject){
    var Title = DataObject.Title;
    var Heading = DataObject.Heading;
    var Content = DataObject.Content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${Title}
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/article-one',function(re, res) {
    res.send(createTemplate(ArticleOne));
});

app.get('/article-two',function(re, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-Three',function(re, res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
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
