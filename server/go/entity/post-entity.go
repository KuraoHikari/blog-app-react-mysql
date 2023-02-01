package entity

import "time"

type Post struct {
	ID        int64     `gorm:"primary_key:auto_increment" json:"id"`
	Title     string    `gorm:"type:text" json:"title"`
	Desc      string    `gorm:"type:text" json:"desc"`
	Image     string    `gorm:"type:text" json:"image"`
	Cat       string    `gorm:"type:varchar(100)" json:"cat"`
	UserID    int64     `gorm:"not null" json:"userId"`
	User      User      `gorm:"foreignkey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
