package entity

import "time"

type User struct {
	ID        int64     `gorm:"primary_key:auto_increment" json:"id"`
	Username  string    `gorm:"type:varchar(100)" json:"username"`
	Email     string    `gorm:"type:varchar(100);unique;" json:"email"`
	Password  string    `gorm:"type:varchar(100)" json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
