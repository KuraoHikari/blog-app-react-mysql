package entity

type User struct {
	ID       int64  `gorm:"primary_key:auto_increment" json:"-"`
	Username string `gorm:"type:varchar(100)" json:"-"`
	Email    string `gorm:"type:varchar(100);unique;" json:"-"`
	Password string `gorm:"type:varchar(100)" json:"-"`
}