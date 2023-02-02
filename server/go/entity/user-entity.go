package entity

import "time"

type User struct {
	ID        uint64    `gorm:"primary_key:auto_increment" json:"id"`
	Username  string    `gorm:"type:varchar(100)" json:"username"`
	Email     string    `gorm:"type:varchar(100);unique;" json:"-"`
	Password  string    `gorm:"type:varchar(100)" json:"-"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
