import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import Axios from 'axios'
// import Navbar from "../Navbar";

//useState renders every time the Profile component is ran.

export const Profile = () => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [showList, setshowList] = useState(null)
  const [friendsList, setfriendList] = useState(null)

  useEffect(() => {
    if (localStorage.usertoken === null) {
      history.push('./login')
    } else {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      console.log(decoded)
      setUsername(decoded.name)
      getListOfMovs()
      getFriends()
    }
  }, [])
  const getFriends = () => {
    Axios({
      method: 'GET',
      url: '/users/getfriends'
    }).then(res => {
      setfriendList(res.data) //the data in the response is the message from the back end.
    })
  }
  //use state running twice.
  const getListOfMovs = () => {
    console.log('calling getMOvies')
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded)
    Axios({
      method: 'POST',
      data: { email: decoded.email },
      url: '/users/getmovies'
    }).then(res => {
      setshowList(res.data.showList)
      console.log(res.data.showList)
    })
  }
  const logoutUser = e => {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    history.push('./login')
  }
  return (
    <>
      <div className='container'>
        <button className='button logoutBtn' type='submit' onClick={logoutUser}>
          Logout
        </button>
        <h1
          className='profile-username'
          style={({ color: 'white' }, { textTransform: 'capitalize' })}
        >
          Hello {username}
        </h1>

        <div className='friend-list'>
          <h1 className="friend-title">Friends</h1>
          {friendsList ? (
            friendsList.map(friend => (
                <>
                <Link to={'/friend/' + friend.id}>
                <button className='button friends-button'style={({ color: 'white' }, { textTransform: 'capitalize' })}>{friend.name}</button>
                </Link>
              </>
            ))
          ) : (
            <li>No friends here</li>
          )}
        </div>
        <div className='movie-details'>
          <h1 className='usershows'>Your Favorite Movies/Shows</h1>
          <Link to='/AddMovies'>
            <button className='button addmovie-button'>Add More</button>
          </Link>
            <div>
        {showList ? (
            showList.map(movie => (
                <img className='watchlist-img' src={movie.Poster} />
                ))
                ) : (
                    <li>No movies here</li>
                    )}
                    </div>
                    </div>
      </div>
    </>
  )
}

export default Profile
    
