package entity

import "time"

type Post struct {
	ID        uint64    `gorm:"primary_key:auto_increment" json:"id"`
	Title     string    `gorm:"type:text" json:"title"`
	Desc      string    `gorm:"type:text" json:"desc"`
	Image     string    `gorm:"type:text" json:"image"`
	Cat       string    `gorm:"type:varchar(100)" json:"cat"`
	UserID    uint64    `gorm:"not null" json:"userId"`
	User      User      `gorm:"foreignkey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"User"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
