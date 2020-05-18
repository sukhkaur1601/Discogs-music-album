import React from 'react';
class PlayList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            playlist_data : [],
            playlist_index : 0,
            playlist_count : 0,
            isLoaded : false,
            error : null
          };

    }
//---------------TO SHOW TRACKS OF A PLAYLIST------------------------------------------------
    showTracks=()=>{
        fetch('http://localhost:3001/tracks')
        .then(
            (response)=> {
                if (response.ok)
                {
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            tracks_data:json_response.db_data,
                            tracks_count:json_response.db_data.length,
                             tracks_index:0,
                             isLoaded : true,
                             error : null
                         })
                     })
                }
                else
                {
                    response.json().then(json_response => {
                         this.setState({
                             isLoaded: false,
                             error:json_response,
                             tracks_data: {},
                             tracks_count:0,
                             tracks_index:0,
                         });
                     })
                 }
             },
             (error) => {
                 this.setState({
                     isLoaded: false,
                     error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                     tracks_data: {},
                     tracks_count:0,
                     tracks_index:0,
                 });
             })
}
//--------------TO DELETE A TRACK FROM A PLAYLIST------------------------------------------
delete=(id)=>{
    fetch("http://localhost:3001/tracks/" + id, {
        method: "DELETE"
    });
}
//---------------------TO REFRESH THE PAGE---------------------------------------------
componentDidMount() {
    this.showTracks();
    setInterval(this.showTracks, 1000);
}
//------------RENDER FUNCTION----------------------------------------------------------
     render() {
         if(this.state.error){
             return (<div className="panel">
                 <h1>Playlist</h1>
             <b>{this.state.error.message}</b></div>);
         }
         else if(this.state.isLoaded)
         {

                if(this.state.tracks_count!==0)
             {
                const rows=[];
                for(let i=0;i<this.state.tracks_count;i++)
                {
                    rows.push(

                       <tr key={i}><td><h4>{this.state.tracks_data[i].track_title}</h4><br/>
                       Id: {this.state.tracks_data[i].track_id}<br/>
                       Playlist: {this.state.tracks_data[i].playlist_title}<br/>
                       URI: {this.state.tracks_data[i].uri}<br/>
                       Master ID: {this.state.tracks_data[i].master_id}<br/>
                       <a href={'https://www.discogs.com/'+this.state.tracks_data[i].uri}>More Information</a><br/>
                       </td>
                       <td><button type="button" id={'delete'+i} onClick={()=>this.delete(this.state.tracks_data[i].track_id)}>Delete</button></td>
                       </tr>
                    )
                }
                 return (
                     <div className="panel" id="panel">
                         <h1>Playlist</h1>
                         <br/>
                         <br/>
                         <table>
                            <thead>
                                <tr>
                                <th>Data</th>
                                <th>Delete from Playlist</th>
                                </tr>
                            </thead>
                           <tbody>
                           {rows}
                           </tbody>
                       </table>
                     </div>
                 )
             }
             else
             {
                 return(<div className="panel"><b>No Data found....</b></div>);
             }
            }
         else{
             return (<div className="panel"><b>Waiting for server ...</b></div>)  }
         }
   }


export default PlayList;