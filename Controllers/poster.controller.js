import Poster from '../Models/poster.model.js'
import Genre from '../Models/genre.model.js'
import { QueryParamsHandle } from '../Middleware/helpers.js'

// Sætter modellers relationelle forhold - mange til mange
Genre.belongsToMany(Poster, {
	through: 'poster_genre_rel',
	as: 'posters',
	foreignKey: 'genre_id',
	timestamps: false
})
Poster.belongsToMany(Genre, {
	through: 'poster_genre_rel',
	as: 'genres',
	foreignKey: 'poster_id',
	timestamps: false
})

/**
 * Controller for Org Actions
 */
class PosterController {

	/**
	 * Method List
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	list = async (req, res) => {
		const { genre } = req.params

		// Indhenter parametre fra request objekt
		const qp = QueryParamsHandle(req, 'id, name, image, slug, price')

		// Eksekverer sequelize metode med management values
		const result = await Poster.findAll({
			attributes: qp.attributes,
			order: [qp.sort_key],
			limit: qp.limit,
			include: {
				model: Genre,
				as: 'genres',
				attributes: ['id', 'title'],
				where: (genre) ? { slug: genre } : null
			}
		})
		// Udskriver resultat i json format
		res.json(result)
	}

	/**
	 * Method Details
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	details = async (req, res) => {
		// Destructure assignment af id. 
		const { slug } = req.params || 0
		// Eksekverer sequelize metode med attributter og where clause
		const result = await Poster.findOne({
			attributes: ['id', 'name', 'slug', 'description', 'image', 'width', 
						'height', 'price', 'stock', 'createdAt', 'updatedAt'],
			where: { slug: slug },
			include: {
				model: Genre,
				as: 'genres',
				attributes: ['id', 'title']
			}
		})
		// Udskriver resultat i json format
		res.json(result)
	}

	/**
	 * Method Details
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	create = async (req, res) => {
		// Destructure assignment af form data fra request body
		const { name, description, image, dimensions, categories, price, stock, related_ids } = req.body;
		// Tjekker felt data
		if(name && description && dimensions && price) {
			// Opretter record
			const model = await Poster.create(req.body)
			// Sender nyt id som json object
			res.json({ newId: model.id })
		} else {
			res.sendStatus(418)
		}
	}

	update = async (req, res) => {
		// Destructure assignment af id. 
		const { id } = req.params || 0
		// Destructure assignment af form data fra request body
		const { name, description, image, dimensions, categories, price, stock, related_ids } = req.body;
		// Tjekker felt data
		if(name && description && dimensions && price) {
			// Opretter record
			const model = await Poster.update(req.body, {
				where: { id: id },
				individualHooks: true
			})
			// Sender nyt id som json object
			res.json({ 
				msg: 'Record update' 
			})
		} else {
			res.sendStatus(418)
		}	
	}

	tool = async (req, res) => {
		const [ genres ] = await sequelize.query('SELECT id, title, slug FROM genre')
		const [ result ] = await sequelize.query('SELECT * FROM mytable ORDER BY id')
		result.map((item, key) => {
			const categories = JSON.parse(item.categories);

			categories.map(cat => {
				const genre = genres.find(x => x.slug === cat.slug)
				if(genre) {
					console.log(genre.id, item.id);
					sequelize.query(`INSERT INTO poster_genre_rel(genre_id, poster_id) 
										VALUES(${genre.id}, ${item.id})`)
				}
			})

			const insert = {
				id: item.id,
				name: item.name,
				slug: item.slug,
				description: item.short_description,
				image: item.images.substring(item.images.indexOf("src")+6, item.images.indexOf("name")-3),
				price: item.price,
				width: item['dimensions.width'],
				height: item['dimensions.height'],
				stock: item.stock_quantity,
			}
			//console.log(insert);
			//const model = PosterModel.create(insert)
		})

		res.sendStatus(200)
	}
}

export default PosterController