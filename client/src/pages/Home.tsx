import { motion } from 'framer-motion';
import { ArrowRight, Recycle, Shield, Truck, Leaf, Smartphone, Laptop, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: <Recycle className="w-8 h-8" />,
      title: 'Eco-Friendly',
      description: 'Reduce electronic waste and help save the planet',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Quality Assured',
      description: 'All products tested and certified for quality',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Quick and secure shipping to your doorstep',
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Sustainable',
      description: 'Contribute to a circular economy',
    },
  ];

  const categories = [
    { icon: <Smartphone className="w-12 h-12" />, name: 'Smartphones', count: 150 },
    { icon: <Laptop className="w-12 h-12" />, name: 'Laptops', count: 89 },
    { icon: <Headphones className="w-12 h-12" />, name: 'Accessories', count: 200 },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Give Electronics a <span className="text-yellow-300">Second Life</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Shop refurbished and recycled electronics. Save money, save the planet.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20"
              >
                <div className="text-center">
                  <Recycle className="w-32 h-32 mx-auto mb-4 text-yellow-300" />
                  <p className="text-2xl font-bold">Join the Green Revolution</p>
                  <p className="text-gray-200 mt-2">Over 10,000 devices saved from landfills</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
              fill="white"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">Find the perfect refurbished device for you</p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="card p-8 text-center cursor-pointer group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full mb-4 group-hover:shadow-lg transition-shadow"
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count}+ Products</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
              Join thousands of eco-conscious shoppers who choose refurbished electronics. 
              Every purchase helps reduce e-waste and protect our environment.
            </p>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Devices Recycled' },
              { number: '5K+', label: 'Happy Customers' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
