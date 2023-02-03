package main

import (
	"golang-blog-app/config"
	controller "golang-blog-app/controllers"
	"golang-blog-app/helper"
	"golang-blog-app/middleware"
	"golang-blog-app/repository"
	"golang-blog-app/service"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	db             *gorm.DB                  = config.SetupDatabaseConnection()
	userRepository repository.UserRepository = repository.NewUserRepository(db)
	postRepository repository.PostRepository = repository.NewPostRepository(db)
	jwtService     helper.JWTService         = helper.NewJWTService()
	userService    service.UserService       = service.NewUserService(userRepository)
	postService    service.PostService       = service.NewPostService(postRepository)
	userController controller.UserController = controller.NewUserController(jwtService, userService)
	postController controller.PostController = controller.NewPostController(jwtService, postService)
)

func main() {
	defer config.CloseDatabaseConnection(db)

	server := gin.New()
	server.Use(cors.Default())
	server.Use(gin.LoggerWithFormatter(helper.LoggerConsole))
	server.Use(gin.Recovery())
	server.MaxMultipartMemory = 8 << 20 // 8 MiB
	authRoutes := server.Group("api/auth")
	{
		authRoutes.POST("/login", userController.Login)
		authRoutes.POST("/register", userController.Register)
	}
	postRoutes := server.Group("api/post")
	{
		postRoutes.GET("/", postController.FindAllPostv2)
		postRoutes.GET("/:id", postController.FindOneByID)
	}

	authpostRoutes := server.Group("api/post", middleware.AuthorizeJWT(jwtService))
	{
		authpostRoutes.POST("/", middleware.ImageValidate(), middleware.ImageUploader(), postController.CreatePost)
		authpostRoutes.PUT("/:id", middleware.ImageValidate(), middleware.ImageUploader(), postController.UpdatePost)
		authpostRoutes.DELETE("/:id", postController.DeletePost)

	}
	server.Run(":5000")
}
