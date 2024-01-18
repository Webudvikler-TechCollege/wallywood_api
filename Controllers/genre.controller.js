import { QueryParamsHandle } from '../Middleware/helpers.js'
import Genre from '../Models/genre.model.js'

/**
 * Controller for UserGroup Actions
 */
export default class GenreController {

	/**
	 * Method List
	 * @param {Object} req Express Request Object
	 * @param {Object} res Express Response Object
	 */
	list = async (req, res) => {

		// Indhenter parametre fra request objekt
		const qp = QueryParamsHandle(req, 'id, title, slug')

		try {
			// Eksekverer sequelize metode med management values
			const result = await Genre.findAll({
				attributes: qp.attributes,
				order: [qp.sort_key],
				limit: qp.limit
			})
			// Udskriver resultat i json format
			res.json(result)			
		} catch (error) {
			res.status(418).send({
				message: `Could not get list: ${error}`
			})												
		}
	}
}