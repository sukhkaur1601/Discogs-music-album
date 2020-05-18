import React from 'react';
import './index.css';
//--------------------------------------------------------------------------------------
class SearchForm extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            artist_data : [],
            artist_index : 0,
            artist_count : 0,
            isLoaded : false,
            error : null
        }
    }
//-----------TO ADD TRACK INTO PLAYLIST---------------------------------------------------
    addTrackToPlaylist=(track_title,track_uri,playlist,track_master_id)=>{
        var playlistId;
        if(playlist.toLowerCase()==='pop'||playlist.toLowerCase()==='dance'){
            playlistId=6;
        }
        else if(playlist.toLowerCase()==='rock'){
            playlistId=7;
        }
        else if(playlist.toLowerCase()==='metal'){
            playlistId=5;
        }
        else if(playlist.toLowerCase()==='country'){
            playlistId=4;
        }
        else if(playlist.toLowerCase()==='classique'){
            playlistId=3;
        }
        else if(playlist.toLowerCase()==='acoustique'){
            playlistId=2;
        }
        else{
            playlistId=1;
        }
        fetch('http://localhost:3001/tracks/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playlist_id: parseInt(playlistId),title:track_title,uri:track_uri,master_id:parseInt(track_master_id) }),
          })
          console.log('added '+track_title+' to playlist');
    }
//-------------TO SEARCH AN ARTIST ON DISCOGS--------------------------------------------
    searchArtist=() =>{
        let artist=document.getElementById('search').value;
       fetch('https://api.discogs.com/database/search?artist='+artist+'&country=canada&token=CqwkPsUvyyBKiwfsJPKDGyTKuOPsayysRTRSDFcC')
         .then(
             (response)=> {
                 if (response.ok) {
                     response.json().then(json_response => {
                         console.log(json_response)
                         this.setState({
                             artist_data:json_response.results,
                             artist_count:json_response.results.length,
                             artist_index:0,
                             isLoaded : true,
                             error : null
                         })

                     }
                     )

                 }else{
                     response.json().then(json_response => {
                         this.setState({
                             isLoaded: false,
                             error:json_response,
                             artist_data: {},
                             artist_count:0,
                             artist_index:0,
                         });
                     })
                 }
             },

             (error) => {
                 this.setState({
                     isLoaded: false,
                     error: {message:"AJAX error, URL wrong or unreachable, see console"},
                     artist_data: {},
                     artist_count:0,
                     artist_index:0,
                 });
             }
         )
     }
//----------RENDER FUNCTION---------------------------------------------------------------
     render() {
         if(this.state.error){
             return (<div className="panel">
                 <h1>Search by Artist</h1>
                 <b>{this.state.error.message}</b>
                 </div>
                 );
         }
            else if(this.state.artist_count!==0)
             {
                 const rows=[];
                 for(let i=0;i<this.state.artist_count;i++)
                 {
                     rows.push(
                        <tr key={i}>
                            <td>
                                <h4>{this.state.artist_data[i].title}</h4>
                                <br/>
                                <img src={this.state.artist_data[i].cover_image} style={{width:50+"px"}} alt="cover"></img><br/>
                                Genre: {this.state.artist_data[i].genre[0]}<br/>
                                URI: {this.state.artist_data[i].uri}<br/>
                                <a href={'https://www.discogs.com/'+this.state.artist_data[i].uri}>More Information</a><br/>
                            </td>
                            <td>
                                <button type="button" id={'add'+i} onClick={()=>this.addTrackToPlaylist(this.state.artist_data[i].title,this.state.artist_data[i].uri,this.state.artist_data[i].genre[0],this.state.artist_data[i].master_id)}>Add</button>
                            </td>
                        </tr>
                     );
                 }
                 return (
                     <div className="panel">
                         <h1>Search by Artist</h1>
                         <input type="text" id="search"></input>
                            <button type="button" onClick={()=>this.searchArtist()}>Search</button>
                            <br/>
                            <br/>
                         <table>
                             <thead>
                                 <tr>
                                 <th>Data</th>
                                 <th>Add to Playlist</th>
                                 </tr>
                             </thead>
                            <tbody>
                            {rows}
                            </tbody>
                        </table>
                     </div>
                 )
             }
             else if(this.state.search_count===0)
             {
                 return(<div className="panel">
                     <h1>Search by Artist</h1>
                     <b>No Data Found...</b>
                 <input type="text" id="search"></input>
             <button type="button" onClick={()=>this.searchArtist()}>Search</button></div>)
             }
         else{
             return (<div className="panel">
                 <h1>Search by Artist</h1>
                 <b>Waiting for server ...</b>
                <input type="text" id="search"></input>
            <button type="button" onClick={()=>this.searchArtist()}>Search</button></div>)
         }
     }
   }


export default SearchForm;