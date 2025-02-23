import React from 'react';
import { Link } from 'react-router-dom';
import './PopularProducts.css';  // Import the CSS file

const PopularProducts = ({ products }) => {
  if (!Array.isArray(products)) {
    return <p>No products available.</p>;  // Handling case where products is not an array
  }

  // Filter products with rating greater than 4.5
  const filteredProducts = products
    ? products.filter(product => product.rating > 4)
    : [];

  // Sort the filtered products by rating (descending order) and take the top 10
  const popularProducts = filteredProducts
    .sort((a, b) => {
      // Ensure ratings are numbers, default to 0 if undefined
      const ratingA = a.rating ? parseFloat(a.rating) : 0;
      const ratingB = b.rating ? parseFloat(b.rating) : 0;
      return ratingB - ratingA;  // Sorting by rating in descending order
    })
    .slice(0, 10);  // Taking top 10 products

  return (
    <div className="container">
      <h2 className="heading">Popular Products</h2>
      <ul className="book-list">
        {
          popularProducts.map((product) => {
            return (
              <li key={product.id} className="book-item">
                <div>
                  <img 
                    src={product.images}  // Make sure the image key is correct
                    alt={product.title} 
                    className="product-image"
                  />
                  <div className="book-info">
                    <h3 className="book-title">{product.title}</h3>
                    <p className="book-description">{product.description}</p>
                    <p className="book-rating">Rating: {product.rating}</p>
                  </div>
                </div>

                {/* Link to ProductDetails with product id */}
                <Link to={`/product/${product.id}`}>
                  <button className="book-button">
                    View Product
                  </button>
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default PopularProducts;
