import knex from 'knex';
import config from '../../knexfile.js';

const db = knex(config.development);

class DB {
  static async getAllEmails() {
    return db('emails').orderBy('created_at', 'desc');
  }

  static async searchEmails(searchTerm) {
    return db('emails')
      .where('to', 'like', `%${searchTerm}%`)
      .orWhere('cc', 'like', `%${searchTerm}%`)
      .orWhere('bcc', 'like', `%${searchTerm}%`)
      .orWhere('subject', 'like', `%${searchTerm}%`)
      .orWhere('body', 'like', `%${searchTerm}%`)
      .orderBy('created_at', 'desc');
  }

  static async createEmail(emailData) {
    return db('emails').insert(emailData);
  }

  static async getEmailById(id) {
    return db('emails').where('id', id).first();
  }
}

export default DB;
