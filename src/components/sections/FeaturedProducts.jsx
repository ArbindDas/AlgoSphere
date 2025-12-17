import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard"

const featuredProducts = [
  {
    title: "Wireless Noise-Canceling Headphones",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.5,
    reviewCount: 1243,
    category: "Electronics",
    isNew: true,
    isSale: true,
  },
  {
    title: "Premium Smart Watch Series 5",
    price: 349.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 892,
    category: "Electronics",
    isNew: true,
    isSale: false,
  },
  {
    title: "Organic Skincare Bundle",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.3,
    reviewCount: 567,
    category: "Beauty",
    isNew: false,
    isSale: true,
  },
  {
    title: "Designer Backpack - Waterproof",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.6,
    reviewCount: 321,
    category: "Fashion",
    isNew: true,
    isSale: true,
  },
  {
    title: "Smart Home Security System",
    price: 249.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 754,
    category: "Home",
    isNew: true,
    isSale: false,
  },
  {
    title: "Yoga Mat & Accessories Set",
    price: 69.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviewCount: 432,
    category: "Sports",
    isNew: false,
    isSale: true,
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-sm">
            <TrendingUp size={16} className="text-blue-500" />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold">
              TRENDING PRODUCTS
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Curated selection based on customer preferences and trends
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.title}
              delay={index * 0.1}
              {...product}
            />
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/products")}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
          >
            View All Products
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;