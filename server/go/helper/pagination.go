package helper

import (
	"fmt"
	"golang-blog-app/entity"
	"math"
	"strconv"
)

func GetPaginationPage(page string, size string, cat string) (int, int, int, string) {
	var limit int
	var offset int
	var pageRetrun int
	var catFltr string

	if cat == "" {
		catFltr = ""
	} else {
		catFltr = fmt.Sprintf("cat = '%s'", cat)
	}

	if size == "" {
		limit = 3

	} else {
		sizeInt, err := strconv.Atoi(size)
		if err != nil {
			limit = 3
		}
		limit = sizeInt

	}
	if page == "" {
		offset = 0
		pageRetrun = 0
	} else {
		pageInt, err := strconv.Atoi(page)
		if err != nil {
			offset = 0
			pageRetrun = 0
		}
		pageRetrun = pageInt
		offset = pageInt * limit

	}

	return limit, offset, pageRetrun, catFltr

}

type ResponsePagination struct {
	Count       int           `json:"count"`
	Rows        []entity.Post `json:"rows"`
	TotalPages  int           `json:"totalPages"`
	CurrentPage int           `json:"currentPage"`
}

func GetPagingData(rows []entity.Post, count int, page int, limit int) ResponsePagination {
	var res ResponsePagination
	devide := float64(count) / float64(limit)

	res.CurrentPage = page
	res.TotalPages = int(math.Ceil(devide))
	res.Rows = rows
	res.Count = count

	return res
}
