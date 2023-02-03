package helper

import (
	"context"
	"encoding/base64"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/codedius/imagekit-go"
)

func toBase64(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

func ImageKitUploader(file *multipart.FileHeader) (string, error) {
	// encoded := base64.StdEncoding.EncodeToString(file)
	fileContent, _ := file.Open()
	bytes, err := ioutil.ReadAll(fileContent)
	if err != nil {
		return "", err
	}
	var base64Encoding string

	// Determine the content type of the image file
	mimeType := http.DetectContentType(bytes)

	// Prepend the appropriate URI scheme header depending
	// on the MIME type
	switch mimeType {
	case "image/jpg":
		base64Encoding += "data:image/jpg;base64,"
	case "image/jpeg":
		base64Encoding += "data:image/jpeg;base64,"
	case "image/png":
		base64Encoding += "data:image/png;base64,"
	}

	// Append the base64 encoded output
	base64Encoding += toBase64(bytes)

	publicKey := os.Getenv("IMGKIT_PUBKEY")
	privateKey := os.Getenv("IMGKIT_PRIVATEKEY")

	opts := imagekit.Options{
		PublicKey:  publicKey,
		PrivateKey: privateKey,
	}

	ik, err := imagekit.NewClient(&opts)
	if err != nil {
		// error handling
		return "", err
	}
	ur := imagekit.UploadRequest{
		File:              base64Encoding, // []byte OR *url.URL OR url.URL OR base64 string
		FileName:          file.Filename,
		UseUniqueFileName: true,
		Tags:              []string{},
		Folder:            "/",
		IsPrivateFile:     false,
		CustomCoordinates: "",
		ResponseFields:    nil,
	}

	ctx := context.Background()

	upr, err := ik.Upload.ServerUpload(ctx, &ur)
	if err != nil {
		// error handling
		return "", err
	}
	log.Println(upr.URL)
	return upr.URL, nil
}
