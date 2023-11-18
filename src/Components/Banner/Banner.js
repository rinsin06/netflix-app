import React,{useEffect,useState} from 'react'
import './Banner.css'
import{API_KEY,imageUrl} from '../../Constants/constants'
import axios from '../../axios'
import { trending } from '../../urls'
function Banner() {

    const [movie,setMovie] = useState()

       useEffect(()=>{
        axios.get(trending).then((response)=>{
        
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            const randomMovie = response.data.results[randomIndex];
        
            console.log(randomMovie);
        
            setMovie(randomMovie);
        
         } )

       },[])

  return (
    <div

    style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path:""})`}}
    
    className='banner'>

        <div className='content'>
            <h1 className='title'>{movie ?( movie.title||movie.name): ""}</h1>
                <div className='banner-buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>My List</button>
                </div>
                <h1 className='description'>{movie ? movie.overview : ""} </h1>
        <div className="fade_button">
            
            </div>        
        </div>
    </div>
  )
}

export default Banner
