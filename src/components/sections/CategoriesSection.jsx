
import { motion } from "framer-motion";
// import ProductCategoryCard from "./ProductCategoryCard";
import ProductCategoryCard from "../ProductCategoryCard"
// make sure categories is imported or defined
import {
  Smartphone,
  User,
  Package,
  Sparkles,
  Zap,
  Book,
} from "lucide-react";

const categories = [
    {
      icon: <Smartphone className="text-white" size={24} />,
      title: "Electronics",
      productCount: "12,458",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      icon: <User className="text-white" size={24} />,
      title: "Fashion",
      productCount: "23,741",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      icon: <Package className="text-white" size={24} />,
      title: "Home & Living",
      productCount: "8,942",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-500"
    },
    {
      icon: <Sparkles className="text-white" size={24} />,
      title: "Beauty",
      productCount: "5,623",
      bgColor: "bg-gradient-to-br from-orange-500 to-amber-500"
    },
    {
      icon: <Zap className="text-white" size={24} />,
      title: "Sports",
      productCount: "7,315",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-500"
    },
    {
      icon: <Book className="text-white" size={24} />,
      title: "Books",
      productCount: "4,892",
      bgColor: "bg-gradient-to-br from-indigo-500 to-blue-500"
    }
  ];

const CategoriesSection = () => {
  return (
    <>
      {/* Categories Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Shop by{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Category
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through thousands of products in our curated categories
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {categories.map((category, index) => (
              <ProductCategoryCard
                key={category.id ?? index}
                delay={index * 0.1}
                {...category}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesSection;
