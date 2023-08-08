import * as fs from 'fs';
import * as path from 'path';

export type Gender = "MEN" | "WOMEN" | "OTHER"

export type Orientation = "HETERO" | "HOMO" | "BY" | "OTHER"

export type Country = | "Argentina" | "Brasil" | "Chile" | "Colombia" | "México" | "Perú" | "Uruguay" | "Venezuela"

export class User {

    constructor(
        public name: string,
        public lastname: string,
        public image: string,
        public gender: Gender,
        public phone: string,
        public email: string,
        public sub: string,
        public orientation: Orientation,
        public birthday: Date) { }

    private static getPath(dir: string) {
        let fullPath: string;
        // Puedes ajustar esta condición según tus necesidades.
        if (process.env.NODE_ENV === 'development') {
            fullPath = path.join(__dirname, '..', dir); // Ajusta esto según la estructura de tu proyecto en desarrollo
        } else {
            fullPath = path.join(__dirname, '..', '..', dir); // Ajusta esto según la estructura de tu proyecto en producción
        }
        return fullPath
    }

    private static listImagesInDirectory(dir: string): string[] {

        const files = fs.readdirSync(User.getPath(dir), { withFileTypes: true });
        const images: string[] = [];
        for (const file of files) {
            if (file.isFile() && file.name.endsWith('.jpg')) {
                images.push(file.name);
            }
        }
        return images;
    }

    private static getImageMen(): string {
        const list = User.listImagesInDirectory('../electron/static/men');
        const randImage = list[Math.floor(Math.random() * list.length)];
        const img = User.imageToBase64(User.getPath('../electron/static/men/') + randImage);
        return "data:image/png;base64," + img;
    }

    private static getImageWomen(): string {
        const list = User.listImagesInDirectory('../static/women');
        const randImage = list[Math.floor(Math.random() * list.length)];
        const img = User.imageToBase64(User.getPath('../electron/static/men/') + randImage);
        return "data:image/png;base64," + img;
    }


    private static imageToBase64(imagePath: string): string {
        const imageBytes = fs.readFileSync(imagePath);
        return Buffer.from(imageBytes).toString('base64');
    }


    private static getLastname() {
        const list = [
            "González", "Rodríguez", "Pérez", "Sánchez", "López",
            "Ramírez", "Torres", "García", "Martínez", "Hernández",
            "Morales", "Gómez", "Castro", "Ruiz", "Vargas",
            "Reyes", "Guerrero", "Ortiz", "Mendoza", "Rojas",
            "Díaz", "Paredes", "Alvarez", "Cruz", "Ramos",
            "Medina", "Herrera", "Chávez", "Castillo", "Moreno",
            "Jiménez", "Bautista", "Rivera", "Campos", "Cordero",
            "Navarro", "Molina", "Delgado", "León", "Vega",
            "Rivas", "Cabrera", "Acosta", "Lara", "Mejía",
            "Aguilar", "Marroquín", "Salazar", "Peña", "Ayala",
            "Villanueva", "Santos", "Aguirre", "Valdez", "Zamora",
            "Cardenas", "Valencia", "Arroyo", "Romero", "Solís",
            "Carrillo", "Padilla", "Ponce", "Palacios", "Guerra",
            "Lozano", "Contreras", "Maldonado", "Ortega", "Corona",
            "Escobar", "Benítez", "Rosales", "Valle", "Ríos",
            "Gutiérrez", "Franco", "Galindo", "Montes", "Osorio",
        ];

        return list[Math.floor(Math.random() * list.length)] + " " + list[Math.floor(Math.random() * list.length)];
    }

    private static getNameMen() {
        const list = [
            "Juan", "José", "Carlos", "Manuel", "Miguel",
            "Pedro", "Alejandro", "Francisco", "Diego", "Raúl",
            "David", "Rafael", "Ricardo", "Fernando", "Roberto",
            "Daniel", "Jorge", "Eduardo", "Sergio", "Andrés",
            "Gabriel", "Antonio", "Luis", "Javier", "Víctor",
            "Mario", "Omar", "Enrique", "Gustavo", "Martín",
            "Héctor", "Oscar", "Alberto", "Gerardo", "Rodrigo",
            "Ángel", "Samuel", "Guillermo", "César", "Cristian",
        ];

        return list[Math.floor(Math.random() * list.length)] + " " + list[Math.floor(Math.random() * list.length)];
    }

    private static getNameWomen() {
        const list = [
            "María", "Ana", "Carmen", "Laura", "Patricia",
            "Andrea", "Sofía", "Daniela", "Gabriela", "Valentina",
            "Fernanda", "Lucía", "Teresa", "Karla", "Alejandra",
            "Mariana", "Claudia", "Jessica", "Brenda", "Beatriz",
            "Isabel", "Regina", "Carolina", "Paola", "Camila",
            "Sara", "Rosa", "Estefanía", "Susana", "Lourdes",
            "Vanessa", "Leticia", "Maribel", "Mónica", "Ivonne",
            "Yolanda", "Silvia", "Raquel", "Natalia", "Alicia",
        ];

        return list[Math.floor(Math.random() * list.length)] + " " + list[Math.floor(Math.random() * list.length)];
    }

    private static generatePhoneNumber(country: Country) {
        switch (country) {
            case "Argentina":
                return "+54 9" + Math.floor(Math.random() * 1000000000);
            case "Brasil":
                return "+55 " + Math.floor(Math.random() * 10000000000);
            case "Chile":
                return "+56 9" + Math.floor(Math.random() * 1000000000);
            case "Colombia":
                return "+57 3" + Math.floor(Math.random() * 1000000000);
            case "México":
                return "+52 1" + Math.floor(Math.random() * 10000000000);
            case "Perú":
                return "+51 9" + Math.floor(Math.random() * 1000000000);
            case "Uruguay":
                return "+598 9" + Math.floor(Math.random() * 100000000);
            case "Venezuela":
                return "+58 2" + Math.floor(Math.random() * 1000000000);
            default:
                return "País no válido";
        }
    }



    private static convertToEmail(name: string): string {
        const parts = name.split(' ');
        const firstName = parts[0].toLowerCase();
        const lastName = parts[2] ? parts[2].toLowerCase() : '';
        const randomNumbers = Math.floor(Math.random() * 1000);

        const email = `${firstName}.${lastName}${String(randomNumbers).padStart(3, '0')}@gmail.com`;
        return email;
    }

    private static getSub(): string {
        const getRandomNumber = (length: number) => {
            let result = "";
            for (let i = 0; i < length; i++) {
                result += Math.floor(Math.random() * 10).toString();
            }
            return result;
        };

        const part1 = getRandomNumber(12);
        const part2 = getRandomNumber(12);

        return part1 + part2;
    }

    private static generateRandomDate(): Date {
        // Calcular el rango de años aleatorio
        const yearsAgo = Math.floor(Math.random() * 45) + 16; // Edad entre 16 y 60 años

        // Calcular la fecha actual
        const currentTime = new Date();

        // Restar la cantidad aleatoria de años a la fecha actual
        const randomDate = new Date(currentTime.setFullYear(currentTime.getFullYear() - yearsAgo));

        // Ajustar al primer día del mes y mes actual para mantener solo la parte del año
        randomDate.setMonth(currentTime.getMonth(), currentTime.getDate());
        randomDate.setHours(0, 0, 0, 0);

        return randomDate;
    }



    static createUser(gender: Gender, country: Country, orientation: Orientation): User {
        let imageUser = '';
        let nameUser = '';
        const lastName = User.getLastname();
        const phone = User.generatePhoneNumber(country);
        if (gender === 'MEN') {
            nameUser = User.getNameMen();
            imageUser = User.getImageMen();
        } else {
            nameUser = User.getNameWomen();
            imageUser = User.getImageWomen();
        }

        const email = this.convertToEmail(nameUser + ' ' + lastName);
        const sub = User.getSub();
        const birthday = User.generateRandomDate();

        return new User(
            nameUser,
            lastName,
            imageUser,
            gender,
            phone,
            email,
            sub,
            orientation,
            birthday
        );


    }

}