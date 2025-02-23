import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 
import PopularProducts from './components/PopularProducts/PopularProducts';
import Header from './components/Header/Header';
import useFetch from './utils/useFetch'; // Import useFetch hook
import Footer from './components/Footer/Footer';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

const App = () => {
  // Fetch products data using useFetch hook
  const { data, error, loading } = useFetch('https://dummyjson.com/products');  // Assuming the products API endpoint is 'https://dummyjson.com/products'

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-container">
      <p>Loading...</p>
    </div>
      </>
    );
  }
  
  if (error) return <p>Error fetching data</p>;

  return (
    
    <>
      <Header />
      <div className="home">
        {/* Hero Section */}
        <section className="hero-section">
          <img 
            src="https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?semt=ais_hybrid" 
            alt="Hero Banner" 
            className="hero-image" 
          />
          <div className="hero-text">
            <h1>Welcome to ShoppyGlobe</h1>
            <p>Your one-stop shop for all your needs</p>
            <Link to="/products">
              <button className="cta-button">Shop Now</button>
            </Link>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="featured-categories">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-item">
              <img 
                src="https://img.freepik.com/free-photo/female-model-with-flowers-her-face_114579-6264.jpg?semt=ais_hybrid" 
                alt="Beauty" 
              />
                <Link to={`/category/beauty`}>
                Beauty
              </Link>
            </div>
            <div className="category-item">
              <img 
                src="https://img.freepik.com/free-photo/collection-small-perfume-bottles_53876-18283.jpg?semt=ais_hybrid" 
                alt="fragrances" 
              />
              <Link to={`/category/fragrances`}>
              fragrances
              </Link>
            </div>
            <div className="category-item">
              <img 
                src="https://img.freepik.com/free-photo/picture-frame-with-abstract-art-by-pink-velvet-armchair_53876-128125.jpg?semt=ais_hybrid" 
                alt="Furniture" 
              />
              <Link to={`/category/furniture`}>
               Furniture</Link> 
            </div>
            <div className="category-item">
              <img 
                src="https://img.freepik.com/premium-photo/miniature-shopping-cart_69593-8333.jpg?semt=ais_hybrid" 
                alt="Groceries" 
              />
                <Link to={`/category/groceries`}>
               Groceries</Link>
            </div>
          </div>
        </section>

        {/* Popular Products Section */}
        <section className="popular-products">
          {/* Pass the products data to PopularProducts component */}
          <PopularProducts products={data.products} /> {/* Update: Passing data.products instead of products */}
        </section> 

        {/* Special Offers Section */}
        <section className="special-offers">
          <h2>Special Offers</h2>
          <p>Limited time offer - 50% OFF on select products!</p>
          <Link to="/products">
          <button className="cta-button">Shop Now</button>
          </Link>
        </section>

        


      </div>
      <Footer />
    </>
  );
};

export default App;
