import React, { Component } from 'react';
import Songs from '../components/Songs';
import axios from 'axios'


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
                        //.then(res => res.data)
    const getArtistAlbums = axios.get(`/api/artists/${artistId}/albums`)
                          //  .then(res => res.data)
    const getArtistSongs = axios.get(`/api/artists/${artistId}/songs`)
                         //   .then(res => res.data)

    Promise.all([getArtistId, getArtistAlbums, getArtistSongs])
        .then(arr => {
           // this.setState({artist: arr[0], artistAlbums: arr[1], artistSongs: arr[2]})
            this.setState({artist: arr[0]})
            this.setState({artistAlbums: arr[1]})
            this.setState({artistSongs: arr[2]})
        })

    

  }

  render(){
      return(
     <div>
        <h3>{this.state.artist.name}</h3>
        <h4>{this.state.artistAlbums.map(album => album.name).join(' ')}</h4>
        <h4>{this.state.artistSongs.map(song => song.name).join(' ')}</h4>
      </div>
      )
  }
}