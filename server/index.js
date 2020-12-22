const express = require("express");
const app = express();
const bodyParser=require("body-parser");
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "cruddatabase",
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/api/get",(req,res)=>{
  const sqlSelect = "SELECT * FROM movie_reviews;"
  db.query(
    sqlSelect,(err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
});


app.post("/api/insert/", (req, res) => {
const movieName = req.body.movieName;
const movieReview = req.body.movieReview;
 const sqlInsert = "INSERT INTO movie_reviews (movieName,movieReview) VALUES(?,?);"
  db.query(
    sqlInsert,[movieName,movieReview],(err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("succssfully inserted")
      }
    }
  )
});


app.delete("/api/delete/:id", (req, res) => {
  const movieName = req.params.id;
  console.log(movieName);
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName= ?";
  
  db.query(sqlDelete,movieName,(err,result)=>{
   if(err){console.log(err)}
  })

})


app.put("/api/update/", (req, res) => {
  const movieName = req.body.movieName;
  const newReview = req.body.newReview;
    const sqlUdate = "UPDATE movie_reviews  SET movieReview = ? WHERE movieName= ?";
  
  db.query(sqlUdate,[newReview,movieName],(err,result)=>{
   if(err){console.log(err)}
  })

})





app.listen(3001, () => {
    console.log("your server is running on port 3001");
  });