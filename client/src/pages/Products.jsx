import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All",
    "Ready-made Masala",
    "Loose Masala",
    "Pickles",
    "Akkha Masala",
  ];

  // Sync category state when URL search params change
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      setCategory(catParam);
    } else {
      setCategory("All");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategorySelect = (item) => {
    setCategory(item);
    if (item === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: item });
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category?.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-orange-600 font-bold text-xs tracking-widest uppercase bg-orange-50 px-4 py-1.5 rounded-full">
          Authentic Collection
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-3">
          Our Spices & Masalas
        </h1>
        <p className="text-gray-500 mt-2 max-w-xl mx-auto">
          Explore our wide range of traditional homemade spices, fresh whole spices, and signature pickles.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by masala or spice name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results Summary */}
          <div className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "product" : "products"}
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-gray-100">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => handleCategorySelect(item)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                category === item
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white rounded-2xl h-80 border border-gray-100 p-4 animate-pulse">
              <div className="bg-gray-100 h-44 rounded-xl mb-4"></div>
              <div className="bg-gray-100 h-4 rounded w-1/3 mb-2"></div>
              <div className="bg-gray-100 h-5 rounded w-3/4 mb-3"></div>
              <div className="bg-gray-100 h-4 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}

      {/* No Products Found */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-xs">
          <div className="text-5xl mb-3">🌶️</div>
          <h3 className="text-xl font-bold text-gray-800">No Spices Found</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm">
            We couldn't find any products matching your search criteria "{search || category}".
          </p>
          <button
            onClick={() => {
              setSearch("");
              handleCategorySelect("All");
            }}
            className="mt-5 inline-block bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;