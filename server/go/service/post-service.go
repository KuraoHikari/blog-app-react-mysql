package service

import (
	"fmt"
	"golang-blog-app/dto"
	"golang-blog-app/entity"
	"golang-blog-app/repository"
	"log"

	"github.com/mashingan/smapping"
)

type PostService interface {
	Create(p dto.CreatePostRequest) entity.Post
	Update(p dto.UpdatePostRequest) entity.Post
	Delete(p entity.Post)
	All() []entity.Post
	FindPostByID(postID uint64) entity.Post
	IsAllowedToEdit(userID string, postID uint64) bool
	FindAllv2(limit int, offset int) (posts []entity.Post, total int64)
}

type postService struct {
	postRepository repository.PostRepository
}

func NewPostService(postRepo repository.PostRepository) PostService {
	return &postService{
		postRepository: postRepo,
	}
}
func (service *postService) FindAllv2(limit int, offset int) (posts []entity.Post, total int64) {
	return service.postRepository.FindAll(limit, offset)
}

func (service *postService) Create(p dto.CreatePostRequest) entity.Post {
	post := entity.Post{}
	err := smapping.FillStruct(&post, smapping.MapFields(&p))
	if err != nil {
		log.Fatalf("Failed map %v: ", err)
	}
	res := service.postRepository.SavePost(post)
	return res
}
func (service *postService) Update(p dto.UpdatePostRequest) entity.Post {
	post := entity.Post{}
	err := smapping.FillStruct(&post, smapping.MapFields(&p))
	if err != nil {
		log.Fatalf("Failed map %v: ", err)
	}
	res := service.postRepository.SavePost(post)
	return res
}
func (service *postService) Delete(p entity.Post) {
	service.postRepository.DeletePost(p)
}
func (service *postService) All() []entity.Post {
	return service.postRepository.AllPost()
}
func (service *postService) FindPostByID(postID uint64) entity.Post {
	return service.postRepository.FindPostByID(postID)
}
func (service *postService) IsAllowedToEdit(userID string, postID uint64) bool {
	p := service.postRepository.FindPostByID(postID)
	id := fmt.Sprintf("%v", p.UserID)
	return userID == id
}
