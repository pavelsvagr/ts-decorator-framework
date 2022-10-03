/* eslint-disable @typescript-eslint/no-misused-promises */
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { container } from './framework/container'
import respond from './framework/respond'

const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.get('/users/:id',
  (req, res) =>
    respond(res, () => container.userService.getUser(req.params.id))
)
app.get('/users',
  (req, res) =>
    respond(res, () => container.userService.getUsers())
)
app.patch('/users/:id',
  (req, res) =>
    respond(res, () => container.userService.updateUser(req.params.id, req.body))
)

app.listen(3030)
