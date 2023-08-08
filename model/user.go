package model

import "time"

type Gender string
type Orientation string

const (
	MEN       Gender = "MEN"
	WOMEN     Gender = "WOMEN"
	OTHER_GEN Gender = "OTHER"
)

const (
	HETERO    Orientation = "HETERO"
	HOMO      Orientation = "HOMO"
	BY        Orientation = "BY"
	OTHER_ORI Orientation = "OTHER"
)

type Country int

const (
	Argentina Country = iota
	Brasil
	Chile
	Colombia
	México
	Perú
	Uruguay
	Venezuela
)

type User struct {
	Name        string      `json:"name,omitempty"`
	Lastname    string      `json:"lastname,omitempty"`
	Image       string      `json:"image,omitempty"`
	Phone       string      `json:"phone,omitempty"`
	Email       string      `json:"email,omitempty"`
	Sub         string      `json:"sub,omitempty"`
	Gender      Gender      `json:"gender,omitempty"`
	Orientation Orientation `json:"orientation,omitempty"`
	Birthday    time.Time   `json:"birthday,omitempty"`
}
