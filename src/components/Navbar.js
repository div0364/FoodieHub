import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar(props) {
    const [cartView, setCartView] = useState(false);
    let data = useCart();
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const loadCart = () => {
        setCartView(true);
    };

    const isLoggedIn = localStorage.getItem('authToken');

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark position-sticky" style={{ boxShadow: '0px 10px 20px black', position: 'fixed', zIndex: '10', width: '100%' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <span className="brand-text">🍕 FoodieHub</span>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">
                                    <i className="fas fa-home me-1"></i>
                                    Home
                                </Link>
                            </li>
                            {isLoggedIn && (
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/myOrder">
                                        <i className="fas fa-list me-1"></i>
                                        My Orders
                                    </Link>
                                </li>
                            )}
                        </ul>
                        
                        <div className="navbar-nav ms-auto">
                            {!isLoggedIn ? (
                                <div className="d-flex gap-2">
                                    <Link className="btn btn-outline-light" to="/login">
                                        <PersonIcon className="me-1" />
                                        Login
                                    </Link>
                                    <Link className="btn btn-primary" to="/createuser">
                                        Sign Up
                                    </Link>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-3">
                                    <div className="cart-button-container">
                                        <button 
                                            className="btn btn-outline-light cart-btn" 
                                            onClick={loadCart}
                                            title="View Cart"
                                        >
                                            <AddShoppingCartIcon className="me-1" />
                                            Cart
                                            {data.length > 0 && (
                                                <span className="cart-badge">
                                                    {data.length}
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                    
                                    <div className="user-info">
                                        <span className="user-email">
                                            {localStorage.getItem('userEmail')}
                                        </span>
                                    </div>
                                    
                                    <button 
                                        onClick={handleLogout} 
                                        className="btn btn-outline-danger logout-btn"
                                        title="Logout"
                                    >
                                        <LogoutIcon />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            
            {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
        </div>
    );
}
