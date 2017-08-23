import React, { Component } from 'react';
import {Link, HashRouter, Route, Switch} from 'react-router-dom';
import axios from 'axios'
import Songs from '../components/Songs';
import AllAlbums from './AllAlbums'



export default class SingleArtist extends Component {
  constructor(){
    super()
    this.state = {
      artist: {},
      artistAlbums:[],
      artistSongs:[]
    }
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId
    
    
    const getArtistId = axios.get(`/api/artists/${artistId}`)
                        .then(res => res.data)
    const getArtistAlbums = axios.get(`/api/artists/${artistId}/albums`)
                           .then(res => res.data)
    const getArtistSongs = axios.get(`/api/artists/${artistId}/songs`)
                           .then(res => res.data)

    Promise.all([getArtistId, getArtistAlbums, getArtistSongs])
        .then(arr => {
           // this.setState({artist: arr[0], artistAlbums: arr[1], artistSongs: arr[2]})
            this.setState({artist: arr[0]})
            this.setState({artistAlbums: arr[1]})
            this.setState({artistSongs: arr[2]})
        })
  }

  render () {
  const artist = this.state.artist; 

    return (
     
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
        <Switch>
        <Route
          exact
          path='/artists/:artistId/albums'
          render = {
            ()=> <AllAlbums albums = {this.state.artistAlbums}/>
          }
        />

        <Route
          exact
          path='/artists/:artistId/songs'
          render = {
            ()=> <Songs songs= {this.state.artistSongs}/>
          }
        />
        </Switch> 

      </div>
      
    );
} 

  // render(){
  //     return(
  //    <div>
  //       <h3>{this.state.artist.name}</h3>
  //       <h4>
  //         <AllAlbums albums={this.state.artistAlbums}/>
  //       </h4>
  //       <Songs songs={this.state.artistSongs}/>
  //     </div>
  //     )
  // }
}