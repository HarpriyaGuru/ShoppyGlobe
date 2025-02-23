import React, { useState, useEffect } from 'react';
import useFetch from '../../utils/useFetch'; // Custom hook to fetch products
import './ProductList.css'; // Importing CSS for styling
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { data, loading, error } = useFetch('https://dummyjson.com/products');
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

  // Debounce logic to delay filtering search until user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (data) {
        const results = data.products?.filter((product) => {
          const name = product.title?.toLowerCase() || ''; // Fallback to empty string if undefined
          const category = product.category?.toLowerCase() || ''; // Fallback to empty string if undefined
          const brand = product.brand?.toLowerCase() || ''; // Fallback to empty string if undefined

          return (
            name.includes(searchTerm.toLowerCase()) ||
            category.includes(searchTerm.toLowerCase()) ||
            brand.includes(searchTerm.toLowerCase())
          );
        });
        setFilteredProducts(results || []); // Ensure fallback to empty array if results is undefined
      }
    }, 500); // Delay for 500ms before updating the filtered list

    return () => clearTimeout(timer); // Clear the timeout when searchTerm changes
  }, [data, searchTerm]);

  if (loading) return <div>Loading...</div>; // Handle loading state
  if (error) return <div>Error: {error.message}</div>; // Handle errors

  return (
    <>
      <Header />
      <div className="product-list-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, category or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="product-list">
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.images} alt={product.title} className="product-image" />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
                <Link to={`/product-detail/${product.id}`}>
                  <button className="add-to-cart-button">View Detail</button>
                </Link>
              </div>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
