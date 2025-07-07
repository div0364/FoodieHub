require('dotenv').config();

module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/foodiehub',
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production',
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development'
};
