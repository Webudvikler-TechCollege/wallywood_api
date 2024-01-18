import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

class Poster extends Model {}

export default Poster.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false
	},
	width: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	height: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	sequelize,
	modelName: 'poster',
	underscored: true
})