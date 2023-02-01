package middleware

import (
	"golang-blog-app/helper"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func AuthorizeJWT(jwtService helper.JWTService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("access_token")
		if authHeader == "" {
			response := helper.BuildErrorResponse("Failed to process request", "No token found", nil)
			c.AbortWithStatusJSON(http.StatusBadRequest, response)
			return
		}

		token, err := jwtService.ValidateToken(authHeader)
		// if err != nil {
		log.Println(token, "ini token")
		// }
		if token.Valid {
			claims := token.Claims.(jwt.MapClaims)
			c.Set("user_id", claims["user_id"])

			// before request

			c.Next()
			log.Println("Claim[user_id]: ", claims["user_id"])
			log.Println("Claim[issuer] :", claims["issuer"])
		} else {
			log.Println(err)
			response := helper.BuildErrorResponse("Token is not valid", err.Error(), nil)
			c.AbortWithStatusJSON(http.StatusUnauthorized, response)
		}
	}
}
