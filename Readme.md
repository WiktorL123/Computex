
# Internet Store - MERN Stack Application

## **Overview**

Internet Store is a simulation of an online shopping platform built using the **MERN stack**:
- **MongoDB** for the database,
- **Express.js** for the backend server,
- **React** with **Next.js** for the frontend.

This project aims to provide a realistic simulation of an e-commerce application, showcasing features such as user authentication, product management, cart functionality, and order processing.

---

## **Features**

- **User Authentication**: Secure login and registration for customers.
- **Product Management**: View, filter, and search through a wide range of products.
- **Shopping Cart**: Add, update, and remove products from the cart.
- **Order Processing**: Create, confirm, and manage orders.
- **Admin Panel**: For managing products, users, and orders (if implemented).

---

## **Technologies Used**

### **Frontend**
- **React.js**: For building a dynamic user interface.
- **Next.js**: To handle server-side rendering (SSR) and improve SEO.

### **Backend**
- **Node.js**: A runtime environment for server-side JavaScript.
- **Express.js**: A lightweight and flexible backend framework.

### **Database**
- **MongoDB**: A NoSQL database for storing application data.

---

## **Setup and Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
    - For the backend:
      ```bash
      cd backend
      npm install
      ```
    - For the frontend:
      ```bash
      cd frontend
      npm install
      ```

3. **Set up environment variables**:
    - Create a `.env` file in the backend directory and add:
      ```env
      PORT=4002
      MONGO_URI=your-mongodb-connection-string
      JWT_SECRET=your-secret-key
      ```

4. **Run the application**:
    - Start the backend server:
      ```bash
      cd backend
      npm start
      ```
    - Start the frontend:
      ```bash
      cd frontend
      npm run dev
      ```

5. **Access the application**:
    - Open your browser and navigate to:
      ```
      http://localhost:3000
      ```

---

## **Project Structure**

### **Backend**
- `/models`: Mongoose schemas for MongoDB collections.
- `/controllers`: Logic for handling API requests.
- `/routes`: API routes for products, orders, users, and cart.
- `/middlewares`: Authentication and other middleware.

### **Frontend**
- `/pages`: Next.js pages for different parts of the application (home, product listing, cart, etc.).
- `/components`: Reusable UI components.
- `/utils`: Utility functions for API calls and other shared logic.

---

## **Future Enhancements**
- Payment gateway integration.
- Enhanced admin panel for managing products, orders, and users.
- Improved UI/UX with additional animations and responsiveness.

---

## **Contributions**
Contributions are welcome! Feel free to fork this repository and submit pull requests to enhance functionality or fix issues.

---

## **License**
This project is open-source and available under the [MIT License](LICENSE).

---

If you have any questions or need assistance, please feel free to contact the project owner. 😊
