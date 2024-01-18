import express from 'express'
const AppRouter = express.Router()
import { Authorize } from '../Middleware/auth.js'
import PosterController from '../Controllers/poster.controller.js'
import CartLineController from '../Controllers/cartline.controller.js'
import GenreController from '../Controllers/genre.controller.js'

// Poster Routes
const posterControl = new PosterController
AppRouter.get('/posters', (req, res) => { posterControl.list(req, res) })
AppRouter.get('/posters/list_by_genre/:genre', (req, res) => { posterControl.list(req, res) })
AppRouter.get('/posters/:slug', (req, res) => { posterControl.details(req, res) })

// Genre Routes
const genreControl = new GenreController
AppRouter.get('/genre', (req, res) => { genreControl.list(req, res) })

// CartLine Routes
const cartControl = new CartLineController
AppRouter.get('/cart', Authorize, (req, res) => { cartControl.list(req, res) })
AppRouter.get('/cart/:id([0-9]*)', (req, res) => { cartControl.details(req, res) })
AppRouter.post('/cart', Authorize, (req, res) => { cartControl.create(req, res) })
AppRouter.put('/cart', Authorize, (req, res) => { cartControl.update(req, res) })
AppRouter.delete('/cart/:id([0-9]*)', Authorize, (req, res) => { cartControl.remove(req, res) })



export default AppRouter