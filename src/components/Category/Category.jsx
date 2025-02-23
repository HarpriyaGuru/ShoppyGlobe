import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../utils/useFetch';
import './Category.css'; // Import the CSS file
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Category = () => {
  const { categoryName } = useParams(); // Get categoryName from URL params
  const { data, error, loading } = useFetch('https://dummyjson.com/products');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data && data.products) {
      // Filter products based on category
      const filtered = data.products.filter(product => product.category.toLowerCase() == categoryName.toLowerCase());
      setFilteredProducts(filtered);
    }
  }, [data, categoryName]);

  if (loading) {
    return <div className="no-products">Loading products...</div>;
  }

  if (error) {
    return <div className="no-products">Error fetching data</div>;
  }

  if (filteredProducts.length === 0) {
    return <div className="no-products">No products found in the "{categoryName}" category.</div>;
  }

  return (
    <>
    <Header />
    <div className="category-container">
      <h1>Category: {categoryName}</h1>
      <p>Products in the "{categoryName}" category:</p>

      <div className="products-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img 
              src={product.images[0]} 
              alt={product.title} 
              className="product-image" 
            />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <button className="cta-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Category;
