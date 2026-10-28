import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../Components/CategoryCard";
import ProductCard from "../Components/ProductCard";

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (response.ok) {
          const data = await response.json();
          // Take first 3 or 4 products as featured
          setFeaturedProducts(Array.isArray(data) ? data.slice(0, 3) : []);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Hero Content */}
            <div>

              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🌶️ Fresh • Quality • Authentic Maharashtrian Spices
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Pure Masala,
                <span className="block text-orange-600">
                  Authentic Taste.
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                Discover fresh ready-made masalas, loose spices,
                traditional pickles, and premium whole spices
                crafted for your everyday kitchen.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  to="/products"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-200 transition duration-300"
                >
                  Shop Now →
                </Link>

                <Link
                  to="/about"
                  className="bg-white hover:bg-orange-50 text-gray-800 font-semibold px-7 py-3.5 rounded-xl border border-gray-200 transition duration-300"
                >
                  About Our Store
                </Link>

              </div>

              {/* Highlights */}
              <div className="mt-10 flex flex-wrap gap-8">

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    100%
                  </p>
                  <p className="text-sm text-gray-500">
                    Pure & Natural
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    Fresh
                  </p>
                  <p className="text-sm text-gray-500">
                    Ground Spices
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    Traditional
                  </p>
                  <p className="text-sm text-gray-500">
                    Maharashtrian Taste
                  </p>
                </div>

              </div>

            </div>

            {/* Hero Visual */}
            <div className="flex justify-center lg:justify-end">

              <div className="relative w-80 h-80 md:w-96 md:h-96">

                {/* Background Circle */}
                <div className="absolute inset-4 bg-orange-200 rounded-full"></div>

                {/* Main Circle */}
                <div className="absolute inset-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-2xl flex flex-col items-center justify-center text-center p-4">

                  <div className="text-6xl md:text-7xl">
                    🌶️
                  </div>

                  <h3 className="text-2xl font-extrabold text-white mt-3">
                    MAHARASHTRA
                  </h3>

                  <p className="text-orange-100 text-sm mt-1">
                    Authentic Masalas & Pickles
                  </p>

                </div>

                {/* Floating Cards */}
                <div className="absolute top-4 right-0 bg-white shadow-xl rounded-2xl px-5 py-4 border border-orange-100">
                  <div className="text-3xl">🌿</div>
                  <p className="font-bold text-gray-800 text-sm mt-1">
                    Fresh Spices
                  </p>
                </div>

                <div className="absolute bottom-6 left-0 bg-white shadow-xl rounded-2xl px-5 py-4 border border-orange-100">
                  <div className="text-3xl">🫙</div>
                  <p className="font-bold text-gray-800 text-sm mt-1">
                    Pure Quality
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* ================= CATEGORIES ================= */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-orange-600 font-bold text-sm tracking-widest uppercase">
              SHOP BY CATEGORY
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Find Your Favourite Spices
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Explore our range of authentic masalas, spices, and
              traditional Maharashtra products.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

            <CategoryCard
              icon="🌶️"
              title="Ready-made Masala"
              description="Freshly blended signature masalas for daily curries and sabzis."
            />

            <CategoryCard
              icon="🫙"
              title="Loose Masala"
              description="Pure single-origin spices available by weight for fine recipes."
            />

            <CategoryCard
              icon="🥭"
              title="Pickles"
              description="Traditional homemade style spicy mango and lemon pickles."
            />

            <CategoryCard
              icon="🌿"
              title="Akkha Masala"
              description="Premium whole spices including star anise, bay leaf & cardamom."
            />

          </div>

        </div>

      </section>


      {/* ================= POPULAR PRODUCTS (REAL MONGODB DATA) ================= */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">

            <div>

              <p className="text-orange-600 font-bold text-sm tracking-widest uppercase">
                OUR COLLECTION
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Popular Products
              </h2>

              <p className="text-gray-500 mt-3">
                Our most loved authentic masalas and fresh spices.
              </p>

            </div>

            <Link
              to="/products"
              className="text-orange-600 hover:text-orange-700 font-bold transition flex items-center gap-1"
            >
              View All Products →
            </Link>

          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-gray-100 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-gray-500">Products are loading from database...</p>
            </div>
          )}

        </div>

      </section>


      {/* ================= WHY US ================= */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center text-white mb-12">

            <p className="text-orange-200 font-semibold text-sm tracking-widest uppercase">
              WHY CHOOSE US
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
              Quality You Can Taste
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 text-center border border-white/10">
              <div className="text-4xl mb-4">
                🌿
              </div>

              <h3 className="text-xl font-bold text-white">
                Fresh Ingredients
              </h3>

              <p className="text-orange-100 mt-2 text-sm">
                Carefully selected whole spices for genuine aroma and taste.
              </p>
            </div>


            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 text-center border border-white/10">
              <div className="text-4xl mb-4">
                ✨
              </div>

              <h3 className="text-xl font-bold text-white">
                Authentic Taste
              </h3>

              <p className="text-orange-100 mt-2 text-sm">
                Traditional recipes passed down generations for rich flavour.
              </p>
            </div>


            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 text-center border border-white/10">
              <div className="text-4xl mb-4">
                ❤️
              </div>

              <h3 className="text-xl font-bold text-white">
                Made With Care
              </h3>

              <p className="text-orange-100 mt-2 text-sm">
                Hygienically ground and packed fresh to preserve essential oils.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= STORE BANNER ================= */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 md:p-14 text-center">

            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl text-3xl mb-5">
              📦
            </div>

            <p className="text-orange-600 font-bold text-sm tracking-widest uppercase">
              SEAMLESS ORDERING
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Explore Our Authentic Spices Today
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
              Order your favorite spice mixes online with real-time stock availability,
              transparent pricing, and fast door delivery.
            </p>

            <Link
              to="/products"
              className="inline-block mt-7 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-200 transition duration-300"
            >
              Browse All Products →
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;