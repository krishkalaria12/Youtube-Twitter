# YouTube-Twitter Repository🎥🐦

This repository houses the backend implementation for a YouTube-Twitter hybrid platform. It provides functionalities like user authentication, video management, social interactions, and more.

## References

- [Data Modeling](https://documenter.getpostman.com/view/33297672/2sA2xmTVL8) - Link to Data Modeling Documentation
- [API Documentation](https://app.eraser.io/workspace/V6SS5LVjjRu9nOB5LSvC) - Link to API Documentation

## Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Aggregation Pipeline)
- Mongoose
- Cloudinary (for file storage)
- Multer (file upload middleware)

## Features

🔐 **Authentication**:
- Register
- Login
- Change Password
- Logout

👤 **User Management**:
- Get User by ID
- Update Account Details
- Update Avatar & Cover Image

👍📝 **Social Interactions**:
- Add Likes to Videos
- Comment on Videos & Tweets
- Tweet

📼 **Video Management**:
- Create, Update, Delete Video
- Get All Liked Videos of User
- Create Playlist
- Add & Remove Videos from Playlist
- Update Playlist

👥 **Subscription**:
- Subscribe & Unsubscribe Channel

📊 **Dashboard**:
- Channel Stats
- 
### Setup .env.local File

```js
PORT = 8000
MONGODB_URI = [Your MongoDB URI]
CORS_ORIGIN = *
ACCESS_TOKEN_SECRET = [Your Access Token Secret]
ACCESS_TOKEN_EXPIRY = 1d
REFRESH_TOKEN_SECRET = [Your Refresh Token Secret]
REFRESH_TOKEN_EXPIRY = 10d
CLOUDINARY_NAME = [Your Cloudinary Name]
CLOUDINARY_API_KEY = [Your Cloudinary API Key]
CLOUDINARY_API_SECRET = [Your Cloudinary API Secret]
```

## How to Use

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/youtube-twitter.git
    ```
2. Install dependencies:
    ```bash
    cd youtube-twitter
    npm install
    ```
3. Set up environment variables.
4. Run the project:
    ```bash
    npm run dev
    ```

Feel free to contribute to this project! 🚀

## Acknowledgments

This project was inspired by the functionalities of YouTube and Twitter. Special thanks to the open-source community for their valuable contributions.
