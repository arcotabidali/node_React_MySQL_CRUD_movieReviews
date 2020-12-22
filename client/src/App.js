import React,{useState,useEffect} from 'react';
import "./App.css";
import Axios from "axios";


function App() {
 const [movieName,setMovieName] = useState("");
 const [review,setReview] = useState("");
 const  [movieList,setMovieList] = useState([]);
 const [newReview,setNewReview] = useState("");
 const[inputValue,setInputValue]=useState("");
 useEffect(()=>{
  
   Axios.get("http://localhost:3001/api/get/").then((response) =>{setMovieList(response.data);})
 },[])

 function submitReq(){
   
Axios.post("http://localhost:3001/api/insert/",{movieName:movieName,movieReview:review});

setMovieList([...movieList,{movieName:movieName,movieReview:review}]);
setMovieName("");
setReview("");

}

function deleteMovie(movieName){
  const path =`http://localhost:3001/api/delete/${movieName}`;  
  Axios.delete(path);

  setMovieList( movieList.filter((item) => {
      return item.movieName !== movieName;}))
}

function updateReview(movieName){
  Axios.put("http://localhost:3001/api/update/",{movieName:movieName,newReview:newReview})
  setMovieList(
    movieList.map((item) => {
      return item.movieName === movieName ? 
          {movieName: item.movieName,    
           movieReview : newReview 
          }
        : item;
    }))
  
}






  return (
    <div className="App">
      <h1>Movie Reviews</h1>
      <div className="form">
        <label> Movie Name:</label>
        <input
        type="text"
        name="movieName"
        className="movieName"
        value={movieName}
        onChange={(e)=>{
          setMovieName(e.target.value);
        }} />

        <lable>Review</lable>  
        <textarea
        type="text"
        name="review"
        className="review"
        value={review}
        onChange={(e)=>{
          setReview(e.target.value);
        }} />
      <button className="padder2" onClick={submitReq}>submit</button>

     { movieList.map((item) =>  
     <div className="card">
     <h1>{item.movieName}</h1> 
     <p>{item.movieReview}</p>
     <div className="padder1"> 
     <button onClick={()=>{deleteMovie(item.movieName)}}>Delete</button>
     <input type="text" onChange={(e)=>{setNewReview(e.target.value)}} id="updateInput"></input>
     <button onClick={()=>{updateReview(item.movieName)}}>Update</button>
     </div>
     </div>
     
     )}
       
      </div>
    </div>
  );
}

export default App;
