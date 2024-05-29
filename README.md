# Food Delivery App - BlissBite

Food Delivery App is a web application built using the MERN stack, allowing users to seamlessly browse, order food items, and view their order history. The application provides user authentication through signup and login functionalities. The backend is implemented using Node.js, Express.js, and MongoDB, while the frontend is developed with React and utilizes Context API for state management.

## Live Demo

Explore the Food Delivery App: [BlissBite](https://blissbite.netlify.app/)  &ensp;   👈(Click Here)

**Sample Login Details:**
- **Email:** vrun123@test.com
- **Password:** varun00

## Features

- **User Authentication**: Users can Signup and Login securely to access personalized features. JWT (JSON Web Token) is used for authentication.

- **Order Food Items**: Browse through a variety of food items, select, and place orders.

- **Order History**: Users can view their order history to keep track of previous orders.

- **Security Measures**: JWT is implemented for secure authentication, and password hashing is used to enhance user account security.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB Atlas
  - JWT for Authentication
  - Password Hashing for Security

- **Frontend**:
  - ReactJS
  - Context API for State Management

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/vrun545/food-delivery-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd food-delivery-app
   ```

3. Install dependencies:

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client/food-app
   npm install
   ```

4. Set up MongoDB:
   - Create a MongoDB database.
   - Update the connection string in the backend `.env` file.

5. Run the application:

   ```bash
   # Run Backend Server (from the backend directory)
   cd ../server
   nodemon index.js

   # Run Frontend Development Server (from the frontend directory)
   cd ../client/food-app
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000` to access the Food Delivery App.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to the MERN stack for providing a robust and efficient technology stack for web development.
- Shoutout to the developers and contributors of the libraries and frameworks used in this project.

Feel free to contribute and enhance the features of this Food Delivery App! 🍔🛵. 
