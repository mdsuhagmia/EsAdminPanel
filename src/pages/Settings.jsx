import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Globe } from 'lucide-react'; // আইকনের জন্য lucide-react ব্যবহার করা হয়েছে

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Settings</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* বাম দিকের সাইডবার বা ট্যাব মেনু */}
        <div className="w-full md:w-64 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <User size={20} /> Profile Details
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'security' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Lock size={20} /> Security & Password
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'notifications' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            <Bell size={20} /> Notifications
          </button>
        </div>

        {/* ডান দিকের কন্টেন্ট এরিয়া */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          
          {/* প্রোফাইল সেটিংস ট্যাব */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 border-b pb-2">Edit Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Full Name</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Enter name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email Address</label>
                  <input type="email" className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed" value="admin@example.com" disabled />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio / Description</label>
                  <textarea rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Tell something about admin..."></textarea>
                </div>
              </div>
              <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">Save Changes</button>
            </div>
          )}

          {/* সিকিউরিটি ট্যাব */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 border-b pb-2">Change Password</h2>
              <div className="max-w-md flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input type="password" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input type="password" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input type="password" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition w-fit">Update Password</button>
              </div>
            </div>
          )}

          {/* নোটিফিকেশন ট্যাব */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 border-b pb-2">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive emails about new user registration</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-indigo-600 cursor-pointer" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-gray-500">Get notified about suspicious login attempts</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 accent-indigo-600 cursor-pointer" defaultChecked />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;