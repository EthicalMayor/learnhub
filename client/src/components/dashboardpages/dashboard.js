import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera, Book, Archive, Video, MessageSquare, CheckSquare, Calendar, Newspaper,
  Briefcase, Users, Globe, UserPlus, GraduationCap, Users as UsersIcon, 
  BarChart, Bell, Settings, LogOut, Plus, ArrowRight, Sparkles
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Dashboard = () => {
  const { user } = useUser();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');
  const isNewUser = !user?.projects || user.projects.length === 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Welcome overlay for first-time users
  const WelcomeOverlay = () => (
    <div className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-1000 ${showWelcome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-2xl animate-fade-up">
        <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold mb-2">Welcome to LearnHub!</h1>
        <p className="text-gray-600 mb-6">Let's get you started on your learning journey</p>
        <button 
          onClick={() => setShowWelcome(false)}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  const NavItem = ({ icon, label, to }) => (
    <Link 
      to={to} 
      onMouseEnter={() => setActiveMenu(label)}
      onMouseLeave={() => setActiveMenu('')}
      className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg transition-all duration-300 group relative"
    >
      <div className={`transition-colors duration-300 ${activeMenu === label ? 'text-blue-500' : 'text-gray-600'}`}>
        {icon}
      </div>
      <span className={`text-sm font-medium transition-colors duration-300 ${activeMenu === label ? 'text-blue-500' : 'text-gray-600'}`}>
        {label}
      </span>
      {activeMenu === label && (
        <div className="absolute left-0 w-1 h-full bg-blue-500 rounded-r-lg animate-slide-right" />
      )}
    </Link>
  );

  const GetStartedCard = () => (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg animate-fade-up">
      <h3 className="text-xl font-bold mb-4">Welcome to LearnHub! 👋</h3>
      <p className="mb-6">Let's help you get started with these quick actions:</p>
      <div className="space-y-4">
        {[
          { icon: <UserPlus className="w-5 h-5" />, text: "Complete your profile" },
          { icon: <Users className="w-5 h-5" />, text: "Join a study group" },
          { icon: <Book className="w-5 h-5" />, text: "Browse learning resources" }
        ].map((action, index) => (
          <button key={index} className="w-full flex items-center space-x-3 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors group">
            {action.icon}
            <span>{action.text}</span>
            <ArrowRight className="w-4 h-4 ml-auto transform transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <WelcomeOverlay />
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between h-screen sticky top-0">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold mb-8 text-blue-500 animate-fade-in">LearnHub</h1>
          <nav className="flex flex-col space-y-2">
            <NavItem icon={<BarChart className="w-5 h-5" />} label="Dashboard" to="/" />
            <NavItem icon={<Book className="w-5 h-5" />} label="Documents" to="/document" />
            <NavItem icon={<Video className="w-5 h-5" />} label="Video Conferencing" to="/video-conferencing" />
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Chats" to="/chat" />
            <NavItem icon={<CheckSquare className="w-5 h-5" />} label="Tasks" to="/task" />
            <NavItem icon={<Calendar className="w-5 h-5" />} label="Calendar" to="/calendar" />
            <NavItem icon={<Users className="w-5 h-5" />} label="Gengs" to="/the-geng" />
            <NavItem icon={<Globe className="w-5 h-5" />} label="Collabos" to="/collabos" />
          </nav>
        </div>
        <div className="px-6 py-8 border-t border-gray-100">
          <NavItem icon={<Settings className="w-5 h-5" />} label="Settings" to="/settings" />
          <NavItem icon={<LogOut className="w-5 h-5" />} label="Logout" to="/logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-down">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome, {user ? `${user.firstName} ${user.lastName}` : 'Mayowa'}!
            </h2>
            <p className="text-gray-500 mt-1">Let's make today count</p>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.firstName?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="space-y-8">
          {/* Quick Stats */}
          {!isNewUser ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up">
              <StatCard title="Active Projects" value="0" trend="up" />
              <StatCard title="Pending Tasks" value="0" trend="down" />
              <StatCard title="Study Hours" value="0" subtitle="This Week" trend="up" />
            </div>
          ) : (
            <GetStartedCard />
          )}

          {/* Dashboard Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">New Activity</h3>
              <div className="space-y-4">
                {[
                  { icon: <MessageSquare />, text: "New message from Dr. Smith", time: "5m ago" },
                  { icon: <Calendar />, text: "Study group meeting scheduled", time: "1h ago" },
                  { icon: <Book />, text: "New resource added to Mathematics", time: "2h ago" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg text-blue-500">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{activity.text}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Resources */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Insights</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Book />, title: "Study Materials" },
                  { icon: <Video />, title: "Video Lectures" },
                  { icon: <Users />, title: "Study Groups" },
                  { icon: <GraduationCap />, title: "Campus News" }
                ].map((resource, index) => (
                  <button key={index} className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                    <div className="text-blue-500 mb-2 transform group-hover:scale-110 transition-transform">
                      {resource.icon}
                    </div>
                    <h4 className="font-medium text-gray-900">{resource.title}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, trend, subtitle }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        trend === 'up' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'
      }`}>
        {trend === 'up' ? '↑' : '↓'}
      </div>
    </div>
    <p className="text-3xl font-bold text-gray-900">{value}</p>
    {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
  </div>
);

export default Dashboard;