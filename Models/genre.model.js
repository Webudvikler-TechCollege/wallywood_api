import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'

class Genre extends Model {}

Genre.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	slug: {
		type: DataTypes.STRING,
		allowNull: false
	}		
},{
	sequelize,
	modelName: 'genre',
	underscored: true
})

export default Genre