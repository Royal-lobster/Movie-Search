const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const { join } = require('path');

//middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//routes
app.get('/search', (req,res)=>{
    res.render('search');
});
app.get('/results', (req,res)=>{
    //naming query form url
    let query = req.query.search;
    //requesting the api for data and returning the requested page 
    request(`https://api.themoviedb.org/3/search/movie?api_key=2c67fe173afe33c5019a5dacfa010b96&query=${query}`, (error, response, body) =>{
        //if there is any error
        if(error){
            console.log(error);
        }
        //if api gave data sucessfully, parse the data and pass it to the render as a prop
        let data = JSON.parse(body);
        res.render('movies', {data:data, searchQuery:query});
    });
});
//listen port
app.listen(process.env.PORT, ()=>{
    console.log('server started at port 3000');
})