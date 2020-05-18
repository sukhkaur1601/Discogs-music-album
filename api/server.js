'use strict'

const express = require('express')
const app = express()
app.use(express.static('public_html'))
const DB=require('./dao')

var cors=require('cors')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
// REST API ----------------------------------------------------------------------------

//-------------------TO GET ALL TRACKS IN A PLAYLIST------------------------------------
app.get('/tracks', function (request, response) {
DB.connect()
let id_from_url=request.params.id;
DB.query("select track.id as track_id, track.playlist_id, track.title as track_title, track.uri, track.master_id, playlist.id, playlist.title as playlist_title  from track, playlist where track.playlist_id=playlist.id order by track.id asc",[],function (result){
    console.log('Number of rows in table:'+result.rowCount)
    let reply={}//initialize empty object
    if(result.rowCount!=0){
        reply.message = "Ok found "+result.rowCount+" tracks"
        reply.db_data=result.rows
        response.status(200).send(reply)
    }
    else{
            reply.message="No Data Found..."
            reply.db_data={}
            response.status(404).send(reply)
    }
    DB.disconnect()
})
})

//-----------------------DELETE BY ID---------------------------------------------------
app.delete("/tracks/:id", function(request,response){
    let id_from_url=request.params.id
    if(id_from_url=="")
    {
       let reply={}
       reply.message="Error! id not set"
       reply,db_data={}
       response.status(400).send(reply)
    }else{
        DB.connect()
        DB.query("select * from track where id=$1",[id_from_url],(result)=>{
          let reply={}
          if(result.rowCount!=0){
                DB.query('delete from track where id=$1',[id_from_url],(result)=>{
                reply.message = "Ok 1 row deleted "
              reply.db_data={}
              response.status(200).send(reply)
              DB.disconnect()
               }

               )
           }
           else{
                  reply.message="Track not found"
                  reply.db_data={}
                  response.status(404).send(reply)
          }

        })
    }
})
//-----------------------Post Request---------------------------------------------------
app.post("/tracks/",function(request,response){
  let playlist_id=request.body.playlist_id
    let title=request.body.title
    let uri=request.body.uri
    let master_id=request.body.master_id
        DB.connect()
      DB.query("insert into track(playlist_id,title,uri,master_id) values($1,$2,$3,$4)",[playlist_id,title,uri,master_id],(result)=>{
          let reply={}
          reply.message = "Object Inserted"
         reply.db_data={}
        response.status(200).send(reply)
        DB.disconnect()
    })
})

//------------------------------------------------------------------------------------
app.listen(3001, function () {
    console.log('Server listening on port 3001')
})