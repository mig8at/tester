package main

import (
	"fmt"

	"github.com/mig8at/tester/functions"
	"github.com/mig8at/tester/model"
)

func main() {
	user := functions.CreateUser(model.MEN, model.Colombia, model.HETERO)

	fmt.Println(user)
}
