import React,{useState} from 'react'
import "./NavBar.css"
import { Bell,Search } from 'react-bootstrap-icons'
import { Link, animateScroll as scroll } from 'react-scroll';




function NavBar(props) {

  const scrollToDiv = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const [searchVisible, setSearchVisible] = useState(false);

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className='navbar'>
    <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="NETFLIX" />
    <img className='avatar' src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="Avatar" />

    <div className='navbar_links'>
        <p className='links' onClick={() => scroll.scrollToTop()}>Home</p>
        <p  className='links' onClick={() => scrollToDiv(props.orginalsRef)}>Orginals</p>
        <p  className='links' onClick={() => scrollToDiv(props.actionRef)}>Action</p>
        <p  className='links' onClick={() => scrollToDiv(props.horrorRef)}>Horror</p>
        <p  className='links' onClick={() => scrollToDiv(props.trendingRef)}>Trending</p>
        <p  className='links' onClick={() => scrollToDiv(props.comedyRef)} >Comedy</p>
        <p  className='links' onClick={() => scrollToDiv(props.romanceRef)}>Romance</p>
        <p  className='links' onClick={() => scrollToDiv(props.documetaryRef)}>Documentary</p>

    </div>
    <div className='avatar_links'>
    <Search className='links' size={20} color="white" onClick={toggleSearch} />
        {searchVisible && (
          <>
            <input
            className='input'
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className='button' onClick={() => {props.handleSearch(searchQuery);scroll.scrollToTop()}}>Search</button>
          </>
        )}
    <p className='links'>Kid's</p>
    <p className='links' onClick={()=>{props.handleListView();}}>My List</p>
    <Bell className='links' size={24} color="white" />
    
    </div>
    </div>
  )
}

export default NavBar
