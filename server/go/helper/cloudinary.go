package helper

import (
	"context"
	"mime/multipart"
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

func CloudinaryUploader(fileHeader *multipart.FileHeader) (string, error) {
	cloudinaryURL := os.Getenv("CLOUDINARY_URL")

	// cldUrl := fmt.Sprintf("%s", cloudinaryURL)
	file, errFileHeader := fileHeader.Open()
	if errFileHeader != nil {
		return "", errFileHeader
	}
	ctx := context.Background()
	cldService, err := cloudinary.NewFromURL(cloudinaryURL)
	if err != nil {
		return "", err
	}
	resp, errUpload := cldService.Upload.Upload(ctx, file, uploader.UploadParams{})
	if errUpload != nil {
		return "", err
	}
	image_url := resp.SecureURL
	return image_url, nil
}
