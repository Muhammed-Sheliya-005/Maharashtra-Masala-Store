import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../contex/CartContext.jsx";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) {
          setProduct(null);
          return;
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const isAvailable = product?.available && Number(product?.stock) > 0;
  const imageUrl = product?.image ? product.image.trim() : "/images/red-chilli.jpg";

  // Add Product to Cart with specified quantity
  const handleAddToCart = () => {
    if (!product || !isAvailable) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        _id: product._id,
        image: imageUrl,
      });
    }

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500 font-medium">Loading spice details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-4">🌶️</div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Product Not Found
        </h1>
        <p className="text-gray-500 mt-2">
          The spice item you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
        >
          ← Back to All Spices
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-orange-600">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-orange-600">Products</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Product Image */}
          <div className="relative rounded-2xl overflow-hidden bg-orange-50 border border-orange-100/50 shadow-inner">
            <img
              src={imageUrl}
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/red-chilli.jpg";
              }}
              className="w-full h-96 md:h-[420px] object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price & Unit */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-orange-600">
                ₹{product.price}
              </span>
              <span className="text-gray-500 text-lg">
                / {product.unit || "pack"}
              </span>
            </div>

            {/* Availability */}
            <div className="mt-5 flex items-center gap-3">
              {isAvailable ? (
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  In Stock ({product.stock} {product.unit} available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-800 px-3.5 py-1.5 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-6 border-t border-b border-gray-100 py-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description ||
                  "Hand-selected, hygienically prepared traditional Maharashtrian spices. Free from artificial colors, preservatives, and chemicals. Ideal for enhancing taste, aroma, and color in all recipes."}
              </p>
            </div>

            {/* Quantity Selector & Add to Cart */}
            {isAvailable ? (
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-semibold text-gray-700">Quantity:</label>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2 text-gray-600 hover:bg-gray-200 font-bold transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-bold text-gray-900 min-w-[2.5rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="px-3.5 py-2 text-gray-600 hover:bg-gray-200 font-bold transition"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">
                    Max: {product.stock}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold transition duration-300 shadow-sm flex items-center justify-center gap-2 ${
                      added
                        ? "bg-green-600 text-white"
                        : "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200"
                    }`}
                  >
                    {added ? (
                      <>✓ Added to Cart ({quantity})</>
                    ) : (
                      <>🛒 Add to Cart</>
                    )}
                  </button>

                  <Link
                    to="/cart"
                    className="border border-gray-200 hover:border-orange-500 hover:text-orange-600 text-gray-700 font-semibold py-3.5 px-6 rounded-xl text-center transition duration-200"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100 text-red-700 text-sm">
                This item is currently out of stock. Please check back later or explore other authentic spices.
              </div>
            )}

            {/* Back link */}
            <div className="mt-8">
              <Link
                to="/products"
                className="text-sm font-semibold text-gray-500 hover:text-orange-600 transition"
              >
                ← Back to Products List
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;