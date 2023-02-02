package dto

type CreatePostRequest struct {
	Title  string `json:"title" form:"title" binding:"required,min=1"`
	Desc   string `json:"desc" form:"desc" binding:"required,min=1"`
	Image  string `json:"image" form:"image"`
	Cat    string `json:"cat" form:"cat" binding:"required"`
	UserID uint64 `json:"user_id,omitempty" form:"user_id,omitempty"`
}

type UpdatePostRequest struct {
	ID     uint64 `json:"id" form:"id"`
	Title  string `json:"title" form:"title" binding:"required,min=1"`
	Desc   string `json:"desc" form:"desc" binding:"required,min=1"`
	Image  string `json:"image" form:"image,omitempty"`
	Cat    string `json:"cat" form:"cat" binding:"required"`
	UserID uint64 `json:"user_id,omitempty" form:"user_id,omitempty"`
}
type UpdatePostRequestWithOutImageFile struct {
	Image string `json:"image" form:"image" `
}
