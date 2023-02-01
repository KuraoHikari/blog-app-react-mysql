package main

import (
	"errors"
	"fmt"
	"golang-blog-app/config"
	controller "golang-blog-app/controllers"
	"golang-blog-app/helper"
	"golang-blog-app/middleware"
	"golang-blog-app/repository"
	"golang-blog-app/service"
	"log"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	db             *gorm.DB                  = config.SetupDatabaseConnection()
	userRepository repository.UserRepository = repository.NewUserRepository(db)
	jwtService     helper.JWTService         = helper.NewJWTService()
	userService    service.UserService       = service.NewUserService(userRepository)
	userController controller.UserController = controller.NewUserController(jwtService, userService)
)

func checkContentType(file *multipart.FileHeader, contentTypes ...string) error {
	if len(contentTypes) > 0 {
		for _, contentType := range contentTypes {
			contentTypeFile := file.Header.Get("Content-Type")
			if contentTypeFile == contentType {
				return nil
			}
		}

		return errors.New("not allowed file type")
	} else {
		return errors.New("not found content type to be checking")
	}
}

func main() {
	defer config.CloseDatabaseConnection(db)

	server := gin.New()
	server.Use(gin.LoggerWithFormatter(helper.LoggerConsole))
	server.Use(gin.Recovery())
	server.MaxMultipartMemory = 8 << 20 // 8 MiB
	authRoutes := server.Group("api/auth")
	{
		authRoutes.POST("/login", userController.Login)
		authRoutes.POST("/register", userController.Register)
	}

	postRoutes := server.Group("api/post", middleware.AuthorizeJWT(jwtService))
	{
		postRoutes.POST("/", middleware.ImageValidate(), middleware.ImageUploader(), func(c *gin.Context) {
			userId := c.MustGet("user_id").(string)
			imageUrl := c.MustGet("image_url").(string)

			log.Println(userId, "ini user id")
			log.Println(imageUrl, "ini image url")
			// Single file
			// file, _ := c.FormFile("images")
			// errCheckContentType := checkContentType(file, "image/jpg", "image/png", "image/gif")
			// fmt.Printf("Uploaded File: %+v\n", file.Filename)
			// fmt.Printf("File Size: %+v\n", file.Size)
			// fmt.Printf("MIME Header: %+v\n", file.Header)
			// log.Println(errCheckContentType)
			// log.Println(file)

			// Upload the file to specific dst.
			// c.SaveUploadedFile(file, dst)

			c.String(http.StatusOK, fmt.Sprintf("'%s' userId!", userId))
		})
	}
	server.Run(":5000")
}
