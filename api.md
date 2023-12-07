Authentication
This authentication is only related to the /auction endpoints.

These endpoints are used to authorize yourself with the API server. All /auction routes require an authorization token to be included in the request.

Register
POST
/auction/auth/register
This endpoint will register a new user profile.

You will need to send all of the required values in your POST request:

Request
{
"name": "my*username", // Required
"email": "first.last@stud.noroff.no", // Required
"password": "UzI1NiIsInR5cCI", // Required
"avatar": "https://img.service.com/avatar.jpg" // Optional
}
The name value must not contain punctuation symbols apart from underscore (*).

The email value must be a valid stud.noroff.no or noroff.no email address.

The password value must be at least 8 characters.

You can now use your registered account to log in.

Login
POST
/auction/auth/login
You can use this endpoint to login with your registered user.

Request
{
"email": "first.last@stud.noroff.no",
"password": "UzI1NiIsInR5cCI"
}
Response
{
"name": "my_username",
"email": "first.last@stud.noroff.no",
"credits": 1000,
"avatar": "https://img.service.com/avatar.jpg",
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}
You can now use this access token as the Bearer token in the Authorization header for all /auction endpoints.

The response object will include your credits to use for bidding. Each user is given 1,000 credits by default.

Example of sending Authorization header.
Example
const options = {
headers: {
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....',
},
}

const response = await fetch(`${API_BASE_URL}/auction/listings`, options)
const data = await response.json()

Listings
Some of these are authenticated endpoints. You can visit authentication to get an access token.

This endpoint allows you to create, read, update, delete listings. Listings are the main content of an auction house. They are created by profiles and can be bid on by other profiles.

This is a paginated and sortable endpoint. You can use the limit and offset query parameters to paginate the results. You can also use the sort and sortOrder query parameters to sort the results. Read more about the pagination and sorting features here.

The Listing model
Properties
Name
id
Type
string
Description
The unique identifier for the listing.

Name
title
Type
string
Description
The title of the listing.

Name
description
Type
string
Description
The description of the listing.

Name
tags
Type
array
Description
A string array of tags for the listing.

Name
media
Type
array
Description
A string array of media URLs for the listing.

Name
created
Type
string
Description
The date the listing was created.

Name
updated
Type
string
Description
The date the listing was last updated.

Name
endsAt
Type
string
Description
The date the listing will end.

Name
\_count
Type
object
Description
A JSON object containing the number of bids for the listing.

Query parameters
Not all of the properties of a listing are returned by default. You can use the following optional query parameters to include additional properties in the response.

Parameters
Name
\_seller
Type
boolean
Description
A JSON object containing the seller name, email and avatar.

Name
\_bids
Type
boolean
Description
An array of objects containing bids for the listing. Each bid consists of an id, amount, bidderName and created date.

Example with all optional query parameters
{
"id": "string",
"title": "string",
"description": "string",
"tags": ["string"],
"media": ["https://url.com/image.jpg"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"seller": {
"name": "string",
"email": "user@example.com",
"avatar": "https://url.com/image.jpg"
},
"bids": [
{
"id": "string",
"amount": 0,
"bidderName": "string",
"created": "2020-01-01T00:00:00.000Z"
}
],
"\_count": {
"bids": 0
}
}
Filtering
You can filter for active listings by using the \_active query flag.

You can filter based on an entry in the tags array by using the \_tag query flag. You may only filter by one tag at a time.

Parameters
Name
\_tag
Type
string
Description
If set, the results will be filtered by this tag.

Name
\_active
Type
boolean
Description
If set to `true`, only active listings will be returned.

An example query filtering for active listings with the my_tag tag.

GET
/auction/listings?\_tag=my_tag&\_active=true
All entries
GET
/auction/listings
This endpoint does not require authentication.
This endpoint returns all listings in an array.

If you want to get all listings by a specific profile, you can use the listings by profile endpoint.

Response
[
{
"id": "string",
"title": "string",
"description": "string",
"tags": ["string"],
"media": ["https://url.com/image.jpg"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"\_count": {
"bids": 0
}
},
{
"id": "string",
"title": "string",
"description": "string",
"tags": ["string"],
"media": ["https://url.com/image.jpg"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"\_count": {
"bids": 0
}
}
// ...
]
Single entry
GET
/auction/listings/<id>
This endpoint does not require authentication.
This endpoint returns a single listing.

Use the \_seller, and/or \_bids flags to get more data from this request.

Response
{
"id": "string",
"title": "string",
"description": "string",
"tags": ["string"],
"media": ["https://url.com/image.jpg"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"\_count": {
"bids": 0
}
}
Create entry
POST
/auction/listings
This endpoint allows for the creation of a new listing. The title and endsAt properties are required, but we recommend including the description and media properties as well.

Please note that listings media property must be an array of fully formed URLs that links to live and publicly accessible images. The API will check the provided URLs and if any cannot be accessed publicly you will receive a 400 error response.

Request
{
"title": "string", // Required
"description": "string", // Optional
"tags": ["string"], // Optional
"media": ["https://url.com/image.jpg"], // Optional
"endsAt": "2020-01-01T00:00:00.000Z" // Required - Instance of new Date()
}
Response
{
"id": "string",
"title": "string",
"description": "string",
"tags": ["string"],
"media": ["https://url.com/image.jpg"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"\_count": {
"bids": 0
}
}
Update entry
PUT
/auction/listings/<id>
This endpoint allows for the updating of a listing.

Please note that listings media property must be an array of fully formed URLs that links to live and publicly accessible images. The API will check the provided URLs and if any cannot be accessed publicly you will receive a 400 error response.

Request
{
"title": "string", // Optional
"description": "string", // Optional
"tags": ["string"], // Optional
"media": ["https://url.com/image.jpg"] // Optional
}
Delete entry
DELETE
/auction/listings/<id>
This endpoint deletes an entry based on its id and returns nothing.

Bid on entry
POST
/auction/listings/<id>/bids
This endpoint allows for the creation of a new bid on a listing.

When a listing ends, the winning bid amount will be transferred to the seller's credits. All losing bids will be refunded to its original bidder's credits.

Request
{
"amount": 0 // Required
}
Response
{
"id": "string",
"title": "string",
"description": "string",
"tags": ["string"],
"media": ["https://url.com/image.jpg"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"\_count": {
"bids": 0
}
}

Profiles
These are authenticated endpoints. You can visit authentication to get an access token.

This endpoint allows you to manage profiles. They are the users of the auction house and are the owners of listings.

This is a paginated and sortable endpoint. You can use the limit and offset query parameters to paginate the results. You can also use the sort and sortOrder query parameters to sort the results. Read more about the pagination and sorting features here.

The Profile model
Properties
Name
name
Type
string
Description
The unique name of the profile.

Name
email
Type
string
Description
The email address of the profile.

Name
avatar
Type
string
Description
The URL of the profile avatar image.

Name
credits
Type
integer
Description
The number of credits the profile has.

Name
wins
Type
array
Description
A string array of ids of the listings the profile has won.

Name
\_count
Type
object
Description
A JSON object containing the number of listings for this profile.

Query parameters
Not all of the properties of a post are returned by default. You can use the following optional query parameters to include additional properties in the response.

Parameters
Name
\_listings
Type
boolean
Description
If set to `true`, returns the listings that belong to the profile.

Example with all optional query parameters
{
"name": "string",
"email": "user@example.com",
"avatar": "https://url.com/image.jpg",
"credits": 0,
"wins": ["string"],
"listings": [
{
"id": "string",
"title": "string",
"description": "string",
"media": ["https://url.com/image.jpg"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z"
}
],
"\_count": {
"listings": 0
}
}
All entries
GET
/auction/profiles
This endpoint returns a list of all registered profiles.

Response
[
{
"name": "string",
"email": "user@example.com",
"avatar": "https://url.com/image.jpg",
"credits": 0,
"wins": ["string"],
"\_count": {
"listings": 0
}
},
{
"name": "string",
"email": "user@example.com",
"avatar": "https://url.com/image.jpg",
"credits": 0,
"wins": ["string"],
"\_count": {
"listings": 0
}
}
]
Single entry
GET
/auction/profiles/<name>
This endpoint returns a single registered profile.

Response
{
"name": "string",
"email": "user@example.com",
"avatar": "https://url.com/image.jpg",
"credits": 0,
"wins": ["string"],
"\_count": {
"listings": 0
}
}
Update entry media
PUT
/auction/profiles/<name>/media
This endpoint allows for profile avatar images to be set or changed.

Please note that profile avatar property must be a fully formed URL that links to a live and publicly accessible image. The API will check the provided URL and if it cannot be accessed publicly you will receive a 400 error response.

Request
{
"avatar": "https://url.com/image.jpg" // Required
}
Response
{
"name": "string",
"email": "user@example.com",
"avatar": "https://url.com/image.jpg",
"credits": 0,
"wins": ["string"],
}
All listings by profile
GET
/auction/profiles/<name>/listings
This endpoint returns all listings created by profile.

The response is the same as the listings endpoint, and accepts the same optional query parameters and flags.

Response
[
{
"id": "string",
"title": "string",
"description": "string",
"media": ["https://url.com/image.jpg"],
"tags": ["string"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"\_count": {
"bids": 0
}
},
{
"id": "string",
"title": "string",
"description": "string",
"media": ["https://url.com/image.jpg"],
"tags": ["string"],
"created": "2020-01-01T00:00:00.000Z",
"updated": "2020-01-01T00:00:00.000Z",
"endsAt": "2020-01-01T00:00:00.000Z",
"\_count": {
"bids": 0
}
}
// ...
]
All bids by profile
GET
/auction/profiles/<name>/bids
This endpoint returns all bids made by profile.

Use the \_listing flag to include the associated listing's data.

Response
[
{
"id": "string",
"amount": 0,
"bidderName": "string",
"created": "2020-01-01T00:00:00.000Z"
},
{
"id": "string",
"amount": 0,
"bidderName": "string",
"created": "2020-01-01T00:00:00.000Z"
}
// ...
]
