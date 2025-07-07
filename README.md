# 🍕 FoodieHub - Food Delivery App

A modern, full-stack food delivery application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- 🍽️ **Browse Food Items** - Explore delicious food from various categories
- 🔍 **Search Functionality** - Find your favorite dishes quickly
- 🛒 **Shopping Cart** - Add items, manage quantities, and sizes
- 👤 **User Authentication** - Secure login and registration
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI/UX** - Beautiful, intuitive interface
- 📦 **Order Management** - Track your order history
- 💳 **Checkout System** - Complete orders seamlessly

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FoodieHub
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URL=mongodb://localhost:27017/foodiehub
   JWT_SECRET=your_jwt_secret_key_here
   PORT=4000
   NODE_ENV=development
   ```

4. **Database Setup**
   
   Make sure MongoDB is running and create the following collections:
   - `food_items` - Food items data
   - `food_category` - Food categories
   - `users` - User accounts
   - `orders` - Order data

5. **Start the application**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Frontend (port 3000)
   npm start
   
   # Backend (port 4000)
   cd backend
   npm run dev
   ```

## 📁 Project Structure

```
FoodieHub/
├── backend/                 # Backend API
│   ├── config.js           # Configuration
│   ├── db.js              # Database connection
│   ├── index.js           # Server entry point
│   ├── models/            # MongoDB models
│   └── Routes/            # API routes
├── src/                   # Frontend React app
│   ├── components/        # Reusable components
│   ├── screens/          # Page components
│   ├── asserts/          # Images and assets
│   └── App.js           # Main app component
├── public/               # Static files
└── package.json         # Frontend dependencies
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Bootstrap 5** - CSS framework
- **Material-UI Icons** - Icon library
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 🎨 UI/UX Features

- **Modern Design** - Clean, professional interface
- **Responsive Layout** - Mobile-first approach
- **Smooth Animations** - Enhanced user experience
- **Loading States** - Better feedback
- **Error Handling** - User-friendly error messages
- **Accessibility** - WCAG compliant

## 🔧 Available Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Build and prepare for deployment

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Combined
- `npm run dev` - Start both frontend and backend
- `npm run install-all` - Install all dependencies

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

### Backend Deployment (Heroku/Railway)

1. **Prepare for deployment**
   ```bash
   cd backend
   ```

2. **Set environment variables**
   - `MONGO_URL` - Your MongoDB connection string
   - `JWT_SECRET` - Your JWT secret
   - `PORT` - Port number (auto-assigned by platform)

3. **Deploy to Heroku**
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

## 🔒 Security Features

- **JWT Authentication** - Secure user sessions
- **Password Hashing** - bcrypt encryption
- **Input Validation** - Express-validator
- **CORS Protection** - Cross-origin resource sharing
- **Environment Variables** - Secure configuration

## 📱 API Endpoints

### Authentication
- `POST /api/v1/createuser` - User registration
- `POST /api/v1/loginuser` - User login

### Food Data
- `POST /api/v1/foodData` - Get food items and categories

### Orders
- `POST /api/v1/orderData` - Create new order
- `POST /api/v1/myOrderData` - Get user orders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Contact the development team

## 🎯 Roadmap

- [ ] Payment integration (Razorpay)
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] Restaurant management
- [ ] Delivery partner app
- [ ] Analytics dashboard
- [ ] Multi-language support

---

**Made with ❤️ by the FoodieHub Team**
