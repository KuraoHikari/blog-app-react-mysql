package controller

import (
	"golang-blog-app/dto"
	"golang-blog-app/helper"
	"golang-blog-app/service"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type UserController interface {
	Login(ctx *gin.Context)
	Register(ctx *gin.Context)
}

type userController struct {
	jwtService  helper.JWTService
	userService service.UserService
}

func NewUserController(
	jwtService helper.JWTService,
	userService service.UserService,
) UserController {
	return &userController{
		jwtService:  jwtService,
		userService: userService,
	}
}

func (c *userController) Login(ctx *gin.Context) {
	var loginRequest dto.LoginRequest
	err := ctx.ShouldBind(&loginRequest)

	if err != nil {

		response := helper.BuildErrorResponse("failed to process request", err.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	err = c.userService.VerifyCredential(loginRequest.Email, loginRequest.Password)
	if err != nil {
		response := helper.BuildErrorResponse("failed to login", err.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, response)
		return
	}

	user, _ := c.userService.FindUserByEmail(loginRequest.Email)

	token := c.jwtService.GenerateToken(strconv.FormatUint(user.ID, 10))
	user.Token = token

	response := helper.BuildResponse(true, "OK!", user)
	ctx.JSON(http.StatusOK, response)

}

func (c *userController) Register(ctx *gin.Context) {
	var registerRequest dto.RegisterRequest

	err := ctx.ShouldBind(&registerRequest)
	if err != nil {
		response := helper.BuildErrorResponse("Failed to process request", err.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusBadRequest, response)
		return
	}

	user, err := c.userService.CreateUser(registerRequest)
	if err != nil {
		response := helper.BuildErrorResponse(err.Error(), err.Error(), helper.EmptyObj{})
		ctx.AbortWithStatusJSON(http.StatusUnprocessableEntity, response)
		return
	}

	token := c.jwtService.GenerateToken(strconv.FormatUint(user.ID, 10))
	user.Token = token
	response := helper.BuildResponse(true, "OK!", user)
	ctx.JSON(http.StatusCreated, response)

}
