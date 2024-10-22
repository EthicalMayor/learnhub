import  React, { useState, useEffect } from 'react';
import { BookOpen, Camera, Laptop, MessageCircle, Users, Calendar, FileText } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileText, faGraduationCap, faComments, faCheckSquare, faCalendar, faNewspaper, faBriefcase, faUsers, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { motion, useScroll, useAnimation, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link, Button } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import logo from '../../assets/logos/learnhub-logo.png';
import logo1 from '../../assets/logos/mit-logo.jpg';
import logo2 from '../../assets/logos/harvard-logo.jpg';
import logo3 from '../../assets/logos/stanford-logo.jpg';
import logo4 from '../../assets/logos/yale-logo.jpg';
import logo5 from '../../assets/logos/alx-logo.jpg';
import logo6 from '../../assets/logos/alu-logo.jpg';
import heroImage from '../../assets/learn.jpg';
import videoConferencing from '../../assets/hero/videoConferencing.jpg';
import gengs from '../../assets/trusted.jpg';
import testimonial1 from '../../assets/testimonial/image.jpg';
import testimonial2 from '../../assets/testimonial/image2.jpg';
import testimonial3 from '../../assets/testimonial/image3.jpg';
import testimonial4 from '../../assets/testimonial/image4.jpg';
import friends from '../../assets/hero/friends.jpg';
import running from '../../assets/hero/running.jpg';
import trustedByImage from '../../assets/imageee.jpg';
import feature from '../../assets/feature/feature.jpg';
import chat from '../../assets/chat/chats.jpg';
import background1 from '../../assets/image3.jpg';
import background2 from '../../assets/image6.jpg';
import background3 from '../../assets/image3.jpg';

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logos = [
    { src: logo1, name: 'MIT' },
    { src: logo2, name: 'Harvard' },
    { src: logo3, name: 'Stanford' },
    { src: logo4, name: 'Yale' },
    { src: logo5, name: 'ALX' },
    { src: logo6, name: 'ALU' },
  ];
 
  const slideContent = [
    { title: "Your Journey, Our Pathway", 
      subtitle: "Learning is Better Together. Grow in Style with LearnHub",
      image: friends
    },
    { title: "Real-time Collaborations", 
      subtitle: "Exclusively on LearnHub",
      image: videoConferencing
    },
    { title: "Create and Share Documents Easily ", 
      subtitle: "Learning is more fun with Learnhub",
      image: gengs
    },
    { title: "Our Secret to Success?", 
      subtitle: "Chase EXCELLENCE and SUCCESS will chase you PANTS DOWN!",
      image: running
    }
  ];

  const chatFeatures = [
    { title: "Group Chats", description: "Create and manage group chats for your study groups or project teams.", icon: <Users size={24} /> },
    { title: "Direct Messaging", description: "Connect one-on-one with classmates, mentors, or instructors.", icon: <MessageCircle size={24} /> },
    { title: "File Sharing", description: "Easily share documents, presentations, and other files within your chats.", icon: <FileText size={24} /> },

  ];

  const testimonials = [
    {
      image: testimonial1,
      quote: "LearnHub has completely transformed how I collaborate with my study group. The chat features are intuitive and make communication a breeze!",
      author: "Timi Johnson, Computer Science Major"
    },
    {
      image: testimonial2,
      quote: "As a postgraduate student, LearnHub has made it so much easier to manage my classes online and communicate with my fellow students. It's an indispensable tool for modern education.",
      author: "Alexa R., Ph.D in Psychology"
    },
    {
      image: testimonial3,
      quote: "The collaborative features have revolutionized our group projects. It's like having a virtual study room available 24/7!",
      author: "Alex T., Engineering Student"
    },
    {
      image: testimonial4,
      quote: "LearnHub's task management tools have helped me stay organized and on top of my coursework. My productivity has skyrocketed!",
      author: "Emily L., Psychology Major"
    }
  ];
  


useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % (slideContent.length + 1));
  }, 10000); // Change slide every 10 seconds

  return () => clearInterval(interval);
},[slideContent.length]); // Add dependency to fix warning


const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      >
      {children}
    </motion.div>
  );
};


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.5, when: "afterChildren" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};
const renderOriginalContent = () => (
  <motion.div
    key="original"
    className="absolute inset-0 z-10 flex items-center"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
     <div className="container mx-auto flex flex-col md:flex-row items-center px-4 space-y-8 md:space-y-0">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-10 text-gray-800 flex flex-col"
          variants={itemVariants}
        >
          <span className="block">Learn.</span>
          <span className="block">Connect.</span>
          <span className="block">Collaborate.</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 md:mb-12 font-bold text-gray-600 max-w-lg mx-auto md:mx-0"
          variants={itemVariants}
        >
         Studying only gets better with LearnHub.
        </motion.p>
        <motion.div
          className="space-y-4 md:space-y-0 md:space-x-4"
          variants={itemVariants}
        >
          <Link 
          to="/signup" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 rounded-full text-lg font-bold transition duration-300">Get LearnHub Free</Link>
          <button className="inline-block border border-gray-800 hover:bg-black hover:text-white px-6 md:px-8 py-3 rounded-full text-lg font-bold transition duration-300">Request a Demo</button>
        </motion.div>
      </div>
      <motion.div 
        className="w-full md:w-1/2"
        variants={itemVariants}
      >
        <div className="rounded-lg overflow-hidden shadow-2xl">
          <img src={heroImage} alt="LearnHub" className="w-full h-auto object-cover" />
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const renderSlideContent = () => (
  <motion.div
    key={currentSlide}
    className="absolute inset-0"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {/* Image container with responsive background */}
    <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full" 
    style={{ 
        backgroundImage: `url(${slideContent[currentSlide].image})`,
        // Add height constraint for very tall screens
        minHeight: '100vh'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </div>

    {/* Content container */}
    <div className="relative z-10 h-full flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            variants={itemVariants}
          >
            {slideContent[currentSlide].title}
          </motion.h1>
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8 leading-relaxed"
            variants={itemVariants}
          >
            {slideContent[currentSlide].subtitle}
          </motion.h2>
            {/* Optional: Add call-to-action buttons for slides */}
            <motion.div
            className="hidden md:flex justify-center space-x-4"
            variants={itemVariants}
          >
            <Link 
              to="/signup" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-bold transition duration-300"
            >
              Get Started
            </Link>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-full text-lg font-bold transition duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
      {/* Optional: Add navigation dots */}
    <div className="absolute bottom-8 left-0 right-0 z-20">
      <div className="flex justify-center space-x-2">
        {slideContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Optional: Add swipe functionality for mobile
useEffect(() => {
  let touchStartX = 0;
  let touchEndX = 0;
  
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e) => {
    touchEndX = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    const difference = touchStartX - touchEndX;
    if (Math.abs(difference) > 50) { // Minimum swipe distance
      if (difference > 0) {
        // Swipe left - next slide
        setCurrentSlide((prev) => (prev + 1) % (slideContent.length + 1));
      } else {
        // Swipe right - previous slide
        setCurrentSlide((prev) => (prev - 1 + (slideContent.length + 1)) % (slideContent.length + 1));
      }
    }
  };

  const element = document.querySelector('.hero-slideshow');
  if (element) {
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }
}, [slideContent.length]);


const NavDropdown = ({ title, items }) => {
const [isOpen, setIsOpen] = useState(false);
const [timeoutId, setTimeoutId] = useState(null);

const handleMouseEnter = () => {
  if (timeoutId) clearTimeout(timeoutId);
  setIsOpen(true);
};

const handleMouseLeave = () => {
  const id = setTimeout(() => setIsOpen(false), 150);
  setTimeoutId(id);
};

return (
  <div 
    className="relative group"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <button className="text-black text-sm lg:text-base font-bold hover:text-gray-600 transition duration-300">
      {title}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
            >
              <FontAwesomeIcon icon={item.icon} className="mr-2" />
              {item.title}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
};
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
      <header className="bg-white shadow-sm w-full" style={{ zIndex: 20, position: 'fixed', top: 0 }}>
        <div className="container mx-auto flex justify-between items-center py-2 px-4">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="LearnHub Logo" className="h-11 w-16 mr-2" />
            </Link>
            <h1 className="text-2xl font-bold text-black ml-1">LearnHub</h1>
          </div>

      {/* Hamburger Menu Icon for mobile */}
          <div className="block md:hidden">
            <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
          </div>

    {/* Full Navigation for larger screens */}
          <nav className="hidden md:flex w-full justify-between items-center">
            <div className="flex space-x-6 ml-12">
              <NavDropdown 
                title="Product" 
                items={[
                  { title: 'Documents', path: '/document', icon: faFileText },
                  { title: 'Resource Vault', path: '/resource', icon: faGraduationCap },
                  { title: 'Video Conferencing', path: '/signup', icon: faComments },
                  { title: 'Chats', path: '/chat', icon: faComments },
                  { title: 'Tasks', path: '/signup', icon: faCheckSquare },
                  { title: 'Calendars', path: '/signup', icon: faCalendar },
                ]}
              />
              <NavDropdown 
                title="Colleges" 
                items={[
                  { title: 'College News', path: '/signup', icon: faNewspaper },
                  { title: 'Career Hunt', path: '/signup', icon: faBriefcase },
                ]} />
              <NavDropdown 
                title="Gengs" 
                items={[
                  { title: 'The Geng', path: '/signup', icon: faUsers },
                  { title: 'Join the Geng', path: '/signup', icon: faUserPlus },
                ]} 
              />
            </div>

            <div className="flex items-center space-x-4 ml-auto">
              <Link to="/signup" className="text-black text-xs font-bold hover:text-gray-600 transition duration-300">Request a Demo</Link>
              <span className="text-gray-500 text-xs font-bold">|</span>
              <Link to="/login" className="text-black text-xs font-bold hover:text-gray-600 transition duration-300">Login</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 px-4 text-xs font-bold transition duration-300">Get LearnHub Free</Link>
            </div>
          </nav>
        </div>

          {/* Mobile Navigation for smaller screens */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-2">
              <MobileNavItem 
                title="Product" 
                items={[
                  { title: 'Documents', path: '/document' },
                  { title: 'Resource Vault', path: '/resource' },
                  { title: 'Video Conferencing', path: '/signup' },
                  { title: 'Chats', path: '/chat' },
                  { title: 'Tasks', path: '/signup' },
                  { title: 'Calendars', path: '/signup' },
                ]}  
              />
        <MobileNavItem 
          title="Colleges" 
          items={[
            { title: 'College News', path: '/signup' },
            { title: 'Career Hunt', path: '/signup' },
          ]}            
        />
        <MobileNavItem 
          title="Gengs" 
          items={[
            { title: 'The Geng', path: '/signup' },
            { title: 'Join the Geng', path: '/signup' },
          ]} 
        />
        <div className="mt-4 space-y-2">
          <Link to="/login" className="block py-2 text-black hover:bg-gray-100">Login</Link>
          <Link to="/signup" className="block py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full text-center">Get LearnHub Free</Link>
      </div>
    </div>
  </nav>
)}
</header>


<section className="relative h-screen overflow-hidden pt-16">
      <AnimatePresence mode="wait">
      {currentSlide === slideContent.length ? renderOriginalContent() : renderSlideContent()}
      </AnimatePresence>
</section>  
  

      {/* Improved Trusted by Section */}
      <FadeInSection>
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-extrabold mb-16 text-gray-900 text-center leading-tight">
              Trusted by Students at Leading Institutions
            </h2> 
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
              {logos.map((logo, index) => (
                <div key={index} className="flex text-3x1 flex-col items-center justify-center">
                <img 
                    src={logo.src} 
                    alt={logo.name} 
                    className="h-20 object-contain mb-4 hover:scale-110 transition duration-300 ease-in-out"
                    />
                  <h2 className="text-xl font-bold text-gray-700">{logo.name}</h2>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={trustedByImage}
                alt="Students using LearnHub"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Features Section */}
      <FadeInSection>
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">
              Collaborate in a Geng and Show Your Creativity
            </h2>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-12 lg:mb-0 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "Video Conferencing", description: "Engage with friends and enjoy reading sessions via conferencing.", icon: <Camera size={32} /> },
                  { title: "Collaborative Tools", description: "Built for teams and gangs to share, suggest, and comment.", icon: <Laptop size={32} /> },
                  { title: "Tasks", description: "Achieve your goals and update friends on your progress.", icon: <BookOpen size={32} /> },
                  { title: "Resource Sharing", description: "Share and access study materials easily.", icon: <FileText size={32} /> }
                ].map((feature, index) => (
                  <FadeInSection key={index}>
                    <FeatureCard {...feature} />
                  </FadeInSection>
                ))}
              </div>
                <div className="lg:w-1/2 lg:pl-12">
                  <img src={feature} alt="LearnHub Features" className="w-full h-auto object-cover rounded-lg shadow-2xl" />
                </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Improved Chat Section */}
      <FadeInSection>
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center text-gray-800">Connect with Friends via LearnHub Chat</h2>
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-12 lg:mb-0">
                <img src={chat} alt="LearnHub Chat Features" className="w-full h-auto object-cover rounded-lg shadow-2xl" />
              </div>
              <div className="lg:w-1/2 lg:pl-12 grid grid-cols-1 gap-8">
                {chatFeatures.map((feature, index) => (
                  <ChatFeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection>
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-extrabold mb-16 text-center text-gray-800 leading-tight">
            What Our Users Have to Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex items-center space-x-6 p-6 bg-gray-800 shadow-md rounded-lg">
                <img 
                  src={testimonial.image}
                  alt={testimonial.author.split(',')[0]} 
                  className="w-24 h-24 rounded-full object-cover" 
                />
                <TestimonialCard 
                  quote={testimonial.quote}
                  author={testimonial.author}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeInSection>

     {/* Improved Call to Action Section */}
      {/* Call to Action Section */}
      <FadeInSection>
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-black">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-xl mb-12 text-gray-700">
              Join LearnHub today and discover a new way to learn, connect, and achieve your goals.
            </p>
            <Link to="/signup" className="bg-black text-white hover:bg-gray-700 px-8 py-3 rounded-full text-lg font-bold transition duration-300">
              Get Started for Free
            </Link>
          </div>
        </section>
      </FadeInSection>
        
      <footer className="bg-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-400 hover:text-white transition duration-300">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition duration-300">Pricing</Link></li>
                <li><Link to="/integrations" className="text-gray-400 hover:text-white transition duration-300">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">LearnHub</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition duration-300">Careers</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition duration-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help-center" className="text-gray-400 hover:text-white transition duration-300">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Social</h3>
              <ul className="space-y-2">
                <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">Twitter</a></li>
                <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">LinkedIn</a></li>
                <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">Facebook</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-12">&copy; {new Date().getFullYear()} LearnHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
  
  