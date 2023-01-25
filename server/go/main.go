package main

import (
	"fmt"
	"golang-blog-app/config"
	controller "golang-blog-app/controllers"
	"golang-blog-app/helper"
	"golang-blog-app/repository"
	"golang-blog-app/service"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	db *gorm.DB = config.SetupDatabaseConnection()
	userRepository repository.UserRepository 	= repository.NewUserRepository(db)
	jwtService helper.JWTService 				= helper.NewJWTService()
	userService service.UserService 			= service.NewUserService(userRepository)
	userController controller.UserController 	= controller.NewUserController(jwtService,userService)
)

func main() {
	defer config.CloseDatabaseConnection(db)
	
	server := gin.New()
	server.Use(gin.LoggerWithFormatter(helper.LoggerConsole))
	server.Use(gin.Recovery())
	server.MaxMultipartMemory  = 8 << 20  // 8 MiB
	authRoutes := server.Group("api/auth")
	{
		authRoutes.POST("/login", userController.Login)
		authRoutes.POST("/register", userController.Register)
	}

	postRoutes := server.Group("api/post")
	{
		postRoutes.POST("/",func(c *gin.Context) {
			// Single file
			file, _ := c.FormFile("images")
			fmt.Printf("Uploaded File: %+v\n", file.Filename)
			fmt.Printf("File Size: %+v\n", file.Size)
			fmt.Printf("MIME Header: %+v\n", file.Header)
			// log.Println(file)
			
		
			// Upload the file to specific dst.
			// c.SaveUploadedFile(file, dst)
		
			// c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
		  })
	}
	server.Run(":5000")
}