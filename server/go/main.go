package main

import (
	"golang-blog-app/config"
	controller "golang-blog-app/controllers"
	"golang-blog-app/helper"
	"golang-blog-app/middleware"
	"golang-blog-app/repository"
	"golang-blog-app/service"
	"time"

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

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		// c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		// c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		// c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, access_token, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		// c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE") w.Header().Set("Access-Control-Allow-Origin", "https://www.google.com")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-CSRF-Token, access_token")
		if c.Request.Method == "OPTIONS" {
			c.IndentedJSON(204, "")
			return
		}

		c.Next()
	}
}
func main() {
	defer config.CloseDatabaseConnection(db)

	server := gin.New()
	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "GET", "DELETE"},
		AllowHeaders:     []string{"access_token", "Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	}))
	// server.Use(cors.Default())

	server.Use(gin.LoggerWithFormatter(helper.LoggerConsole))
	server.Use(gin.Recovery())
	server.MaxMultipartMemory = 18 << 20 // 8 MiB
	authRoutes := server.Group("api/auth")
	{
		authRoutes.POST("/login", userController.Login)
		authRoutes.POST("/register", userController.Register)
	}
	// server.Use(cors.Default())
	postRoutes := server.Group("api/post")
	{
		postRoutes.GET("/get-all", postController.FindAllPostv2)
		postRoutes.GET("/get-one/:id", postController.FindOneByID)
	}
	// server.Use(cors.Default())

	authpostRoutes := server.Group("api/post", middleware.AuthorizeJWT(jwtService))
	{
		authpostRoutes.POST("/create", middleware.ImageValidate(), middleware.ImageUploader(), postController.CreatePost)
		authpostRoutes.PUT("/update/:id", middleware.ImageValidate(), middleware.ImageUploader(), postController.UpdatePost)
		authpostRoutes.DELETE("/delete/:id", postController.DeletePost)

	}
	server.Run(":5000")
}
