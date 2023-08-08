package apis

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/mig8at/tester/model"
)

func CreateUser(data model.User) (*model.User, error) {

	postBody, _ := json.Marshal(data)
	responseBody := bytes.NewBuffer(postBody)

	resp, err := http.Post("http://localhost:8080/v1/users", "application/json", responseBody)

	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return nil, err
	}

	return &data, nil
}
