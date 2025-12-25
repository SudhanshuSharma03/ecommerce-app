import { motion } from 'framer-motion';
import { Recycle, Users, Award, TrendingUp, Heart, Shield } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Recycle,
      title: 'Sustainability',
      description: 'We promote electronic waste recycling and sustainable practices to protect our environment.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a community of environmentally conscious consumers and sellers.',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Every product is thoroughly tested and certified to meet our high-quality standards.',
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Secure transactions and reliable customer service you can depend on.',
    },
  ];

  const stats = [
    { label: 'Products Recycled', value: '50,000+' },
    { label: 'Happy Customers', value: '10,000+' },
    { label: 'CO₂ Saved (kg)', value: '100,000+' },
    { label: 'Years of Service', value: '5+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">About E-Waste Commerce</h1>
            <p className="text-xl text-primary-100">
              Your trusted marketplace for buying and selling refurbished electronics. 
              Together, we're reducing e-waste and building a sustainable future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At E-Waste Commerce, we believe that technology should be accessible and sustainable. 
                Our mission is to create a circular economy for electronics by providing a trusted 
                platform where people can buy high-quality refurbished devices and sell their used electronics.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Every year, millions of tons of electronic waste end up in landfills, causing 
                environmental harm and wasting valuable resources. We're changing that by giving 
                electronics a second life and making sustainable choices easy and affordable.
              </p>
              <div className="flex items-center gap-2 text-primary-600">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-semibold">Making a difference, one device at a time</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="text-3xl font-bold text-primary-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and help us create a better future for our planet.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of people making sustainable choices with our simple process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Browse Products',
                description: 'Explore our wide selection of certified refurbished electronics at great prices.',
              },
              {
                step: '02',
                title: 'Make a Purchase',
                description: 'Buy with confidence knowing every product comes with a warranty and quality guarantee.',
              },
              {
                step: '03',
                title: 'Sell Your Old Devices',
                description: 'List your used electronics and give them a new life while earning money.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary-100 mb-4">{item.step}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Be part of the solution. Start buying and selling sustainable electronics today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/products"
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                Browse Products
              </a>
              <a
                href="/contact"
                className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
