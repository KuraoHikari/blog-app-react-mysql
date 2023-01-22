package entity

import "time"

type Post struct {
	ID        int64  `gorm:"primary_key:auto_increment" json:"-"`
	Title     string `gorm:"type:text" json:"-"`
	Desc      string `gorm:"type:text" json:"-"`
	Image     string `gorm:"type:text" json:"-"`
	Cat       string `gorm:"type:varchar(100)" json:"-"`
	UserID    int64 `gorm:"not null" json:"-"`
	User      User  `gorm:"foreignkey:UserID;constraint:onUpdate:CASCADE,onDelete:CASCADE" json:"-"`
	CreatedAt time.Time
	UpdatedAt time.Time
}