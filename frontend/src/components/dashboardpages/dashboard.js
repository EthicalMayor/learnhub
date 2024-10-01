import React from 'react';
import { Camera, Book, Archive, Video, MessageSquare, CheckSquare, Calendar, Newspaper, Briefcase, Users, Globe, UserPlus, GraduationCap, Users as UsersIcon } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">LearnHub Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <DashboardSection title="Product" items={[
                { icon: <Book className="h-6 w-6" />, name: "Documents" },
                { icon: <Archive className="h-6 w-6" />, name: "Resource Vault" },
                { icon: <Video className="h-6 w-6" />, name: "Video Conferencing" },
                { icon: <MessageSquare className="h-6 w-6" />, name: "Chats" },
                { icon: <CheckSquare className="h-6 w-6" />, name: "Tasks" },
                { icon: <Calendar className="h-6 w-6" />, name: "Calendars" },
              ]} />
              
              <DashboardSection title="Colleges" items={[
                { icon: <Newspaper className="h-6 w-6" />, name: "College News" },
                { icon: <Briefcase className="h-6 w-6" />, name: "Career Hunt" },
                { icon: <Users className="h-6 w-6" />, name: "Study Groups by College" },
                { icon: <Globe className="h-6 w-6" />, name: "Inter-College Collabos" },
              ]} />
              
              <DashboardSection title="Gengs" items={[
                { icon: <UsersIcon className="h-6 w-6" />, name: "The Geng" },
                { icon: <UserPlus className="h-6 w-6" />, name: "Join the Geng" },
                { icon: <GraduationCap className="h-6 w-6" />, name: "Peer Tutors" },
                { icon: <Users className="h-6 w-6" />, name: "Collabo with The Geng" },
              ]} />
              
              <DashboardSection title="Quick Links" items={[
                { icon: <Camera className="h-6 w-6" />, name: "Request a Demo" },
                { icon: <MessageSquare className="h-6 w-6" />, name: "Chat" },
              ]} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DashboardSection = ({ title, items }) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <div className="mt-5">
          <ul className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <li key={index} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <a href="#" className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                      View
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;