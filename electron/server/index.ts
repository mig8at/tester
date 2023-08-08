import sqlite3 from 'sqlite3';
import user from './controllers/user';

export default function initServer() {
    const db = new sqlite3.Database('./tegoma.db');
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    });


    user(db)



}