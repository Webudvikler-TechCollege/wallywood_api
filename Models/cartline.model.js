import { DataTypes, Model } from 'sequelize'
import User from '../Models/System/user.model.js'
import sequelize from '../Config/sequelize.config.js'
import Poster from './poster.model.js'

class CartLine extends Model {}

CartLine.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: 'id'
		}
	},
	poster_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Poster,
			key: 'id'
		}
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	sequelize,
	modelName: 'cartline',
	underscored: true
})

export default CartLine