package middleware

import (
	"golang-blog-app/helper"

	"github.com/gin-gonic/gin"
)

func ImageUploader() gin.HandlerFunc {
	return func(c *gin.Context) {
		image_url := c.MustGet("image_url").(string)
		if image_url == "" {
			file, _ := c.FormFile("images")

			imageUrl, err := helper.ImageKitUploader(file)
			if err != nil {
				response := helper.BuildErrorResponse("Failed to process request", err.Error(), nil)
				c.AbortWithStatusJSON(401, response)
				return
			}
			c.Set("image_url", imageUrl)

			c.Next()
		} else {
			// log.Println("masokkkkkk")
			c.Next()
		}
	}
}
