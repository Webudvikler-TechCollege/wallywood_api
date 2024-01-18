import sequelize from '../Config/sequelize.config.js'
import { DataTypes, Model } from 'sequelize'
import Genre from './genre.model.js'
import Poster from './poster.model.js'

class PosterGenreRel extends Model {}

PosterGenreRel.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	poster_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Poster,
			key: 'id'
		}
	},
	genre_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Genre,
			key: 'id'
		}
	}		
},{
	sequelize,
	modelName: 'poster_genre_rel',
	timestamps: false,
	freezeTableName: true,
	underscored: true
})

export default PosterGenreRel