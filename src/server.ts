import express, { NextFunction, Request, Response } from 'express'
import { createServer } from 'http'

import config from './config/config'
import ServerError from './models/serverError'
import routes from './routes'

//Seria interessante alterar isso para uma classe Server


// Creating and configuring the server
const server = express()
server.use(routes)
server.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  if (err instanceof ServerError) {
    return response.status(err.statusCode).json(err)
  }

  return response.status(500).json({ error: err.message })
})

const httpServer = createServer(server)

// Start listen in the configured Port
httpServer.listen(config.SERVER_PORT, () => {
  console.log(`Server running in port ${config.SERVER_PORT}`)
})
