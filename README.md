
# Basic Express Server with Mongoose

This is a starter template for a basic Express server with controllers and models. The server is set up to connect to a MongoDB database using Mongoose. Students will complete the server by adding the database functionality and implementing the controllers for creating, reading, updating, and deleting users.

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Project Structure

```
express_server_with_mongoose
│   server.js
│   .env
│
├───controllers
│       userController.js
│
├───models
│       user.js
│
└───routes
        userRoutes.js
```

## Steps

1. **Setup the Project:**
    - Install dependencies
        ```bash
        npm install
        ```

2. **Set Up Environment Variables:**
    - Install dotenv package
        ```bash
        npm install dotenv
        ```
    - Create a `.env` file in the root directory of your project and add your MongoDB connection string
        ```
        MONGO_URI=mongodb://localhost:27017/yourdbname
        ```

3. **Install Mongoose:**
    - Install Mongoose package
        ```bash
        npm install mongoose
        ```

4. **Update server.js:**
    - Add the following lines to the top of `server.js` to load environment variables
        ```javascript
        require('dotenv').config();
        ```
    - Update the MongoDB connection code to use the environment variable
        ```javascript
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
        ```

5. **Create the User Schema:**
    - Create `models/user.js` and add the following code to define the User schema
        ```javascript
        const mongoose = require('mongoose');

        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true,
            },
            age: {
                type: Number,
                required: true,
            }
        });

        module.exports = mongoose.model('User', userSchema);
        ```

6. **Understanding the Project Structure:**
    - `server.js`: The entry point of the server where the Express app is configured and started.
    - `controllers/userController.js`: Contains functions for handling requests related to users.
    - `models/user.js`: Defines the User schema using Mongoose.
    - `routes/userRoutes.js`: Defines the routes for user-related endpoints.

7. **Implementing CRUD Operations:**
    - Create `controllers/userController.js` and implement the following functions:
        - `createUser`: Creates a new user and saves it to the database.
        - `getUsers`: Retrieves all users from the database.
        - `updateUser`: Updates an existing user in the database.
        - `deleteUser`: Deletes a user from the database.
    
    Example:
    ```javascript
    const express = require('express');
    const router = express.Router();
    const User = require('../models/user');

    // Create a new user
    router.post('/', async (req, res) => {
        try {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Get all users
    router.get('/', async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Update a user
    router.put('/:id', async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    // Delete a user
    router.delete('/:id', async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User deleted' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

    module.exports = router;
    ```

8. **Running the Server:**
    - Start the server
        ```bash
        npm start
        ```
    - The server should be running on `http://localhost:5000`.

## API Endpoints

- **Create a new user**
    ```
    POST /api/users
    ```

    Example request body:
    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 30
    }
    ```

- **Get all users**
    ```
    GET /api/users
    ```

- **Update a user**
    ```
    PUT /api/users/:id
    ```

    Example request body:
    ```json
    {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 25
    }
    ```

- **Delete a user**
    ```
    DELETE /api/users/:id
    ```

## License

This project is licensed under the MIT License.
