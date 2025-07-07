import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function Card(props) {
  let data = useCart();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const priceRef = useRef();
  let options = props.options || {};
  let priceOptions = Object.keys(options);

  const dispatch = useDispatchCart();

  const handleClick = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      return;
    }

    setIsAdding(true);
    
    try {
      let food = data.find(item => item.id === props.foodItem._id) || {};

      if (Object.keys(food).length > 0) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        } else {
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
        }
      } else {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size] || 0);

  // Enhanced default food images for different categories
  const getDefaultImage = () => {
    const category = props.foodItem.CategoryName?.toLowerCase() || '';
    const foodName = props.foodItem.name?.toLowerCase() || '';
    
    // Pizza images
    if (category.includes('pizza') || foodName.includes('pizza')) {
      const pizzaImages = [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop'
      ];
      return pizzaImages[Math.floor(Math.random() * pizzaImages.length)];
    }
    
    // Burger images
    if (category.includes('burger') || foodName.includes('burger')) {
      const burgerImages = [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
      ];
      return burgerImages[Math.floor(Math.random() * burgerImages.length)];
    }
    
    // Biryani images
    if (category.includes('biryani') || foodName.includes('biryani')) {
      const biryaniImages = [
        'https://images.unsplash.com/photo-1563379091339-03246963d6a9?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=400&h=300&fit=crop'
      ];
      return biryaniImages[Math.floor(Math.random() * biryaniImages.length)];
    }
    
    // Dessert images
    if (category.includes('dessert') || foodName.includes('dessert') || foodName.includes('cake') || foodName.includes('ice cream')) {
      const dessertImages = [
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop'
      ];
      return dessertImages[Math.floor(Math.random() * dessertImages.length)];
    }
    
    // Beverage images
    if (category.includes('beverage') || foodName.includes('coffee') || foodName.includes('tea') || foodName.includes('juice')) {
      const beverageImages = [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop'
      ];
      return beverageImages[Math.floor(Math.random() * beverageImages.length)];
    }
    
    // Pasta images
    if (category.includes('pasta') || foodName.includes('pasta')) {
      const pastaImages = [
        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop'
      ];
      return pastaImages[Math.floor(Math.random() * pastaImages.length)];
    }
    
    // Default food image
    return 'https://images.unsplash.com/photo-1504674900240-9c9c0c1d0b1a?w=400&h=300&fit=crop';
  };

  return (
    <div className="food-card-wrapper">
      <div className="card food-card">
        <div className="card-image-container">
          {!imageLoaded && !imageError && (
            <div className="image-loading">
              <div className="spinner"></div>
            </div>
          )}
          <img 
            src={imageError ? getDefaultImage() : (props.foodItem.img || getDefaultImage())} 
            className={`card-img-top ${imageLoaded ? 'loaded' : ''}`}
            alt={props.foodItem.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          <div className="card-overlay">
            <LocalOfferIcon className="offer-icon" />
          </div>
        </div>
        
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text text-muted">
            {props.foodItem.description || "Delicious food made with fresh ingredients and authentic flavors"}
          </p>
          
          <div className='quantity-selector'>
            <div className="selector-group">
              <label className="selector-label">Quantity:</label>
              <select 
                className="form-select quantity-select" 
                onChange={handleQty}
                value={qty}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            
            <div className="selector-group">
              <label className="selector-label">Size:</label>
              <select 
                className="form-select size-select" 
                ref={priceRef} 
                onChange={handleOptions}
                value={size}
              >
                {priceOptions.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="price-section">
            <span className="price">₹{finalPrice}/-</span>
            {size && options[size] && (
              <span className="price-per-unit">(₹{options[size]} per {size})</span>
            )}
          </div>
          
          <hr />
          
          <button 
            className={`btn btn-primary w-100 add-to-cart-btn ${isAdding ? 'loading' : ''}`} 
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                Adding...
              </>
            ) : (
              <>
                <AddShoppingCartIcon className="me-2" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

