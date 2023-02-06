package controller

import (
	"fmt"
	"golang-blog-app/entity"
	"golang-blog-app/helper"
	"golang-blog-app/service"
	"net/http"
	"strconv"

	"golang-blog-app/dto"

	"github.com/gin-gonic/gin"
)

type PostController interface {
	FindAllPostv2(context *gin.Context)
	FindAllPost(context *gin.Context)
	FindOneByID(context *gin.Context)
	CreatePost(context *gin.Context)
	UpdatePost(context *gin.Context)
	DeletePost(context *gin.Context)
}

type postController struct {
	jwtService  helper.JWTService
	postService service.PostService
}

func NewPostController(
	jwtService helper.JWTService,
	postService service.PostService,
) PostController {
	return &postController{
		postService: postService,
		jwtService:  jwtService,
	}
}

func (c *postController) FindAllPostv2(context *gin.Context) {
	pageStr := context.Query("page")
	catFltr := context.Query("cat")
	sizeStr := context.Query("size")

	limit, offset, page, filter := helper.GetPaginationPage(pageStr, sizeStr, catFltr)

	posts, total := c.postService.FindAllv2(limit, offset, filter)

	data := helper.GetPagingData(posts, int(total), page, limit)

	res := helper.BuildResponse(true, "OK", data)
	context.JSON(http.StatusOK, res)
}

func (c *postController) FindAllPost(context *gin.Context) {
	var posts []entity.Post = c.postService.All()
	res := helper.BuildResponse(true, "OK", posts)
	context.JSON(http.StatusOK, res)
}

func (c *postController) FindOneByID(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		res := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})
		context.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	var post entity.Post = c.postService.FindPostByID(id)
	if (post == entity.Post{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, res)
	} else {
		res := helper.BuildResponse(true, "OK", post)
		context.JSON(http.StatusOK, res)
	}
}
func (c *postController) CreatePost(context *gin.Context) {
	var newPost dto.CreatePostRequest
	userId := context.MustGet("user_id").(string)
	imageUrl := context.MustGet("image_url").(string)

	errDTO := context.ShouldBind(&newPost)
	if errDTO != nil {
		res := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, res)
	} else {
		userID := fmt.Sprintf("%v", userId)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			newPost.UserID = convertedUserID
		}
		newPost.Image = imageUrl
		result := c.postService.Create(newPost)
		response := helper.BuildResponse(true, "OK", result)
		context.JSON(http.StatusCreated, response)
	}
}
func (c *postController) UpdatePost(context *gin.Context) {
	var postUpdateDTO dto.UpdatePostRequest
	postId, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed tou get id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	var post entity.Post = c.postService.FindPostByID(postId)
	if (post == entity.Post{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, res)
	} else {
		userId := context.MustGet("user_id").(string)
		imageUrl := context.MustGet("image_url").(string)
		errDTO := context.ShouldBind(&postUpdateDTO)

		if errDTO != nil {
			res := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
			context.JSON(http.StatusBadRequest, res)
			return
		}
		postUpdateDTO.ID = postId
		postUpdateDTO.Image = imageUrl

		if c.postService.IsAllowedToEdit(userId, postId) {
			id, errID := strconv.ParseUint(userId, 10, 64)
			if errID == nil {
				postUpdateDTO.UserID = id
			}
			result := c.postService.Update(postUpdateDTO)
			response := helper.BuildResponse(true, "OK", result)
			context.JSON(http.StatusOK, response)
		} else {
			response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
			context.JSON(http.StatusForbidden, response)
		}
	}

}
func (c *postController) DeletePost(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed tou get id", "No param id were found", helper.EmptyObj{})
		context.JSON(http.StatusBadRequest, response)
	}
	var post entity.Post = c.postService.FindPostByID(id)

	if (post == entity.Post{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		context.JSON(http.StatusNotFound, res)
	} else {
		userId := context.MustGet("user_id").(string)
		post.ID = id

		if c.postService.IsAllowedToEdit(userId, id) {
			c.postService.Delete(post)
			res := helper.BuildResponse(true, "Deleted", helper.EmptyObj{})
			context.JSON(http.StatusOK, res)
		} else {
			response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
			context.JSON(http.StatusForbidden, response)
		}
	}
}
