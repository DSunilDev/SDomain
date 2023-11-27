const express=require('express')
const path=require('path')

const app=express();

app.use(express.urlencoded({extended:true}))

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('css'));
app.use(express.static('fonts'));
app.use(express.static('img'));
app.use(express.static('imgs'));
app.use(express.static('js'));


app.get('/',function(req,res)
{
    res.render('index'); 
})

app.get('/contact',function(req,res)
{
    res.render('contact'); 
})

app.get('/blog',function(req,res)
{
    res.render('blog'); 
})

app.use(function(req,res)
{
    res.render("404");
})


app.listen(700)