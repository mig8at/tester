import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';

export default function (db: sqlite3.Database) {
    ipcMain.on('user-query', (event, query) => {
        db.all(query, [], (err, rows) => {
            if (err) throw err;
            event.reply('users', rows);
        });
    });

    ipcMain.on('insert-user', (event, user) => {
        db.run('INSERT INTO users (name) VALUES (?)', [user.name], function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Se ha insertado el plan con ID: ${this.lastID}`);
        });
    });
}