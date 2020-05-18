//Database Access Object
//re-usable module to connect DB_test database
const { Client } = require('pg')

let client = {}

function connect () {
    client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'DB_music',
        user: 'postgres',
        password: 'postgres'
        })

    client.connect((error) => {
        if (error) {
            throw error
        }
        else{
            console.log("Connected to Database")
        }
    })
}

function query (query_str, values, resultCallback) {
    client.query(query_str, values, (error, result) => {
        if (error) {
            throw error
        }
        resultCallback(result)
    })
}

function disconnect () {
    client.end()
}

module.exports = {
    connect: connect,
    disconnect: disconnect,
    query: query
}