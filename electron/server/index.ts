import sqlite3 from 'sqlite3';
import user from './controllers/user';

export default function initServer() {
    const db = new sqlite3.Database('./tegoma.db');
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lastname TEXT, image TEXT, gender TEXT, phone TEXT, email TEXT, sub TEXT, orientation TEXT, birthday DATE)');
    });


    user(db)



}