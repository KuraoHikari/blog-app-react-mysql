package repository

import (
	"golang-blog-app/entity"

	"gorm.io/gorm"
)

type PostRepository interface {
	SavePost(p entity.Post) entity.Post
	DeletePost(p entity.Post)
	AllPost() []entity.Post
	FindPostByID(postID uint64) entity.Post
	FindAll(page int, limit int, filter string) (post []entity.Post, total int64)
}

type postConnection struct {
	connection *gorm.DB
}

func NewPostRepository(dbConn *gorm.DB) PostRepository {
	return &postConnection{
		connection: dbConn,
	}
}

func (db *postConnection) FindAll(limit int, offset int, filter string) (posts []entity.Post, total int64) {
	db.connection.
		Preload("User").
		Preload("Posts.User").
		Where(filter).
		Model(&entity.Post{}).
		Count(&total).
		Limit(limit).
		Offset(offset).
		Order("created_at desc").
		Find(&posts)

	return posts, total
}

func (db *postConnection) SavePost(p entity.Post) entity.Post {
	db.connection.Save(&p)
	db.connection.Preload("User").Find(&p)
	return p
}

func (db *postConnection) DeletePost(p entity.Post) {
	db.connection.Delete(&p)
}

func (db *postConnection) AllPost() []entity.Post {
	var posts []entity.Post
	db.connection.Preload("User").Find(&posts)
	return posts
}

func (db *postConnection) FindPostByID(postID uint64) entity.Post {
	var post entity.Post
	db.connection.Preload("User").Find(&post, postID)
	return post
}
