package middleware

import (
	"fmt"
	"golang-blog-app/dto"
	"golang-blog-app/helper"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ImageValidate() gin.HandlerFunc {
	return func(c *gin.Context) {
		file, err := c.FormFile("images")
		var updateRequest dto.UpdatePostRequestWithOutImageFile
		_ = c.ShouldBind(&updateRequest)
		// if errBind != nil {
		// 	response := helper.BuildErrorResponse("Failed to process request", "internal server error", nil)
		// 	c.AbortWithStatusJSON(http.StatusBadRequest, response)
		// 	return
		// }

		if (updateRequest.Image != "") && (file == nil) {
			log.Println("ini filenya", updateRequest.Image)
			c.Set("image_url", updateRequest.Image)
			c.Next()
		} else if (updateRequest.Image == "") && (file != nil) {
			if err != nil {
				response := helper.BuildErrorResponse("Failed to process request", "internal server error", nil)
				c.AbortWithStatusJSON(http.StatusBadRequest, response)
				return
			}
			fmt.Printf("MIME Header: %+v\n", file.Header)
			errCheckContentType := helper.CheckContentType(file, "image/jpg", "image/png", "image/jpeg")

			if errCheckContentType != nil {
				response := helper.BuildErrorResponse("Failed to process request", "file must be in img format", nil)
				c.AbortWithStatusJSON(401, response)
				return
			}

			errCheckFileSize := helper.CheckFileSize(file)
			if errCheckFileSize != nil {
				response := helper.BuildErrorResponse("Failed to process request", "max image size is 255kb", nil)
				c.AbortWithStatusJSON(401, response)
				return
			}
			c.Set("image_url", "")
			c.Next()
		} else {
			response := helper.BuildErrorResponse("Failed to process request", "please Select an images", nil)
			c.AbortWithStatusJSON(401, response)
			return
		}
		// log.Println("ini filenya", file)

		// fmt.Printf("Uploaded File: %+v\n", file.Filename)
		// fmt.Printf("File Size: %+v\n", file.Size)

		// log.Println(errCheckContentType)
	}
}
