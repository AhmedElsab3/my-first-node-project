const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
// you can put this in .env file
mongoose.connect("mongodb+srv://ahmedelsaba:tfJDH1wZXxYb4PKw@cluster0.wnaettc.mongodb.net/?appName=Cluster0").
    then(() => {
        app.listen(3000, () => { console.log("Server running on port 3000") });
        console.log("Connected to MongoDB")
    }).
    catch((err) => console.log("Error connecting to MongoDB"));

const Article = require('./models/Article');



app.get("/articles", async (req, res) => {
    const articles = await Article.find();
    res.render('articles', { articles: articles });
})

app.get("/articles/:id", async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.json(article);
})

app.post('/article', async (req, res) => {
    const newArticle = new Article();
    newArticle.title = req.body.title;
    newArticle.body = req.body.body;
    newArticle.numViews = req.body.numViews;
    await newArticle.save();


    res.json({ message: 'Article created' });


});

app.get('/hello/:name', (req, res) => {
    const city = req.query.City;
    res.render('home', { name: req.params.name, age: req.query.age, city: city });
    console.log('params: ', req.params.name);
    console.log('query: ', req.query.age);
    console.log('body: ', city);
});

app.get('/hi', (req, res) => {
    res.send('Hi there!');
});

app.get('/', (req, res) => {
    res.render('welcome');
});

app.post('/post', (req, res) => res.send('This is post route'));

app.put('/put', (req, res) => res.send('This is put route'));

app.delete('/delete', (req, res) => res.send('This is delete route'));

app.get('/bye', (req, res) => res.send('Bye'));

app.post('/number', (req, res) => {
    let number = '';
    for (let i = 0; i < 100; i++) {
        number += i + ' -- ';
    }
    res.send(number);
});

