import { useState } from 'react';
import { IoPersonOutline, IoMailOutline, IoCallOutline, IoLocationOutline } from 'react-icons/io5';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: 'Chammie Margaret R. Quimora',
    position: 'SK Chairwoman',
    email: 'chammie.quimora@sk.gov.ph',
    contact: '09123456789',
    barangay: 'Masagui',
    address: 'Barangay Masagui, [City/Municipality]'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Future API call: updateAdminProfile(profile)
    // axios.put('/api/admin/profile', profile)
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
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account profile and information.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center mb-4">
              <IoPersonOutline className="w-16 h-16 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.position}</p>
            <div className="mt-4 w-full pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">Barangay {profile.barangay}</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <Input
                  name="position"
                  value={profile.position}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={IoLocationOutline}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
