import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../contex/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const productId = product._id || product.id;
  const isAvailable = product.available && Number(product.stock) > 0;
  const imageUrl = product.image ? product.image.trim() : "/images/red-chilli.jpg";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;

    addToCart({
      ...product,
      _id: productId,
      image: imageUrl,
    });

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image */}
        <Link to={`/products/${productId}`} className="block relative h-56 bg-orange-50 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/red-chilli.jpg";
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Availability Badge */}
          <div className="absolute top-4 right-4">
            {isAvailable ? (
              <span className="bg-green-100/90 backdrop-blur-xs text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100/90 backdrop-blur-xs text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs">
                Out of Stock
              </span>
            )}
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-5">
          <p className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
            {product.category || "Authentic Masala"}
          </p>

          <Link to={`/products/${productId}`}>
            <h3 className="text-lg font-bold text-gray-900 mt-2 hover:text-orange-600 transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[2.5rem]">
            {product.description || "Authentic Maharashtrian spices prepared with traditional methods."}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <span className="text-2xl font-extrabold text-orange-600">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                / {product.unit || "pack"}
              </span>
            </div>
            {isAvailable && (
              <span className="text-xs text-gray-400">
                Stock: {product.stock}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2 mt-2">
        <Link
          to={`/products/${productId}`}
          className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200"
        >
          Details
        </Link>

        {isAvailable ? (
          <button
            onClick={handleAddToCart}
            className={`text-center text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200 ${
              added
                ? "bg-green-600 text-white"
                : "bg-orange-600 hover:bg-orange-700 text-white"
            }`}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        ) : (
          <button
            disabled
            className="text-center text-sm font-semibold py-2.5 rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed"
          >
            Sold Out
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;