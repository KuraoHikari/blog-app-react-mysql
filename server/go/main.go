package main

import (
	"golang-blog-app/config"
	"golang-blog-app/helper"
	"log"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	db *gorm.DB = config.SetupDatabaseConnection()
)

func main() {
	defer config.CloseDatabaseConnection(db)
	server := gin.New()
	server.Use(gin.LoggerWithFormatter(helper.LoggerConsole))
	server.Use(gin.Recovery())
	server.MaxMultipartMemory  = 8 << 20  // 8 MiB
	postRoutes := server.Group("api/post")
	{
		postRoutes.POST("/",func(c *gin.Context) {
			// Single file
			file, _ := c.FormFile("file")
			log.Println(file.Filename)
			log.Println(file)
			
		
			// Upload the file to specific dst.
			// c.SaveUploadedFile(file, dst)
		
			// c.String(http.StatusOK, fmt.Sprintf("'%s' uploaded!", file.Filename))
		  })
	}
	server.Run()
}