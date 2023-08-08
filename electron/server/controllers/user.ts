import { ipcMain } from 'electron';
import sqlite3 from 'sqlite3';
import * as fs from 'fs';
import * as path from 'path';
import { Gender, Country, Orientation, User } from '../model'; // Asegúrate de importar estos tipos correctamente


export default function (db: sqlite3.Database) {
    ipcMain.on('user-query', (event, query) => {
        db.all(query, [], (err, rows) => {
            if (err) throw err;
            event.reply('users', rows);
        });
    });

    ipcMain.on('insert-user', (event, user) => {

        const newUser = User.createUser('MEN', 'Argentina', 'HETERO');
        console.log(newUser)
        // db.run('INSERT INTO users (name) VALUES (?)', [user.name], function (err) {
        //     if (err) {
        //         return console.log(err.message);
        //     }
        //     console.log(`Se ha insertado el plan con ID: ${this.lastID}`);
        // });
    });
}

