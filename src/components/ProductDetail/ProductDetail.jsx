import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../utils/useFetch'; // Custom hook to fetch products
import './ProductDetail.css'; // Import the CSS file for styling
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useDispatch } from 'react-redux';
import { addItem } from '../../utils/cartSlice';

const ProductDetail = () => {
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


  const handelAddItem = (item) => {
    dispatch(addItem(item)); // Dispatch the addItem action to Redux
  };

  return (
    <>
      <Header />
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-image-container">
            <img
              src={product.images[0]} // Use the product image from the data
              alt={product.title}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-brand">Brand: {product.brand}</p>
            <p className="product-warranty">Warranty: {product.warrantyInformation}</p>
            <p className="product-shipping">Shipping Info: {product.shippingInformation}</p>
            <p className="product-availability">{product.availabilityStatus}</p>
            
            {/* Product Details */}
            <div className="product-details">
              <h4>Product Details:</h4>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Weight:</strong> {product.weight}g</p>
              <p><strong>Dimensions:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
              <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
              <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>
            </div>
            
            {/* Buttons Section */}
            <div className="product-buttons">
             <Link to={`/cart`}>
                         <button className="add-to-cart" onClick={() => handelAddItem(product)}>Add to Cart</button>
                         </Link>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="product-reviews">
          <h4>Customer Reviews:</h4>
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review">
                <p className="review-rating">Rating: {review.rating} / 5</p>
                <p className="review-comment">{review.comment}</p>
                <p className="review-author">By: {review.reviewerName}</p>
                <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
