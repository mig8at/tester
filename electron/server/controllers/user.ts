import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';

import { Gender, Country, Orientation, User } from '../model'; // Asegúrate de importar estos tipos correctamente


export default function (db: sqlite3.Database) {
    ipcMain.on('user-query', (event, query) => {
        db.all(query, [], (err, rows) => {
            if (err) throw err;
            event.reply('users', rows);
        });
    });

    ipcMain.on('generate-user', (event, gender: Gender, country: Country, orientation: Orientation) => {

        const user = User.createUser(gender, country, orientation);

        db.run('INSERT INTO users (name, lastname, image, gender, phone, email, sub, orientation, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            user.name,
            user.lastname,
            user.image,
            user.gender,
            user.phone,
            user.email,
            user.sub,
            user.orientation,
            user.birthday], function (err) {
                if (err) {
                    return console.log(err.message);
                }
                console.log(`Se ha insertado el plan con ID: ${this.lastID}`);
            });
    });
}

