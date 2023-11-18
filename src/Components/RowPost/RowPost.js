import React, { useState, useEffect } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { API_KEY, imageUrl } from '../../Constants/constants'
import Youtube from 'react-youtube'
import RowPostPopUp from './RowPostPopUp.js'
import { AlignCenter } from 'react-bootstrap-icons'
import { Button } from 'react-scroll'


function RowPost(props) {

  const [movies, setMovies] = useState([])

  const [urlId, setUrlId] = useState('')

  const [popupMovie, setMoviePop] = useState('')



  const handleListedMovies = (movie) => {
    props.handleListedMovies(movie)
  }
  const handleRemoveListedMovies = (movie)=>{
    props.handleRemoveListedMovies(movie);
  }
  useEffect(() => {
    setMovies(props.data)

  })

  const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {

    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      if (response.data.results.length !== 0) {

        setUrlId(response.data.results[0])
      } else {

        console.log("Array is empty")
      }
    })

  }
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id) => {
    setOpen(true);

  };





  return (
    <div className='row' ref={props.forwardedRef}>
      <h1 >{props.title}</h1>
      {
        <div className='posters'>

          {movies.length > 0 ? movies.map((obj =>

            <img onClick={() => { handleOpen(); handleMovie(obj.id); setMoviePop(obj) }} className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageUrl + obj.poster_path
              }`} alt="poster" />

          )
          ) : <h1>Not found!!</h1>}


        </div>}



      <RowPostPopUp isOpen={open} onClose={handleClose} videoPlay={handleMovie} handleListedMovies={props.handleListedMovies} handleRemoveListedMovies={props.handleRemoveListedMovies} >
        <>
          {urlId && <Youtube videoId={urlId.key} opts={opts} />}
          <div className='fade_popup_bottom'></div>
          <div className='popupcontent'>
            <h1>{popupMovie ? (popupMovie.title || popupMovie.name) : ""}</h1>
            <div style={{ paddingTop: 10 }}>
              <button className='button'>Play</button>
              {
                props.addList.some((add)=>add.id === popupMovie.id) ? <button className='button' onClick={() => { handleRemoveListedMovies(popupMovie) }}>Remove from My List</button> : 
                <button className='button' onClick={() => { handleListedMovies(popupMovie) }}>Add to My List</button>

              }
              <div style={{ paddingTop: 10 }} >
                <h3>Overview:</h3>
                <p style={{ paddingTop: 10 }}>{popupMovie.overview}</p>
              </div>

            </div>

          </div>



        </>
      </RowPostPopUp>


    </div>
  )
}

export default React.forwardRef((props, ref) => <RowPost {...props} forwardedRef={ref} />);
