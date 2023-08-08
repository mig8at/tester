package functions

import (
	"encoding/base64"
	"fmt"
	"io"
	"math/big"
	"math/rand"
	"os"
	"strings"
	"time"

	"github.com/mig8at/tester/model"
)

func getImageMen() string {
	list, _ := listImagesInDirectory("./functions/men")
	rand.Seed(time.Now().UnixNano())
	randImage := list[rand.Intn(len(list))]
	img, _ := imageToBase64("./functions/men/" + randImage)
	return "data:image/png;base64," + img
}

func getImageWomen() string {
	list, _ := listImagesInDirectory("./functions/women")
	rand.Seed(time.Now().UnixNano())
	randImage := list[rand.Intn(len(list))]
	img, _ := imageToBase64("./functions/men/" + randImage)
	return "data:image/png;base64," + img
}

func getLastname() string {
	list := []string{
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
	}

	rand.Seed(time.Now().UnixNano())
	return list[rand.Intn(len(list))] + " " + list[rand.Intn(len(list))]
}

func getNameMen() string {
	list := []string{
		"Juan", "José", "Carlos", "Manuel", "Miguel",
		"Pedro", "Alejandro", "Francisco", "Diego", "Raúl",
		"David", "Rafael", "Ricardo", "Fernando", "Roberto",
		"Daniel", "Jorge", "Eduardo", "Sergio", "Andrés",
		"Gabriel", "Antonio", "Luis", "Javier", "Víctor",
		"Mario", "Omar", "Enrique", "Gustavo", "Martín",
		"Héctor", "Oscar", "Alberto", "Gerardo", "Rodrigo",
		"Ángel", "Samuel", "Guillermo", "César", "Cristian",
	}

	rand.Seed(time.Now().UnixNano())
	return list[rand.Intn(len(list))] + " " + list[rand.Intn(len(list))]
}

func getNameWomen() string {
	list := []string{
		"María", "Ana", "Carmen", "Laura", "Patricia",
		"Andrea", "Sofía", "Daniela", "Gabriela", "Valentina",
		"Fernanda", "Lucía", "Teresa", "Karla", "Alejandra",
		"Mariana", "Claudia", "Jessica", "Brenda", "Beatriz",
		"Isabel", "Regina", "Carolina", "Paola", "Camila",
		"Sara", "Rosa", "Estefanía", "Susana", "Lourdes",
		"Vanessa", "Leticia", "Maribel", "Mónica", "Ivonne",
		"Yolanda", "Silvia", "Raquel", "Natalia", "Alicia",
	}

	rand.Seed(time.Now().UnixNano())
	return list[rand.Intn(len(list))] + " " + list[rand.Intn(len(list))]
}

func listImagesInDirectory(dir string) ([]string, error) {
	files, err := os.ReadDir(dir)
	if err != nil {
		return nil, err
	}

	var images []string
	for _, file := range files {
		if !file.IsDir() {
			if strings.HasSuffix(file.Name(), ".jpg") {
				images = append(images, file.Name())
			}
		}
	}
	return images, nil
}

func CreateUser(gender model.Gender, country model.Country, orientation model.Orientation) model.User {
	var imageUser string
	var nameUser string
	lastName := getLastname()
	phone := generatePhoneNumber(country)
	if gender == model.MEN {
		nameUser = getNameMen()
		imageUser = getImageMen()
	} else {
		nameUser = getNameWomen()
		imageUser = getImageWomen()
	}

	email := convertToEmail(nameUser + " " + lastName)
	sub := getSub()
	birthday := generateRandomDate()

	return model.User{
		Name:        nameUser,
		Lastname:    lastName,
		Image:       imageUser,
		Gender:      gender,
		Phone:       phone,
		Email:       email,
		Sub:         sub,
		Orientation: orientation,
		Birthday:    birthday,
	}
}

func imageToBase64(imagePath string) (string, error) {
	// Leer el archivo de imagen
	imageFile, err := os.Open(imagePath)
	if err != nil {
		return "", err
	}
	defer imageFile.Close()

	// Leer los bytes del archivo de imagen
	imageBytes, err := io.ReadAll(imageFile)
	if err != nil {
		return "", err
	}

	// Codificar a Base64
	base64Encoding := base64.StdEncoding.EncodeToString(imageBytes)

	return base64Encoding, nil
}

func generatePhoneNumber(country model.Country) string {
	rand.Seed(time.Now().UnixNano())

	switch country {
	case model.Argentina:
		return fmt.Sprintf("+54 9 %d", rand.Intn(1000000000))
	case model.Brasil:
		return fmt.Sprintf("+55 %d", rand.Intn(10000000000))
	case model.Chile:
		return fmt.Sprintf("+56 9 %d", rand.Intn(1000000000))
	case model.Colombia:
		return fmt.Sprintf("+57 3 %d", rand.Intn(1000000000))
	case model.México:
		return fmt.Sprintf("+52 1 %d", rand.Intn(10000000000))
	case model.Perú:
		return fmt.Sprintf("+51 9 %d", rand.Intn(1000000000))
	case model.Uruguay:
		return fmt.Sprintf("+598 9 %d", rand.Intn(100000000))
	case model.Venezuela:
		return fmt.Sprintf("+58 2 %d", rand.Intn(1000000000)) // Suponiendo un formato para Venezuela
	default:
		return "País no válido"
	}
}

func convertToEmail(name string) string {
	rand.Seed(time.Now().UnixNano())
	// Dividir el nombre en partes usando espacios
	parts := strings.Fields(name)

	// Usar la primera parte como el nombre y la tercera parte como el apellido (si existen)
	var firstName, lastName string
	if len(parts) > 0 {
		firstName = strings.ToLower(parts[0])
	}
	if len(parts) > 2 {
		lastName = strings.ToLower(parts[2])
	}

	// Generar 3 números aleatorios
	randomNumbers := rand.Intn(1000)

	// Combinar las partes para crear el correo electrónico
	email := fmt.Sprintf("%s.%s%03d_test@gmail.com", firstName, lastName, randomNumbers)

	return email
}

func getSub() string {
	rand.Seed(time.Now().UnixNano())

	// Definir el límite inferior (10^20) y superior (10^21 - 1) para un número de 21 dígitos
	lowerLimit := new(big.Int)
	upperLimit := new(big.Int)
	lowerLimit.Exp(big.NewInt(10), big.NewInt(20), nil)
	upperLimit.Exp(big.NewInt(10), big.NewInt(21), nil)
	upperLimit.Sub(upperLimit, big.NewInt(1))

	// Generar un número aleatorio en el rango
	randomNumber := big.NewInt(0).Rand(rand.New(rand.NewSource(time.Now().UnixNano())), new(big.Int).Sub(upperLimit, lowerLimit))
	randomNumber.Add(randomNumber, lowerLimit)

	return randomNumber.String()
}

func generateRandomDate() time.Time {
	// Sembrar el generador de números aleatorios
	rand.Seed(time.Now().UnixNano())

	// Calcular el rango de años aleatorio
	yearsAgo := rand.Intn(45) + 16 // Edad entre 16 y 60 años

	// Calcular la fecha actual
	currentTime := time.Now()

	// Restar la cantidad aleatoria de años a la fecha actual
	randomDate := currentTime.AddDate(-yearsAgo, 0, 0)

	// Ajustar al primer día del mes y mes actual para mantener solo la parte del año
	randomDate = time.Date(randomDate.Year(), currentTime.Month(), currentTime.Day(), 0, 0, 0, 0, currentTime.Location())

	return randomDate
}
