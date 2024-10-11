import React, { useState, useEffect } from 'react';
import { BookOpen, Camera, Laptop, MessageCircle, Users, Calendar, FileText } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileText, faGraduationCap, faComments, faCheckSquare, faCalendar, faNewspaper, faBriefcase, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import logo from '../../assets/logos/learnhub-logo.png';
import logo1 from '../../assets/logos/mit-logo.jpg';
import logo2 from '../../assets/logos/harvard-logo.jpg';
import logo3 from '../../assets/logos/stanford-logo.jpg';
import logo4 from '../../assets/logos/yale-logo.jpg';
import logo5 from '../../assets/logos/alx-logo.jpg';
import heroImage from '../../assets/hero-image.jpg';
import trustedByImage from '../../assets/trustedbyimage.jpg';
import featuresImage from '../../assets/features.jpg';
import chatFeaturesImage from '../../assets/image2.jpg';
import background1 from '../../assets/image3.jpg';
import background2 from '../../assets/image6.jpg';
import background3 from '../../assets/image3.jpg';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isOriginalContent, setIsOriginalContent] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logos = [
    { src: logo1, name: 'MIT' },
    { src: logo2, name: 'Harvard' },
    { src: logo3, name: 'Stanford' },
    { src: logo4, name: 'Yale' },
    { src: logo5, name: 'ALX' },
    { src: logo5, name: 'ALU' },
  ];

  const slideContent = [
    { title: "Learn.", 
      subtitle: "Expand your knowledge with LearnHub",
      image: featuresImage
    },
    { title: "Connect.", 
      subtitle: "Build lasting relationships with friends.",
      image: featuresImage
    },
    { title: "Collaborate.", 
      subtitle: "Achieve more together through LearnHub.",
      image: featuresImage
    },
    { title: "Excel.", 
      subtitle: "Chase Excellence, and Success will chase you, pants down.",
      image: featuresImage
    }
  ];

  const chatFeatures = [
    { title: "Group Chats", description: "Create and manage group chats for your study groups or project teams.", icon: <Users size={24} /> },
    { title: "Direct Messaging", description: "Connect one-on-one with classmates, mentors, or instructors.", icon: <MessageCircle size={24} /> },
    { title: "File Sharing", description: "Easily share documents, presentations, and other files within your chats.", icon: <FileText size={24} /> },
    { title: "Chat Scheduling", description: "Plan and schedule chat sessions for your study groups or team meetings.", icon: <Calendar size={24} /> },
  ];

  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const smoothYPos = useSpring(yPos, { stiffness: 100, damping: 30 });

  const [currentBackground, setCurrentBackground] = useState(background1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOriginalContent(false);
    }, 5000); // Display the default herosection for 5 seconds

    return() => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOriginalContent) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) +> (prevSlide + 1) % slideContent.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isOriginalContent]);
  
  useEffect(() => {
      const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition < windowHeight) {
        setCurrentBackground(background1);
      } else if (scrollPosition < windowHeight * 2) {
        setCurrentBackground(background2);
      } else {
        setCurrentBackground(background3);
      }
  };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const AnimatedSection = ({ children, direction = 'up' }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    const variants = {
      hidden: {
        opacity: 0,
        y: direction === 'up' ? 50 : -50,
        x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      }
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  };
  

  const NavDropdown = ({ title, items }) => (
    <div className="relative group">
      <button className="text-black text-xs font-bold hover:text-gray-600 transition duration-300">
        {title}
      </button>
      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
        {items.map((item, index) => (
          <Link key={index} to={item.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <FontAwesomeIcon icon={item.icon} className="mr-2" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );

  const MobileNavItem = ({ title, items }) => (
    <div className="py-2">
      <button className="w-full text-left text-black font-bold py-2">{title}</button>
      <div className="pl-4">
        {items.map((item, index) => (
          <Link key={index} to={item.path} className="block py-2 text-gray-600 hover:bg-gray-100">
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );

  const FeatureCard = ({ title, description, icon }) => (
    <motion.div
      className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-gray-800 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  const ChatFeatureCard = ({ title, description, icon }) => (
    <motion.div
      className="bg-gray-100 p-6 rounded-lg flex items-start shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-gray-800 mr-4">{icon}</div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );

  const TestimonialCard = ({ quote, author }) => (
    <motion.div
      className="bg-gray-100 p-6 rounded-lg shadow-1g"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <p className="text-lg mb-4 text-gray-800">"{quote}"</p>
      <p className="text-sm font-bold text-black">- {author}</p>
    </motion.div>
  );

  return (
    <div className="relative font-sans text-black min-h-screen bg-white">
      <motion.div
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000"
        
        />

<header className="bg-white shadow-sm w-full" style={{ zIndex: 10, position: 'fixed', top: 0 }}>
  <div className="container mx-auto flex justify-between items-center py-2 px-4">
    <div className="flex items-center">
      <Link to="/">
        <img src={logo} alt="LearnHub Logo" className="h-11 w-16 mr-2" />
      </Link>
      <h1 className="text-x1 font-bold text-black ml-1">LearnHub</h1>
    </div>

    {/* Hamburger Menu Icon for mobile */}
    <div className="block md:hidden">
      <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
        <FontAwesomeIcon icon={faBars} className="text-2xl" />
      </button>
    </div>

    {/* Full Navigation for larger screens */}
    <nav className="text-1g hidden md:flex w-full justify-between items-center">
      <div className="text-2g flex space-x-6 ml-12">
        <NavDropdown 
          title="Product" 
          items={[
            { title: 'Documents', path: '/documents', icon: faFileText },
            { title: 'Resource Vault', path: '/resource-vault', icon: faGraduationCap },
            { title: 'Video Conferencing', path: '/video-conferencing', icon: faComments },
            { title: 'Chats', path: '/chats', icon: faComments },
            { title: 'Tasks', path: '/tasks', icon: faCheckSquare },
            { title: 'Calendars', path: '/calendars', icon: faCalendar },
          ]}
        />
        <NavDropdown title="Colleges" items={[
          { title: 'College News', path: '/college-news', icon: faNewspaper },
          { title: 'Career Hunt', path: '/career-hunt', icon: faBriefcase },
        ]} />
        <NavDropdown title="Gengs" items={[
          { title: 'The Geng', path: '/the-geng', icon: faUsers },
          { title: 'Join the Geng', path: '/join-the-geng', icon: faUserPlus },
        ]} />
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <Link to="/request-demo" className="text-black text-xs font-bold hover:text-gray-600 transition duration-300">Request a Demo</Link>
        <span className="text-gray-500 text-xs font-bold">|</span>
        <Link to="/chats" className="text-black text-xs font-bold hover:text-gray-600 transition duration-300">Login</Link>
        <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 px-4 text-xs font-bold transition duration-300">Get LearnHub Free</Link>
      </div>
    </nav>
  </div>

  {/* Mobile Navigation for smaller screens */}
  {isMobileMenuOpen && (
    <nav className="md:hidden bg-white bg-opacity-t">
      <div className="container mx-auto px-4 py-2">
        <MobileNavItem title="Product" items={[
          { title: 'Documents', path: '/documents' },
          { title: 'Resource Vault', path: '/resource-vault' },
          { title: 'Video Conferencing', path: '/video-conferencing' },
          { title: 'Chats', path: '/chats' },
          { title: 'Tasks', path: '/tasks' },
          { title: 'Calendars', path: '/calendars' },
        ]} />
        <MobileNavItem title="Colleges" items={[
          { title: 'College News', path: '/college-news' },
          { title: 'Career Hunt', path: '/career-hunt' },
        ]} />
        <MobileNavItem title="Gengs" items={[
          { title: 'The Geng', path: '/the-geng' },
          { title: 'Join the Geng', path: '/join-the-geng' },
        ]} />
        <Link to="/chats" className="block py-2 text-black hover:bg-gray-100">Login</Link>
        <Link to="/dashboard" className="block py-2 bg-blue-600 text-white hover:bg-blue-700 rounded mt-2">Get LearnHub Free</Link>
      </div>
    </nav>
  )}
</header>

  <section className="relative h-screen overflow-hidden">
    <AnimatePresence>
      {isOriginalContent ? (
        <motion.div
        key="original"
        className="absolute inset-0 bg-white flex items-center"
        initial={{ opacity: 0, x: '-100%' }}
        exit={{ opacity: 0, x: '-100%' }}
        transition={{ duration: 1 }}
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1
                className="text-8x1 font-bold md:mb-10 text-gray-800"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Learn. Connect.
                <h2>Collaborate.</h2>
              </motion.h1>
              <motion.p
              className="text-x1 mb-12 font-bold text-gray-600 max-w-1g"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              >
                Studying only gets better with LearnHub. With Gengs.
              </motion.p>
              <motion.div 
                className="space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-1g font-bold transition duration-300">Get LearnHub Free</Link>
                  <button className="border border-gray-800 hover:bg-black hover:text-white px-8 py-3 rounded-full text-1g font-bold transition duration-300">Request a Demo</button>
                </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div
                className="rounded-1g overflow-hidden shadow-2x1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <img src={heroImage} alt="LearnHub" className="w-full h-auto object"
              </motion.div>
            </div>
          </div>
        </motion.div>

      )}
    </AnimatePresence>
  </section>

    
    {/* Trusted by Section */}
<AnimatedSection direction="up">
  <section className="py-24 bg-gray-100">
    <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white-800 text-center">Trusted by Students at</h2>
        <div className="flex flex-wrap justify-center items-center mb-12">
          {logos.map((logo, index) => (
            <motion.div
            key={index}
            className="m-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={logo.src} alt={logo.name} className="text-black h-16 object-contain" />
            </motion.div>
          ))}
        </div>
        <motion.div
        className="rounded-lg overflow-hidden shadow-2x1"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        >
         <img src={trustedByImage} alt="Students using LearnHub" className="w-full h-auto object-cover" />
        </motion.div>
      </div>
  </section>
</AnimatedSection>



        {/* Features Section */}

    <AnimatedSection direction="right">
  <section className="py-24 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
      Collaborate in a Geng and show your creativity.
      </h2>
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0 grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard title="Video Conferencing" description="Engage with friends and enjoy reading sessions via conferencing." icon={<Camera size={32} />} />
          <FeatureCard title="Collaborative tools" description="Built for teams and gangs to share, suggest, and comment." icon={<Laptop size={32} />} />
          <FeatureCard title="Tasks" description="Achieve your goals and update friends on your progress." icon={<BookOpen size={32} />} />
          <FeatureCard title="Tasks" description="Achieve your goals and update friends on your progress." icon={<BookOpen size={32} />} />
        </div>
        <div className="md:w-1/2 md:pl-8">
        <motion.div 
          className="rounded-lg overflow-hidden shadow-2x1"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={featuresImage} alt="LearnHub Features" className="w-full h-auto object-cover" />
        </motion.div>
      </div>
    </div>
  </div>
</section>
</AnimatedSection>

       {/* Chat Features Section */}
       <AnimatedSection direction="left">
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Connect with Friends with LearnHub Chat</h2>
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <motion.div 
                  className="rounded-lg overflow-hidden shadow-2x1"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  >
                  <img src={chatFeaturesImage} alt="LearnHub Chat Features" className="w-full h-auto object-cover" />
                  </motion.div>
                  </div>
                <div className="md:w-1/2 md:pl-8 grid grid-cols-1 gap-8 ">
                  <ChatFeatureCard title="Group Chats" description="Create and manage group chats for your study groups or project teams." icon={<Users size={24} />} />
                  <ChatFeatureCard title="Direct Messaging" description="Connect one-on-one with classmates, mentors, or instructors." icon={<MessageCircle size={24} />} />
                  <ChatFeatureCard title="Direct Messaging" description="Connect one-on-one with classmates, mentors, or instructors." icon={<MessageCircle size={24} />} />
                  </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

    

{/* Testimonials Section */}
<AnimatedSection direction="up">
  <section className="py-24">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-16 text-center text-gray-600">What Our Users Have to Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-6">
          <img src="../../assets/image5.jpg" alt="Timi Johnson" className="w-24 h-24 rounded-full object-cover" />
          <TestimonialCard 
            quote="LearnHub has completely transformed how I collaborate with my study group. The chat features are intuitive and make communication a breeze!"
            author="Timi Johnson, Computer Science Major"
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-6">
          <img src="../../assets/hero-image.jpg" alt="Michael R." className="w-24 h-24 rounded-full object-cover" 
           />
          <TestimonialCard 
            quote="As a postgraduate student, LearnHub has made it so much easier to manage my classes online due to the distance and communicate with my fellow students. It's an indispensable tool for modern education."
            author="Michael R., Ph.D in Psychology"
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-6">
          <img src="../../assets/image4.jpg" alt="Alex T." className="w-24 h-24 rounded-full object-cover" />
          <TestimonialCard 
            quote="The collaborative features have revolutionized our group projects. It's like having a virtual study room available 24/7!"
            author="Alex T., Engineering Student"
          />
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-6">
          <img src="../../assets/image2.jpg" alt="Emily L." className="w-24 h-24 rounded-full object-cover" />
          <TestimonialCard 
            quote="LearnHub's task management tools have helped me stay organized and on top of my coursework. My productivity has skyrocketed!"
            author="Emily L., Psychology Major"
          />
        </motion.div>
      </div>
    </div>
  </section>
</AnimatedSection>

        {/* Call to Action Section */}
        <AnimatedSection direction="up">
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-600">Ready to Transform Your Learning Experience?</h2>
              <p className="text-xl mb-12 text-gray-400">
                Join LearnHub today and discover a new way to learn, connect, and achieve your goals.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="bg-gray-600 text-white hover:bg-white-100 px-8 py-3 rounded-full text-lg font-bold transition duration-300">
                  Get Started for Free
                </Link>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>

        <footer className="bg-gray-900 py-12">
          <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link to="/integrations" className="text-gray-400 hover:text-white">Integrations</Link></li>
            </ul>
          </div>
        <div>
        <h3 className="text-white font-bold mb-4">LearnHub</h3>
        <ul className="space-y-2">
          <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
          <li><Link to="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
          <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4">Support</h3>
        <ul className="space-y-2">
          <li><Link to="/help-center" className="text-gray-400 hover:text-white">Help Center</Link></li>
          <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white font-bold mb-4">Social</h3>
        <ul className="space-y-2">
          <li><a href="https://twitter.com/" className="text-gray-400 hover:text-white">Twitter</a></li>
          <li><a href="https://www.linkedin.com/" className="text-gray-400 hover:text-white">LinkedIn</a></li>
          <li><a href="https://www.facebook.com/" className="text-gray-400 hover:text-white">Facebook</a></li>
        </ul>
      </div>
       </div>
     <p className="text-center text-gray-500 text-sm mt-12">&copy; 2024 LearnHub. All rights reserved.</p>
    </div>
    </footer>
    </div>
  );
};


export default LandingPage;