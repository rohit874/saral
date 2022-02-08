import './App.css';
import List from './components/List';
import Profile from './components/Profile';
import Header from './components/Header';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  // useEffect(()=>{
  //   const config = {
  //     headers:{
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAGiXYwEAAAAALCWbFRFnBSoX%2FHvICcujcSFVTCM%3DjXDg1eomv6T405FUMG2eRATacKiwvdKfNYd2TCEzOceqzfLnPj'
  //   }};

    // axios.get('http://localhost:5000/search/warikoo',config).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // axios.get('http://localhost:5000/warikoo',config).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // axios.get('http://localhost:5000/users/warikoo,rohitmukriyan',config).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // axios.get('http://localhost:5000/timeline/narendramodi',config).then(function (response) {
    //   console.log(response.data);
    // }).catch(function (error) {
    //   console.error(error);
    // });
    
  // },[])
  
  return (
    <BrowserRouter>
    <div className="App">
    <Header />
      <Routes>
          <Route path="/" element={<List />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
