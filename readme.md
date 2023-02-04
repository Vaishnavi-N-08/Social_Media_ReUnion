# Social Media REST API

Welcome to the Social Media REST API project! This API provides a simple and convenient way to interact with a social media platform and perform various operations such as creating and retrieving posts, managing user accounts, and more.

The API is built using a RESTful architecture, allowing for easy integration into any application that needs to interact with the social media platform. The API is designed to be lightweight, scalable, and flexible, making it an ideal choice for any developer looking to add social media functionality to their application.

In this `README.md` file, you will find all the necessary information to get started with the Social Media REST API, including information on the endpoints, request/response formats, and examples of how to use the API in your own application.


## User Login
`/api/authenticate`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/authenticate)

should perform user authentication(email,password) and return a JWT token.
1. Send a post request with the required fields: email, password
2. Check response field according to requirements.
3. save the token for further use.
4. Cross validated the resposne field value with that in the database table
```json
{
    "email":"vaishnavi@gmail.com",
    "password":"pass@123"
}
```
```json
"eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk"
```

## Follow User
`/api/follow/{id}`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/follow/63465a864059129eef1f8926)

authenticated user would follow user with {id}
1. Send a post request with the required fields: token
2. Check response field according to requirements.
3. Cross validated the resposne field value with that in the database table
```json
{
    "token": "eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk"
}
```
```json
"user has been followed"
```

## Create Post
`api/posts/`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/posts)

It would add a new post created by the authenticated user
1. Send a post request with the required fields: token, title, desc
2. Check response field according to requirements.
3. Cross validated the resposne field value with that in the database table
```json
{
    "token":"eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk",
    "title":"Melange",
    "desc":"Event Oraganised by VIT Pune,at campus . It includes many competions .Other colleges are also allowed in it"
}
```
```json
{
    "id": "634710aab299e5abe6db1724",
    "title": "Melange",
    "desc": "Event Oraganised by VIT Pune,at campus . It includes many competions .Other colleges are also allowed in it",
    "createdAt": "2022-10-12T19:08:26.797Z"
}
```

## Comment On Post
`/api/comment/{id}`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/comment/634710aab299e5abe6db1724)

dd comment for post with {id} by the authenticated user.
1. Send a post request with the required fields: token, comment
2. Check response field according to requirements.
3. Cross validated the resposne field value with that in the database table
```json
{
    "token":"eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk",
    "comment_text":"something something....about the post"
}
```
```json
"63471143b299e5abe6db1728"
```

## Like Post
`/api/like/{id}`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/like/634710aab299e5abe6db1724)

It would like the post with {id} by the authenticated user.
1. Send a post request with the required fields: token,post Id
2. Check response field according to requirements.
3. Cross validated the resposne field value with that in the database table
```json
{
    "token":"eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk"
}
```
```json
The post has been liked
```

## Get user Profile
`/api/user`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/user)

It should authenticate the request and return the respective user profile.
1. Send a get request with the required fields: token
2. Check response field according to requirements.
3. Cross validated the resposne field value with that in the database table
```json
{
    "token":"eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk"
}
```
```json
{
    "username": "Vaishnavi",
    "no_followers": 1,
    "no_following": 4
}
```

## Get All post by perticular user
`/api/all_posts`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/all_posts)

It would return all posts created by authenticated user sorted by post time.
1. Send a get request with the required fields: token
2. Check response field according to requirements.
3. Cross validated the resposne field value with that in the database table
```json
{
    "token":"eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk"
}
```
```json
[
    {
        "id": "634710aab299e5abe6db1724",
        "title": "Melange",
        "desc": "Event Oraganised by VIT Pune,at campus . It includes many competions .Other colleges are also allowed in it",
        "createdAt": "2022-10-12T19:08:26.797Z",
        "likes": 1,
        "comments": [
            {
                "userId": "634659b74059129eef1f8923",
                "comment_text": "something something....about the post"
            }
        ]
    },
    {
        "id": "6346862c1c1fb1356dc214a0",
        "title": "Vishwostav",
        "desc": "Event Oraganised by VIT Pune,at campus",
        "createdAt": "2022-10-12T09:17:32.887Z",
        "likes": 0,
        "comments": [
            {
                "userId": "634659b74059129eef1f8923",
                "comment_text": "something something...."
            }
        ]
    }
]
```

## Get the perticular post 
`api/posts/{id}`	[Deployed Link](https://socialmediaapi-wm53.onrender.com/api/posts/634710aab299e5abe6db1724)

It would like the post with {id} by the authenticated user.
1. Send a get request with the required fields: token,post Id
2. Check response field according to requirements.
3. Cross validated the resposne field value with that in the database table
```json
{
    "token":"eyJhbGciOiJIUzI1NiJ9.VmFpc2huYXZp.IT0b7wfmLOcON4vTXPzWYpx5A26gndoIjrb1brTHLOk"
}
```
```json
{
    "id": "634710aab299e5abe6db1724",
    "title": "Melange",
    "desc": "Event Oraganised by VIT Pune,at campus . It includes many competions .Other colleges are also allowed in it",
    "no_likes": 1,
    "no_comments": 1
}
```

