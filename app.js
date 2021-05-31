const express = require('express')
const request = require('request')
const app = express()

//This configures my environment variables 
//Special type of variables defined in some other files
//which needs do be hidden
const dotenv = require('dotenv')
dotenv.config()

//Middlewares
//Set this property (property_name , value)
app.set("view engine","ejs")
app.use('/public',express.static('public'))
/*
    ROUTING
*/

app.get('/',(req,res)=>{
    //res.send('Home Page from The master')
    res.render("home")
})

app.get('/dummy',(req,res)=>{
    //res.send('Home Page from The master')
    res.render("dummy")
})


// app.get('/student/:rollno/:marks',(req,res)=>{
//     console.log(req.params)
//     //Template string in JavaScript
//     //We specify colon to accept any kind of strings regex
//     //If we want to display any variable inside a string we use " ` " back tick
//     res.send(`You are viewing profile of Student with roll number ${req.params.rollno} and marks ${req.params.marks}`)
// })
app.get('/result',(req,res)=>{
    console.log(req.query)
    //res.send(`You searched for ${req.query.movieName}`)
    const url = ` http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url , function(error , response , body){
        if(!error && response.statusCode === 200){
            const data = JSON.parse(body)
            //res.send(data)
            res.render('result', {moviesDump:data})
        }
        else{
            res.send('Something went wrong')
        }
    })
})

app.get('/result/:id',(req,res)=>{
    const url = ` http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url , function(error , response , body){
        if(!error && response.statusCode === 200){
            const data = JSON.parse(body)
            //res.send(data)
            res.render('detail', {data: data})
        }
        else{
            res.send('Something went wrong')
        }
    })
})

app.get('*',(req,res)=>{
    res.send('404 NOT FOUND')
})
app.listen(3000,()=>{
    console.log("Server has started")
})