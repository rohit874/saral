import React from 'react';
import '../styles/header.css';
import {useState} from 'react';
import axios from "axios";
import {AddToList} from '../action';
import {useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";

function Header() {
  const[showSearch, setShowSearch] = useState(false); //for hide and show search result div
  const[searchResult, setSearchResult] = useState([]); // search result data will store here
  const location = useLocation(); //for trace the url location changes 
  const dispatch = useDispatch();
  let timer;
  function searchInfluencer(e){
    const config = {
      headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAGiXYwEAAAAALCWbFRFnBSoX%2FHvICcujcSFVTCM%3DjXDg1eomv6T405FUMG2eRATacKiwvdKfNYd2TCEzOceqzfLnPj'
    }};
    //implemented debounce to limit api call
    let data = e.target.value;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      getData(data);
      timer = undefined;
    }, 400);
  function getData(data) { //searching for influencers data on twitter
    axios.get(`https://saral-server.herokuapp.com/search/${data}`,config).then(function (response) {
      setSearchResult(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
  }

function abbreviateNumber(n){ //convertion total followers to thousand, million and Billion
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
}
  return (
      <header>
          <nav>{location.pathname==="/"?<p>List</p>:<><Link to="/">List</Link><span>&#62;</span><p>Profile</p></>}</nav>
          <div className='search'>
          <input onChange={(e)=>searchInfluencer(e)} onFocus={()=>setShowSearch(true)}  placeholder='search for influencers' />
          <div onBlur={(e)=>setTimeout(()=>setShowSearch(false),1000)} className='search_result' style={{display:showSearch?"block":"none"}}>
            {searchResult.length?
            searchResult.map((data)=>{
              return(
                <div key={data.id} className='result_items'>
                  <img src={data.profile_image_url} alt="" />
                  <span>{data.name}</span>
                  <span>@{data.screen_name}</span>
                  <span>{abbreviateNumber(data.followers_count)} followers</span>
                  <span><button onClick={()=>dispatch(AddToList(data))}>Add</button></span>
                </div>
              )
            }):<p className='no_result'>No result found</p>
            }
          </div>
          </div>
      </header>
  )
}

export default Header;
