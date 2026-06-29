import React, { useState } from 'react';
import { IoPersonOutline, IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Juan Dela Cruz',
    age: '18',
    gender: 'Male',
    email: 'juan.delacruz@email.com',
    contact: '09123456789',
    barangay: 'Masagui',
    civilStatus: 'Single',
    voterStatus: 'Registered',
    workStatus: 'Student'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Future API call: updateUserProfile(profile)
    // axios.put('/api/user/profile', profile)
    //   .then(() => {
    //     setIsEditing(false);
    //   })
    //   .catch(error => console.error('Error updating profile:', error));

    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">View and manage your personal information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <IoPersonOutline className="w-16 h-16 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.age} years old</p>
            <div className="mt-4 w-full pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Barangay {profile.barangay}</p>
              <p className="text-sm text-gray-600">{profile.voterStatus}</p>
            </div>
          </div>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            {!isEditing ? (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="success" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={IoPersonOutline}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <Input
                  name="age"
                  type="number"
                  value={profile.age}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={IoPersonOutline}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={IoMailOutline}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <Input
                  name="contact"
                  value={profile.contact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={IoCallOutline}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Barangay</label>
                <Input
                  name="barangay"
                  value={profile.barangay}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  icon={IoLocationOutline}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
                <select
                  name="civilStatus"
                  value={profile.civilStatus}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Status</label>
                <select
                  name="workStatus"
                  value={profile.workStatus}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-50"
                >
                  <option value="Student">Student</option>
                  <option value="Employed">Employed</option>
                  <option value="Unemployed">Unemployed</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;