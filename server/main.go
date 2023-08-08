package main

import (
	"github.com/gin-gonic/gin"
	"github.com/mig8at/tester/apis"
	"github.com/mig8at/tester/functions"
	"github.com/mig8at/tester/model"
)

func main() {
	r := gin.Default()

	r.GET("/new-user", func(c *gin.Context) {
		user := functions.CreateUser(model.MEN, model.Colombia, model.HETERO)
		newUser, _ := apis.CreateUser(user)

		c.JSON(200, newUser)
	})

	r.Run(":8083")
}
