import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../utils/useFetch'; // Custom hook to fetch products
import './ProductItem.css'; // Import the CSS file for styling
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { addItem } from '../../utils/cartSlice';

const ProductItem = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { data, loading, error } = useFetch('https://dummyjson.com/products'); // Fetch all products data
  const [product, setProduct] = useState(null); // State to store the selected product

  useEffect(() => {
    if (data && data.products) {
      // Find the product based on the id from the URL
      const foundProduct = data.products.find((item) => item.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [data, id]); // Re-run when data or id changes

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error fetching data</div>; // Show error state
  }

  if (!product) {
    return <div>Product not found</div>; // If no product found for the given id
  }

  const dispatch = useDispatch();

  // Add item to cart handler
  const handelAddItem = (item) => {
    dispatch(addItem(item)); // Dispatch the addItem action to Redux
  };

  return (
    <>
      <Header />
      <div className="product-item-container">
        <div className="product-item">
          <img
            src={product.images[0]} // Assuming the images is an array and we want to show the first image
            alt={product.title}
            className="product-image"
          />
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-brand">Brand: {product.brand}</p>
            <Link to={`/product-detail/${product.id}`}>
              <button className="cta-button">View Details</button>
            </Link>
            <Link to={`/cart`}>
            <button className="add-to-cart" onClick={() => handelAddItem(product)}>Add to Cart</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductItem;
