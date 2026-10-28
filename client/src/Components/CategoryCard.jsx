import { Link } from "react-router-dom";

function CategoryCard({ icon, title, description }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(title)}`}
      className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 text-center transition-all duration-300 hover:-translate-y-1"
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition mb-2">
        {title}
      </h3>

      <p className="text-gray-600 text-sm">
        {description}
      </p>

      <span className="inline-block mt-4 text-xs font-semibold text-red-600 group-hover:underline">
        Explore Category →
      </span>
    </Link>
  );
}

export default CategoryCard;