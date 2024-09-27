# Content Aggregator API

## Description

Content Aggregator is a web application that allows users to discover and save content from various external sources. It integrates multiple APIs to gather articles, videos, and other types of content, which can then be categorized, filtered, and bookmarked by users.

- ------

## Features

- **User Registration and Login**: Users can create an account and log in to access personalized features.
- **Fetch External Content**: Fetches content from different external APIs and stores it in MongoDB for future use.
- **Categorize and Filter Content**: Users can browse content by categories, such as articles or videos.
- **Search Content**: Users can search for content using keywords.
- **Bookmark and Save**: Users can bookmark their favorite articles for easy access.
- **Filter by Date or Popularity**: Content can be sorted by publish date or popularity.

- ------

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API Integration**: Axios for fetching external content

- ------

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/MennaAllahZakaria/Content-Aggregator-API.git
    ```
2. Change into the project directory:

    ```sh
    cd Content-Aggregator-API
    ```


3. Install Dependencies

    ```bash
    npm install
    # or
    yarn install
    ```

4. ##### Set Up Environment Variables

    Create a .env file in the root directory and add the following:

    ```plaintext

    PORT=8000
    BASE_URL=http://localhost:8000
    NODE_ENV=development
    DB_USER=your data base user 
    DB_PASSWORD=data base password
    DB_NAME=data base name
    DB_URI=data base url

    SALT=Salt number

    JWT_SECRET=jwt secret string
    JWT_EXPIRE_IN=90d


    #EMAIL

    EMAIL_HOST= email of host
    EMAIL_PORT=465
    EMAIL_USER=email user
    EMAIL_PASS=email password
    EMAIL_FROM="Content Aggregator "
    ```

5. ##### Running the Server
  
    Start the server using:

    ```bash

    npm run start:dev
    # or
    yarn run start:dev
    ```
- ------

## Endpoints

1. #### User Endpoints
   - User Registration (Sign up)
        Method: POST
        Route: /api/v1/auth/signup
        Description: Registers a new user.
        Body:
            ```json
            {
            "username": "user1",
            "email": "user1@example.com",
            "password":"password123",
                    "passwordConfirm":"password123"
            }
            ```

   - User Login
        Method: POST
        Route: /api/v1/auth/login
        Description: Logs in an existing user and returns a token.
        Body:
            ```json

            {
            "email": "user1@example.com",
            "password": "password123"
            }
            ```
   - Get logged user data
            Method: GET
            Route: /api/v1/users/getMe
            Description:Get the data for the logged user.
   - Update logged user password
            Method: PUT
            Route: /api/v1/users/updateMyPassword
            Description:Get the data for the logged user.
            Body:
            ```json 
                {
                    "currentPassword": "password123",
                    "password":"new password",
                    "passwordConfirm":"new password"
                }
            ```
    - Update user without password
            Method: PUT
            Route: /api/v1/users/:id
            Description:Update specific User with password.
            Body:
            ```json 
                {
                    "username":"",
                    "email":"",
                    "phone":""
                }
            ```
    - Deactvate logged user
        Method: PUT
            Route: /api/v1/users/deactvateMe
            Description:Make the logged user not active

    - Update User Role (only for admin)
            Method: PUT
            Route: /api/v1/users/role
            Description:change the role of the user if he is user make him admin or vice versa.
- ------
2. #### Content Endpoints
   - Fetch External Content
        Method: GET
        Route: /api/v1/contents/fetch
        Description: Fetches content from external APIs and stores it in MongoDB.
        Body:
            ```json
            {
                "url": "https://newsapi.org/v2/everything?q=technology&apiKey=YOUR_API_KEY",
            "contentType": "article",
            
            "params": {
                "q": "technology",
                "language": "en"
                }
            }
            ```
   - Get All Content
        Method: GET
        Route: /api/v1/contents
        Description: Fetches all stored content from the database.

   - Get Content by ID
        Method: GET
        Route: /api/v1/contents/:id
        Description: Fetches a specific piece of content by its ID.

   - Search Content
        Method: GET
        Route: /api/v1/contents/search
        Query Parameters: ?query=<search-term>
        Description: Searches content using keywords.

   - Filter Content by Date or Popularity
        Method: GET
        Route: /api/v1/contents/filter
        Query Parameters: ?sort=date or ?sort=popularity
        Description: Filters content by date or popularity.

   - Delete Content (only for admin)
        Method: DELETE
        Route: /api/v1/contents/:id
        Description:Delete specific content
- ------

3. #### Bookmark Endpoints

   - Save Favorite Content
        Method: POST
        Route: /api/v1/bookmark/
        Description: Bookmarks content for the logged-in user.
        Body:
        ```json
            {
                "contentId":"content id"
            }
        ```
   - get Bookmarks For Logged User
        Method: GET
        Route: /api/v1/bookmark/
        Description: Bookmarks content for the logged-in user.

   - Remove Bookmark
        Method: DELETE
        Route: /api/v1/bookmark/:id
        Description: Deletes a bookmark for the logged-in user.
- ------

4. #### Category Endpoints
    
   - Create Category (only for admin)
        Method: POST
        Route: /api/v1/categories
        Description: Adds a new category (Admin access only).
        Body:
            ```json
                {
                "name": "Technology",
                "description": "Content related to tech and innovations."
                }
            ```

   - Get All Categories (only for admin)
        Method: GET
        Route: /api/v1/categories
        Description: Fetches all categories.

   - Get Category by ID (only for admin)
        Method: GET
        Route: /api/v1/categories/:id
        Description: Fetches a specific category by its ID.

   - Update Category (only for admin)
        Method: PUT
        Route: /api/v1/categories/:id
        Description: Updates category details (Admin access only).
        Body:
            ```json
                {
                    "name": "Updated Name",
                    "description": "Updated description"
                }
            ```
   - Delete Category (only for admin)
        Method: DELETE
        Route: /api/v1/categories/:id
        Description: Deletes a category (Admin access only).

- ------

## Testing

You can write and run tests using a testing framework like Jest.

To run tests:

```bash

npm test
# or
yarn test
```
- ------

## Contributing

Contributions are welcome! Please follow these steps:

- 1- Fork the repository.
- 2- Create a new branch (git checkout -b feature/your-feature-name).
- 3- Make your changes.
Commit your changes (git commit -m 'Add some feature').
- 4- Push to the branch (git push origin feature/your-feature-name).
- 5- Create a Pull Request.
