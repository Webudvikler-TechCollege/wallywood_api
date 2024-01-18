import fs from 'fs'
import csv from 'csv-parser'
import path from 'path';
import sequelize from '../../Config/sequelize.config.js';

import Org from '../../Models/System/org.model.js';
import Group from '../../Models/System/group.model.js';
import User from '../../Models/System/user.model.js';
import UserGroupRel from '../../Models/System/user-group-rel.model.js'

import Poster from '../../Models/poster.model.js';
import Genre from '../../Models/genre.model.js';
import CartLine from '../../Models/cartline.model.js';
import UserPost from '../../Models/userpost.model.js';
import PosterGenreRel from '../../Models/poster-genre-rel.model.js';

/**
 * Controller for Seed Actions
 */
class SeedController {
	constructor() {
		console.log('Seed Controller: Running seeds');
	} 

	seed_from_csv = async () => {

		const transaction = await sequelize.transaction();
	
		try {

			let data;
			let handle;

			// Orgs
			data = await this.get_csv_data('org.csv')
			handle = await Org.bulkCreate(data, { transaction });

			// Groups
			data = await this.get_csv_data('group.csv')
			handle = await Group.bulkCreate(data, { transaction });

			// User
			data = await this.get_csv_data('user.csv')
			handle = await User.bulkCreate(data, { transaction });

			// User Groups Relations
			data = await this.get_csv_data('user-group-rel.csv')
			handle = await UserGroupRel.bulkCreate(data, { transaction });

			//////////////////// 

			// Genres
			data = await this.get_csv_data('genre.csv')
			handle = await Genre.bulkCreate(data, { transaction });

			// Posters
			data = await this.get_csv_data('poster.csv')
			handle = await Poster.bulkCreate(data, { transaction });		

			// CartLines
			data = await this.get_csv_data('cartlines.csv')
			handle = await CartLine.bulkCreate(data, { transaction });

			// UserMessages
			data = await this.get_csv_data('userpost.csv')
			handle = await UserPost.bulkCreate(data, { transaction });

			// Poster Genre Rel
			data = await this.get_csv_data('poster_genre_rel.csv')
			handle = await PosterGenreRel.bulkCreate(data, { transaction });		


			// Confirm transaction
			await transaction.commit();
		
			console.log('Seeding completed');
		} catch (error) {
			// Hvis der opstår en fejl, rul tilbage transaktionen
			await transaction.rollback();
			console.error('Seeding error:', error);
		}		
	}

	get_csv_data = async file => {
		const csvpath = path.resolve(`./Data/${file}`);
		const data = []

		return new Promise((resolve, reject) => {
			fs.createReadStream(csvpath)
			.pipe(csv())
			.on('data', row => {
				data.push(row)
			})
			.on('end', async () => {
				resolve(data);
			})
			.on('error', error => {
				reject(error)
			})
		}) 

	}
}

export default SeedController