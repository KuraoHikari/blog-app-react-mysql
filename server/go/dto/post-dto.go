package dto

type CreatePostRequest struct {
	Title  string `json:"title" form:"title" binding:"required,min=1"`
	Desc   string `json:"desc" form:"desc" binding:"required,min=1"`
	Images string `json:"images" form:"images" binding:"required"`
	Cat    string `json:"cat" form:"cat" binding:"required"`
}

type UpdatePostRequest struct {
	Title string `json:"title" form:"title" binding:"required,min=1"`
	Desc  string `json:"desc" form:"desc" binding:"required,min=1"`
	Cat   string `json:"cat" form:"cat" binding:"required"`
}
type UpdatePostRequestWithOutImageFile struct {
	Image string `json:"image" form:"image" `
}
