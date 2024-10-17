import React from 'react';
import { Link } from 'react-router-dom';
import {
  Camera, Book, Archive, Video, MessageSquare, CheckSquare, Calendar, Newspaper, 
  Briefcase, Users, Globe, UserPlus, GraduationCap, Users as UsersIcon, BarChart, Bell, Settings, LogOut
} from 'lucide-react';
import { useUser } from '../../contexts/UserContext';


const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex bg-white text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 flex flex-col justify-between h-screen">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold mb-6">LearnHub</h1>
          <nav className="flex flex-col space-y-4">
            <NavItem icon={<BarChart />} label="Dashboard" to="/" />
            <NavItem icon={<Book />} label="Documents" to="/documents" />
            <NavItem icon={<Video />} label="Video Conferencing" to="/video" />
            <NavItem icon={<MessageSquare />} label="Chats" to="/chats" />
            <NavItem icon={<CheckSquare />} label="Tasks" to="/tasks" />
            <NavItem icon={<Calendar />} label="Calendar" to="/calendar" />
            <NavItem icon={<Users />} label="Study Groups" to="/groups" />
            <NavItem icon={<Globe />} label="Collabos" to="/collabos" />
          </nav>
        </div>
        <div className="px-6 py-8 border-t border-gray-800">
          <NavItem icon={<Settings />} label="Settings" to="/settings" />
          <NavItem icon={<LogOut />} label="Logout" to="/logout" />
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Welcome, {user ? `${user.firstName} ${user.lastName}` : 'User'}</h2>
            <p className="text-gray-400">Here’s what’s happening today</p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
              <Bell className="w-6 h-6 text-white" />
            </button>
            <button className="bg-gray-700 p-3 rounded-full hover:bg-gray-600">
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>
        </header>

        {/* Stats & KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StatCard title="Active Projects" value="12" />
          <StatCard title="Pending Tasks" value="5" />
          <StatCard title="Upcoming Meetings" value="3" />
        </section>

        {/* Dashboard Widgets */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <DashboardSection
              title="Colleges"
              items={[
                { icon: <Newspaper className="h-6 w-6" />, name: "College News" },
                { icon: <Briefcase className="h-6 w-6" />, name: "Career Hunt" },
                { icon: <Users className="h-6 w-6" />, name: "Study Groups by College" },
                { icon: <Globe className="h-6 w-6" />, name: "Inter-College Collabos" },
              ]}
            />
            <DashboardSection
              title="Gengs"
              items={[
                { icon: <UsersIcon className="h-6 w-6" />, name: "The Geng" },
                { icon: <UserPlus className="h-6 w-6" />, name: "Join the Geng" },
                { icon: <GraduationCap className="h-6 w-6" />, name: "Peer Tutors" },
                { icon: <Users className="h-6 w-6" />, name: "Collabo with The Geng" },
              ]}
            />
          </div>

          {/* Activity Feed */}
          <div className="bg-gray-100 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Activity Feed</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-gray-700 p-2 rounded-full">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm">You have a new message from <strong>Dr. Smith</strong>.</p>
                  <p className="text-xs text-black">5 minutes ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-gray-700 p-2 rounded-full">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm"><strong>Math 101</strong> assignment is due tomorrow.</p>
                  <p className="text-xs text-black">10 minutes ago</p>
                </div>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-gray-700 p-2 rounded-full">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm">New event: <strong>Study Group Meeting</strong> at 2 PM today.</p>
                  <p className="text-xs text-gray-400">30 minutes ago</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

// Reusable Components
const NavItem = ({ icon, label, to }) => (
  <Link to={to} className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded-lg">
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

const StatCard = ({ title, value }) => (
  <div className="bg-gray-800 p-6 rounded-lg">
    <h4 className="text-lg font-semibold text-gray-300 mb-2">{title}</h4>
    <p className="text-4xl font-bold text-white">{value}</p>
  </div>
);

const DashboardSection = ({ title, items }) => (
  <div className="bg-gray-100 p-6 rounded-lg">
    <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-center space-x-3">
          <div className="bg-gray-700 p-2 rounded-full">
            {item.icon}
          </div>
          <span className="text-sm font-medium">{item.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
