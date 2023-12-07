const express=require('express')
const path=require('path')
const fs=require('fs')

const app=express();

app.use(express.urlencoded({extended:true}))

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('dicons'));
app.use(express.static('css'));
app.use(express.static('fonts'));
app.use(express.static('img'));
app.use(express.static('imgs'));
app.use(express.static('js'));
app.use(express.static('mail'));

function readVisitorCount() {
    try {
        const count = fs.readFileSync('visitor_count.txt', 'utf8');
        return parseInt(count);
    } catch (err) {
        return 0;
    }
}

function updateVisitorCount(count) {
    try {
        fs.writeFileSync('visitor_count.txt', count.toString(), 'utf8');
    } catch (err) {
        console.error('Error updating visitor count:', err);
    }
}


app.get('/',function(req,res)
{
    let visitorCount = readVisitorCount();
    visitorCount++; // Increment the visitor count
    updateVisitorCount(visitorCount);
    res.render('index', { visitorCount })
})

app.get('/contact',function(req,res)
{
    res.render('contact'); 
})

app.get('/blog',function(req,res)
{
    res.render('blog'); 
})

app.get('/portfolio',function(req,res)
{
    res.render('portfolio'); 
})

app.get('/doctors',function(req,res)
{
    res.render('doctors'); 
})

app.get('/about',function(req,res){
    res.render('about')
})

app.get('/sitemap', function(req, res) {
    // Assuming 'sitemap.xml' is in the root directory of your project
    const filePath = __dirname + '/sitemap.xml';
    
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            console.error('Error reading sitemap.xml:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.set('Content-Type', 'application/xml');
            res.send(data);
        }
    });
});

app.use(function(req,res)
{
    res.render("404");
})


app.listen(500)