import { Sequelize } from "sequelize"

/**
 * 
 * @param {Object} req 
 * @param {String} default_attr 
 * @returns 
 */
export const QueryParamsHandle = (req, default_attr) => {
	const attr = (req.query.attributes) ? req.query.attributes.trim() : default_attr.trim()

	// Sætter sorteringsnøgle (sort_key) til id hvis false
	// Hvis random kaldes random sortering via Sequelize
	const query_params = {
		sort_key: [
			!req.query.sort_key ? 'id' : 
				req.query.sort_key === 'random' ? Sequelize.literal('rand()') : req.query.sort_key
		],
		limit: Number(req.query.limit) || 10000000,
		attributes: attr.split(',').map(str => str.trim())
	}
	query_params.sort_key.push(req.query.sort_direction || 'ASC')

	return query_params
}