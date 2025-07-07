import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">🍕 FoodieHub</h3>
                        <p className="footer-description">
                            Delivering delicious food to your doorstep with the best quality ingredients and fastest service.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <FacebookIcon />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <TwitterIcon />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <InstagramIcon />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <LinkedInIcon />
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/myOrder">My Orders</Link></li>
                            <li><Link to="/cart">Cart</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/createuser">Sign Up</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Categories</h4>
                        <ul className="footer-links">
                            <li><a href="#pizza">Pizza</a></li>
                            <li><a href="#burger">Burgers</a></li>
                            <li><a href="#biryani">Biryani</a></li>
                            <li><a href="#dessert">Desserts</a></li>
                            <li><a href="#beverages">Beverages</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Contact Info</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <PhoneIcon className="contact-icon" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="contact-item">
                                <EmailIcon className="contact-icon" />
                                <span>support@foodiehub.com</span>
                            </div>
                            <div className="contact-item">
                                <LocationOnIcon className="contact-icon" />
                                <span>123 Food Street, Tasty City, TC 12345</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; 2024 FoodieHub. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
