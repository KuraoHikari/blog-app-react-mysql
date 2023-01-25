package service

import (
	"errors"
	"golang-blog-app/dto"
	"golang-blog-app/entity"
	"golang-blog-app/helper"
	"golang-blog-app/repository"
	"log"

	"github.com/mashingan/smapping"
	"gorm.io/gorm"
)

type UserResponse struct {
	ID    int64  `json:"id"`
	Username  string `json:"name"`
	Email string `json:"email"`
	Token string `json:"token,omitempty"`
}

func NewUserResponse(user entity.User) UserResponse {
	return UserResponse{
		ID:    user.ID,
		Email: user.Email,
		Username:  user.Username,
	}
}

type UserService interface {
	CreateUser(registerRequest dto.RegisterRequest) (*UserResponse, error)
	FindUserByEmail(email string) (*UserResponse, error)
	VerifyCredential(email string, password string) error
}

type userService struct {
	userRepository repository.UserRepository
}

func NewUserService(userRepository repository.UserRepository) UserService {
	return &userService{
		userRepository: userRepository,
	}
}

func (c *userService)CreateUser(registerRequest dto.RegisterRequest) (*UserResponse, error){
	user, err := c.userRepository.FindByEmail(registerRequest.Email)
	if err == nil {
		return nil, errors.New("user already exists")
	}
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, err
	}
	err = smapping.FillStruct(&user, smapping.MapFields(&registerRequest))
	if err != nil {
		log.Fatalf("Failed map %v", err)
		return nil, err
	}
	user, _ = c.userRepository.SaveUser(user)
	res := NewUserResponse(user)
	return &res, nil
}
func (c *userService)FindUserByEmail(email string) (*UserResponse, error){
	user, err := c.userRepository.FindByEmail(email)
	if err != nil {
		return nil, err
	}
	userResponse := NewUserResponse(user)
	return &userResponse, nil
}
func (c *userService)VerifyCredential(email string, password string) error{
	user, err := c.userRepository.FindByEmail(email)
	if err != nil {
		println("hehe")
		println(err.Error())
		return err
	}
	isValidPassword := helper.CompareHashAndPassword(user.Password, []byte(password))
	if !isValidPassword {
		return errors.New("failed to login. check your credential")
	}
	return nil
}