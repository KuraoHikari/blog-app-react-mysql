package helper

import (
	"errors"
	"mime/multipart"
)

func CheckFileSize(file *multipart.FileHeader) error {
	var maxSize int64 = 261120
	if file.Size >= maxSize {
		return errors.New("max image size is 255kb")
	}
	return nil
}
