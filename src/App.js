import React, { useRef, useState, useEffect } from 'react'
import './App.css';
import axios from './axios'
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';
import { action, comedy, documentary, horror, orginals, romance, trending } from './urls';


function App() {
  const actionRef = useRef(null);
  const horrorRef = useRef(null);
  const orginalsRef = useRef(null);
  const trendingRef = useRef(null);
  const comedyRef = useRef(null);
  const romanceRef = useRef(null);
  const documetaryRef = useRef(null);

  const [orginalsData, setOrginalsData] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [horrorData, setHorrorData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [comedyData, setComedyData] = useState([]);
  const [romanceData, setRomanceData] = useState([]);
  const [documentaryData, setDocumentaryData] = useState([]);
  // ... Add states for other responses as needed
  const [allMovies, setAllMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchRow, setSearchRow] = useState(false);
  const [listView, setListView] = useState(false);
  const [listedMovies, setListedMovies] = useState(() => {
    // Retrieve state from sessionStorage on component mount
    const savedState = sessionStorage.getItem('listedMovies');
    return savedState ? JSON.parse(savedState) : [];
  });
  
  



  useEffect(() => {

    sessionStorage.setItem('listedMovies', JSON.stringify(listedMovies));



    // Fetch data from multiple APIs
    const fetchMovies = async () => {
      try {
        const response1 = await axios.get(orginals);
        const response2 = await axios.get(action);
        const response3 = await axios.get(horror);
        const response4 = await axios.get(trending);
        const response5 = await axios.get(comedy);
        const response6 = await axios.get(romance);
        const response7 = await axios.get(documentary);

        setOrginalsData(response1.data.results);
        setActionData(response2.data.results);
        setHorrorData(response3.data.results);
        setTrendingData(response4.data.results);
        setComedyData(response5.data.results);
        setRomanceData(response6.data.results);
        setDocumentaryData(response7.data.results);

        // Combine or manage the data from different responses
        const combinedMovies = [
          ...response1.data.results,
          ...response2.data.results,
          ...response3.data.results,
          ...response4.data.results,
          ...response5.data.results,
          ...response6.data.results,
          ...response7.data.results,

        ];

        setAllMovies(combinedMovies);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    // Call the function to fetch movies
    fetchMovies();


  }, [listedMovies]); // Empty dependency array means run once on mount

  // Render the rest of your components using `allMovies` data

  const handleSearch = (query) => {
    const normalizedQuery = query.toLowerCase();
    setSearchQuery(normalizedQuery);
    console.log(normalizedQuery);

    if (allMovies) {
      const filteredMovies = allMovies.filter((movie) =>
        movie.title ? movie.title.toLowerCase().includes(query.toLowerCase()) : movie.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredMovies);

      

      setSearchRow(true)
    }
  };

  const handleListView = () => { setListView((prevIsOpen) => !prevIsOpen); }

  const handleListedMovies = (movie) => {
    
    setListedMovies([...listedMovies, movie])
  }
  const handleRemoveListedMovies = (movie) => {
    
    const updatedListedMovies = listedMovies.filter((listedMovie) => listedMovie.id !== movie.id)
    
    setListedMovies(updatedListedMovies);
  }



  return (
    <div className="App">
      <NavBar handleListView={handleListView} handleSearch={handleSearch} actionRef={actionRef} horrorRef={horrorRef} orginalsRef={orginalsRef} trendingRef={trendingRef} comedyRef={comedyRef}
        romanceRef={romanceRef} documetaryRef={documetaryRef} />
      <Banner />
      {searchRow &&
        <RowPost ref={orginalsRef}
          data={searchResults}
          handleListedMovies={handleListedMovies}
          handleRemoveListedMovies={handleRemoveListedMovies}
          addList={listedMovies}
          title="Search Results.."
          id="orginals"
        />}
      {listView &&
        <RowPost ref={orginalsRef}
          handleListedMovies={handleListedMovies}
          handleRemoveListedMovies={handleRemoveListedMovies}
          addList={listedMovies}
          data={listedMovies}
          title="My List"
          id="orginals" />}
      <RowPost ref={orginalsRef}
        data={orginalsData}
        handleListedMovies={handleListedMovies}
        handleRemoveListedMovies={handleRemoveListedMovies}
        addList={listedMovies}
        title="Netflix Orginals"
        id="orginals" />
      <RowPost ref={actionRef}
        data={actionData}
        handleListedMovies={handleListedMovies}
        handleRemoveListedMovies={handleRemoveListedMovies}
        addList={listedMovies}
        title="Action"
        isSmall id="action" />
      <RowPost ref={horrorRef}
        data={horrorData}
        handleListedMovies={handleListedMovies}
        handleRemoveListedMovies={handleRemoveListedMovies}
        addList={listedMovies}
        title="Horror"
        isSmall
        id="horror" />
      <RowPost ref={trendingRef}
        data={trendingData}
        handleListedMovies={handleListedMovies}
        handleRemoveListedMovies={handleRemoveListedMovies}
        addList={listedMovies}
        title="Trending"
        id="trending" />
      <RowPost ref={comedyRef}
        data={comedyData}
        handleListedMovies={handleListedMovies}
        handleRemoveListedMovies={handleRemoveListedMovies}
        addList={listedMovies}
        title="Comedy"
        isSmall
        id="comedy" />
      <RowPost ref={romanceRef}
        data={romanceData}
        handleListedMovies={handleListedMovies}
        handleRemoveListedMovies={handleRemoveListedMovies}
        addList={listedMovies}
        title="Romance"
        isSmall
        id="romance" />
      <RowPost ref={documetaryRef}
        data={documentaryData}
        handleListedMovies={handleListedMovies}
        handleRemoveListedMovies={handleRemoveListedMovies}
        addList={listedMovies}
        title="Documentary"
        isSmall id="documentary" />

    </div>
  );
}

export default App;
