import '../styles/list.css';
import {useDispatch, useSelector} from "react-redux";
import {RemoveFromList} from "../action";
import {Link} from "react-router-dom";

function List() {
    const influencerList = useSelector(state=>state.ListReducer); //getting list data from redux store
    const dispatch = useDispatch();
    
    function abbreviateNumber(n){ //convertion total followers to thousand, million and Billion
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      }
    return (
        <section className='list_section'>
            { influencerList.length?
            <table>
                <tbody>
                <tr>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Followers</th>
                    <th>Eng. Rate</th>
                    <th>C:L Ratio</th>
                    <th>Approx. Price</th>
                    <th>Full Profile</th>
                </tr>
                {
                    influencerList.map((user)=>{
                        return(
                            <tr key={user.id}>
                                <td><img className='tbl_avtar' src={user.profile_image_url} alt=''/></td>
                                <td>{user.name}</td>
                                <td>{abbreviateNumber(user.followers_count)}</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td><Link to={`/profile/${user.screen_name}`}>View</Link></td>
                                <td><button onClick={()=>dispatch(RemoveFromList(user.id))}>Remove</button></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>:
                    <p className='no_result'>No list found</p>
            }
        </section>
    )
}

export default List
