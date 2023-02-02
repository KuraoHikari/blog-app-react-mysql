package repository

import (
	"golang-blog-app/entity"
	"golang-blog-app/helper"

	"gorm.io/gorm"
)

type UserRepository interface {
	SaveUser(user entity.User) (entity.User, error)
	FindByEmail(email string) (entity.User, error)
}

type userRepository struct {
	connection *gorm.DB
}

func NewUserRepository(connection *gorm.DB) UserRepository {
	return &userRepository{
		connection: connection,
	}
}

func (c *userRepository) SaveUser(user entity.User) (entity.User, error) {
	user.Password = helper.HashAndSalt([]byte(user.Password))
	c.connection.Save(&user)
	return user, nil
}
func (c *userRepository) FindByEmail(email string) (entity.User, error) {
	var user entity.User
	res := c.connection.Where("email = ?", email).Take(&user)
	if res.Error != nil {
		return user, res.Error
	}
	return user, nil
}
