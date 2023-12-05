import 'dotenv/config'
let config= {};

config.server= {
    port: 8081,
}

config.db = {
    cs: process.env.mongodb,
    name: process.env.dbname
}


export default config;