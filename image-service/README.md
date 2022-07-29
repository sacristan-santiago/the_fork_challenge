# Image service
### :warning: Do not edit this project

## Context

This project provide a REST http server to retrieve and create image
> :warning: this project have no database, data are persisted in memory every server restart will reset the data!

 2 endpoints:
- `GET /images` is returning all images (no filter)
Expected response:
```json
{
    "images": [
        {
            "imageUuid": "imageUuid",
            "url": "url"
        }
    ]
}
```


- `POST /images` is saving new images
payload:
```json
{
    "imageUuid": "imageUuid",
    "url": "url"
}
```
Expected response:
```json
{
    "images": [
        {
            "imageUuid": "imageUuid",
            "url": "url"
        }
    ]
}
```
