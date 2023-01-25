## RESTful endpoints

### GET /posts?page=0&size=10

> Get all posts

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
	"count": 4,
	"rows": [
		{
			"id": 6,
			"title": "qoi",
			"desc": "ajkdhalkjsahds",
			"image": "https://ik.imagekit.io/i7sfz0nc450/Mask_group_AZG-BjaLF.png",
			"cat": "anjay",
			"userId": 1,
			"createdAt": "2023-01-24T11:52:48.542Z",
			"updatedAt": "2023-01-24T11:52:48.542Z",
			"User": {
				"email": "indra@gmail.com",
				"id": 1
			}
		},
		{
			"id": 5,
			"title": "anjay mabaar",
			"desc": "asajklsbhnajklcbajlhbcdsvau",
			"image": "https://ik.imagekit.io/i7sfz0nc450/Mask_group_V5Z8O7KPJ.png",
			"cat": "anjay",
			"userId": 1,
			"createdAt": "2023-01-24T08:18:36.349Z",
			"updatedAt": "2023-01-24T08:18:36.349Z",
			"User": {
				"email": "indra@gmail.com",
				"id": 1
			}
		},
		{
			"id": 4,
			"title": "qoi",
			"desc": "ajkdhalkjsahds",
			"image": "https://ik.imagekit.io/i7sfz0nc450/Mask_group_5LIArBd0_.png",
			"cat": "anjay",
			"userId": 1,
			"createdAt": "2023-01-24T08:17:43.121Z",
			"updatedAt": "2023-01-24T08:17:43.121Z",
			"User": {
				"email": "indra@gmail.com",
				"id": 1
			}
		},
		{
			"id": 2,
			"title": "aaaa3",
			"desc": "ajdkajhdjkansdx",
			"image": "https://ik.imagekit.io/i7sfz0nc450/Mask_group_V5Z8O7KPJ.png",
			"cat": "anjay",
			"userId": 1,
			"createdAt": "2023-01-23T12:49:53.448Z",
			"updatedAt": "2023-01-24T12:15:55.401Z",
			"User": {
				"email": "indra@gmail.com",
				"id": 1
			}
		}
	],
	"totalPages": 1,
	"currentPage": 0
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

---

### GET /posts/:id

> Get posts by params id

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
	"id": 4,
	"title": "qoi",
	"desc": "ajkdhalkjsahds",
	"image": "https://ik.imagekit.io/i7sfz0nc450/Mask_group_5LIArBd0_.png",
	"cat": "anjay",
	"userId": 1,
	"createdAt": "2023-01-24T08:17:43.121Z",
	"updatedAt": "2023-01-24T08:17:43.121Z",
	"User": {
		"email": "indra@gmail.com"
	}
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Unauthorized"
}

```

_Response (404 - Not Found)_

```
{
    "massage": "Post not Found"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

---

### POST /posts/

> Create new posts

_Request Header_

```
access_token = <token>
```

_Request Body_

```
{
    "title": "update yang 1",
    "desc": "moga ter updated",
    "images": "https://ik.imagekit.io/i7sfz0nc450/2hojyzfog3421_TwmRSXic5WP.jpg",
    "cat": "anjay",
}
```

_Response (201 - Created)_

```
{
    "id": 15,
    "title": "update yang 1",
    "desc": "moga ter updated",
    "image": "https://ik.imagekit.io/i7sfz0nc450/2hojyzfog3421_TwmRSXic5WP.jpg",
    "userId": 5,
    "cat": "anjay",
    "updatedAt": "2021-08-13T06:12:53.350Z",
    "createdAt": "2021-08-13T06:12:53.350Z",
}
```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}

```

_Response (400 - Bad Request)_

```

{
    "message": [
        "title required",
        "content required",
        "Image required",
        "Category required"
    ]
}

```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

---

### PUT /posts/:id

> Update post by params id

_Request Header_

```
access_token = <token>
```

_Request Body_

```
{
    "title": "makin malam ngab :3 update id post 11",
    "desc": "makin lag ngab",
    "images": "PJ9A8AoHksp.jpg",
    "cat": "anjay
}
```

_Response (200)_

```

{
    "id": 3,
    "title": "makin malam ngab :3 update id post 11",
    "desc": "makin lag ngab",
    "images": "PJ9A8AoHksp.jpg",
    "cat": "anjay,
    "userId": 3,
    "createdAt": "2021-08-06T07:43:37.479Z",
    "updatedAt": "2021-08-06T07:51:26.217Z"
}

```

_Response (400 - Bad Request)_

```
{
    "message": [
        "title required",
        "content required",
        "Category required"
    ]
}
```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}

```

_Response (404 - Not Found)_

```
{
    "massage": "Post not Found"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```

---

### DELETE /posts/:id

> Delete post by params id

_Request Header_

```
access_token = <token>
```

_Request Body_

```
not needed
```

_Response (200)_

```

    {
        "massage": "gw ngaapa ya succes to delete"
    }

```

_Response (401 - Invalid Token)_

```
{
    massage: "Invalid Token"
}

```

_Response (404 - Not Found)_

```
{
    "massage": "Post not Found"
}
```

_Response (500 - Bad Request)_

```
{
    massage: "Internal Server Error"
}
```
