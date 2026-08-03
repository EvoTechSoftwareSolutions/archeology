import React, { useState } from 'react';
import { FiBell, FiShield, FiSave } from 'react-icons/fi';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    name: 'Evo Tech',
    email: 'admin@heritage.lk',
    phone: '+94 77 123 4567',
    location: 'Colombo, Sri Lanka',
    notifications: true,
    twoFactorAuth: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full font-['Inter'] pb-12">
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Home &gt; Settings</p>
        <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-1 tracking-tight">Account Settings</h1>
        <p className="text-gray-500 text-sm">Update your profile, security, and notification preferences.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-3xl bg-[#1E5646] text-white flex items-center justify-center text-2xl font-bold shadow-sm">EV</div>
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#2a2a2a]">Personal Information</h2>
              <p className="text-sm text-gray-500">Edit your display name, email, contact, and location details.</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Name</span>
              <input
                value={settings.name}
                onChange={e => handleChange('name', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#1E4538] focus:ring-2 focus:ring-[#1E4538]/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</span>
              <input
                type="email"
                value={settings.email}
                onChange={e => handleChange('email', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#1E4538] focus:ring-2 focus:ring-[#1E4538]/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</span>
              <input
                type="tel"
                value={settings.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#1E4538] focus:ring-2 focus:ring-[#1E4538]/20"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Location</span>
              <input
                value={settings.location}
                onChange={e => handleChange('location', e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#1E4538] focus:ring-2 focus:ring-[#1E4538]/20"
              />
            </label>
          </div>

          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-[#FCFDFB] p-5">
              <div className="flex items-center gap-3 mb-3 text-[#1E4538]">
                <FiShield size={18} />
                <h3 className="font-semibold text-gray-900">Security</h3>
              </div>
              <p className="text-sm text-gray-600">Manage login security and protect your administrator account.</p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={e => handleChange('twoFactorAuth', e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[#275949] transition-colors"></div>
                    <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-[#FCFDFB] p-5">
              <div className="flex items-center gap-3 mb-3 text-[#1E4538]">
                <FiBell size={18} />
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <p className="text-sm text-gray-600">Choose how the platform notifies you about important activity.</p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email alerts</p>
                    <p className="text-xs text-gray-500">Receive email updates for new activity.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={e => handleChange('notifications', e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-[#275949] transition-colors"></div>
                    <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#1E4538] px-6 py-3 text-sm font-semibold text-white hover:bg-[#15342a] transition-colors shadow-sm">
            <FiSave size={18} /> Save Changes
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-3xl bg-[#1E5646] text-white flex items-center justify-center text-xl font-bold">S</div>
            <div>
              <h3 className="text-xl font-semibold text-[#2a2a2a]">Account summary</h3>
              <p className="text-sm text-gray-500">Your current account and security preferences at a glance.</p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="rounded-3xl border border-gray-200 bg-[#FBFBFB] px-5 py-4">
              <p className="font-medium text-gray-900">User</p>
              <p>{settings.name}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#FBFBFB] px-5 py-4">
              <p className="font-medium text-gray-900">Email</p>
              <p>{settings.email}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#FBFBFB] px-5 py-4">
              <p className="font-medium text-gray-900">Notifications</p>
              <p>{settings.notifications ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-[#FBFBFB] px-5 py-4">
              <p className="font-medium text-gray-900">Two-factor auth</p>
              <p>{settings.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
