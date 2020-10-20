import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {createConnection} from 'typeorm'
import {ApolloServer} from 'apollo-server-express'
import dotEnv from 'dotenv'
import typeDefs from './db/schema'
import resolvers from './db/resolvers'
const jwt = require('jsonwebtoken')

//set variables
dotEnv.config()

const app = express()

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


const apolloServer = new ApolloServer ({
    typeDefs,
    resolvers,
    context: ({req})=>{
        const token = req.headers['authorization'] || ''
        if (token) {
            try {
                const user = jwt.verify(token,"SECRET")
                return {
                    user
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    }
})

apolloServer.applyMiddleware({app, path: '/graphql'})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT: ${PORT}`)
    console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`)
})


createConnection().then(async connection =>{
    console.log('Conection bd running')
}).catch(error => console.log(error))



