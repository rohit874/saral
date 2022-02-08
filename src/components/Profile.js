import {useEffect, useState} from 'react';
import '../styles/profile.css';
import { useParams } from 'react-router';
import axios from "axios";

function Profile() {
    const {username} = useParams(); //getting username from url parameter
    const [user, setUser] = useState({}); //user profile data will store here
    const [calculatedData, setCalculatedData] = useState({}); //user profile calculated data will store here
    useEffect(()=>{
        const config = {
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAGiXYwEAAAAALCWbFRFnBSoX%2FHvICcujcSFVTCM%3DjXDg1eomv6T405FUMG2eRATacKiwvdKfNYd2TCEzOceqzfLnPj'
          }};
          //getting user profile data
          axios.get(`https://saral-server.herokuapp.com/${username}`,config).then(function (response) {
            setUser(response.data);
          }).catch(function (error) {
            console.error(error);
          });
          //getting recent 10 post data to calculate avg. likes, avg.comment ..etc
          axios.get(`https://saral-server.herokuapp.com/timeline/${username}`,config).then(function (response) {
            calculateData(response.data);
            }).catch(function (error) {
                console.error(error);
            });

        function calculateData(data){ //calculation calculate avg. likes, avg.comment ..etc
            let calData = {likes:0,comments:0,totalLikes:0};
            data.forEach((data)=>{
                calData.likes = calData.likes + data.favorite_count;
                calData.comments = calData.comments + data.retweet_count;
            })
            calData.totalLikes = calData.likes;
            calData.likes = (calData.likes/10).toFixed(0);
            calData.comments = (calData.comments/10).toFixed(0);
            setCalculatedData(calData);
        }
    },[username]);

    function abbreviateNumber(n){ //convertion total followers to thousand, million and Billion
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      }

    return (
        <section className="profile_section">
            { Object.keys(user).length>0?
            <>
            <div className="profile_analytics">
                <div className="analytics_data">
                    <p>Followers</p>
                    <span>{abbreviateNumber(user.followers_count)}</span>
                </div>
                <div className="analytics_data">
                    <p>Avg. Like</p>
                    <span>{calculatedData.likes}</span>
                </div>
                <div className="analytics_data">
                    <p>Avg. Comment</p>
                    <span>{calculatedData.comments}</span>
                </div>
                <div className="analytics_data">
                    <p>Total Uploads</p>
                    <span>{user.statuses_count}</span>
                </div>
                <div className="analytics_data">
                    <p>Total Likes</p>
                    <span>{calculatedData.totalLikes}</span>
                </div>
                <div className="analytics_data">
                    <p>Engagement Rate</p>
                    <span>N/A</span>
                </div>
                <div className="analytics_data">
                    <p>Authentic Fans</p>
                    <span>N/A</span>
                </div>
                <div className="analytics_data">
                    <p>Total Views</p>
                    <span>N/A</span>
                </div>
                <div className="analytics_data">
                    <p>Fair Price</p>
                    <span>N/A</span>
                </div>
                <div className="analytics_data">
                    <p>C:L Ratio</p>
                    <span>N/A</span>
                </div>
                <div className="analytics_data">
                    <p>Reach in 30 days</p>
                    <span>N/A</span>
                </div>
                <div className="analytics_data">
                    <p>Post in 30 days</p>
                    <span>N/A</span>
                </div>
                <div className="top_hashtag">
                    <h5>Top Hashtag:</h5>
                    <p>N/A</p>
                </div>
            </div>
            <div className="profile_details">
                <div className="profile_header">
                    <img src={user.profile_image_url} alt="" />
                    <div>
                        <p>{user.name}</p>
                        <span>@{user.screen_name}</span>
                    </div>
                </div>
                <div className="profile_bio">
                    <h5>Bio:</h5>
                    <p>{user.description}</p>
                </div>
                <div className="profile_email">
                    <h5>Email: </h5><p>N/A</p>
                </div>
                <div className="profile_email">
                    <h5>Location: </h5> <p>{user.location===""?"N/A":user.location}</p>
                </div>
                <div className="profile_email">
                    <h5>website: </h5> <p>{user.url==null?"N/A":<a href={user.url} target="_blank" rel="noreferrer">{user.url}</a>}</p>
                </div>
            </div>
            <div className="recent_media"></div>
            </>:<p className='no_result'>Loading...</p>
            }
        </section>
    )
}

export default Profile
