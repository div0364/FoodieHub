import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import SearchIcon from '@mui/icons-material/Search';

//import briyaniImage from '../asserts/briyaniImage.jpg';
import image1 from '../asserts/food1.avif';
import image2 from '../asserts/food2.avif';
import image3 from '../asserts/food3.avif';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch("http://localhost:4000/api/v1/foodData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const data = await response.json();
            setFoodItem(data[0] || []);
            setFoodCat(data[1] || []);
        } catch (error) {
            console.error("Error loading data:", error);
            setError('Failed to load food data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Memoize filtered data to prevent unnecessary re-renders
    const filteredData = useMemo(() => {
        if (!foodItem.length || !foodCat.length) return [];
        
        return foodCat.map(category => {
            const filteredItems = foodItem.filter(item => 
                item.CategoryName === category.CategoryName && 
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            
            return {
                ...category,
                items: filteredItems
            };
        }).filter(category => category.items.length > 0);
    }, [foodItem, foodCat, search]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        // Search is handled by the filteredData memo
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="alert alert-danger">
                        {error}
                        <button className="btn btn-outline-light ms-3" onClick={loadData}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            
            {/* Hero Carousel */}
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={image1} className="d-block w-100" alt="Delicious Food" loading="eager" />
                        <div className="carousel-caption d-none d-md-block">
                            <h2>Delicious Food Delivered to Your Doorstep</h2>
                            <div className="search-container">
                                <form onSubmit={handleSearch} className="d-flex">
                                    <input 
                                        className="form-control me-2" 
                                        type="search" 
                                        placeholder="Search for your favorite food..." 
                                        aria-label="Search" 
                                        value={search} 
                                        onChange={handleSearchChange} 
                                    />
                                    <button className="search-btn" type="submit">
                                        <SearchIcon />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={image2} className="d-block w-100" alt="Fresh Ingredients" loading="lazy" />
                        <div className="carousel-caption d-none d-md-block">
                            <h2>Fresh Ingredients, Amazing Taste</h2>
                            <div className="search-container">
                                <form onSubmit={handleSearch} className="d-flex">
                                    <input 
                                        className="form-control me-2" 
                                        type="search" 
                                        placeholder="Search for your favorite food..." 
                                        aria-label="Search" 
                                        value={search} 
                                        onChange={handleSearchChange} 
                                    />
                                    <button className="search-btn" type="submit">
                                        <SearchIcon />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={image3} className="d-block w-100" alt="Quick Delivery" loading="lazy" />
                        <div className="carousel-caption d-none d-md-block">
                            <h2>Fast Delivery, Great Service</h2>
                            <div className="search-container">
                                <form onSubmit={handleSearch} className="d-flex">
                                    <input 
                                        className="form-control me-2" 
                                        type="search" 
                                        placeholder="Search for your favorite food..." 
                                        aria-label="Search" 
                                        value={search} 
                                        onChange={handleSearchChange} 
                                    />
                                    <button className="search-btn" type="submit">
                                        <SearchIcon />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Food Categories */}
            <div className='container'>
                {filteredData.length > 0 ? (
                    filteredData.map((category) => (
                        <div key={category._id} className='category-section'>
                            <h2 className='category-title'>
                                {category.CategoryName}
                            </h2>
                            <div className='food-grid'>
                                {category.items.map((filteredItem) => (
                                    <div key={filteredItem._id}>
                                        <Cards 
                                            foodItem={filteredItem}
                                            options={filteredItem.options[0]}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : foodCat.length === 0 ? (
                    <div className="empty-state">
                        <h3>No Categories Found</h3>
                        <p>We're working on adding more delicious food categories for you!</p>
                    </div>
                ) : search ? (
                    <div className="empty-state">
                        <h3>No Results Found</h3>
                        <p>Try searching for something else or browse our categories.</p>
                        <button 
                            className="btn btn-primary mt-3" 
                            onClick={() => setSearch('')}
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <div className="empty-state">
                        <h3>No Food Items Available</h3>
                        <p>We're preparing delicious food for you. Please check back soon!</p>
                    </div>
                )}
            </div>
            
            <Footer />
        </div>
    );
}
