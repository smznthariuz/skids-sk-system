import React, { useState, useEffect } from 'react';
import { 
  IoPersonOutline, 
  IoMailOutline, 
  IoCallOutline, 
  IoLocationOutline,
  IoCalendarOutline,
  IoBriefcaseOutline,
  IoBookOutline,
  IoCheckmarkCircleOutline,
  IoPencilOutline,
  IoSaveOutline,
  IoCloseOutline,
  IoCameraOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoMaleFemaleOutline,
  IoSchoolOutline,
  IoCheckboxOutline,
  IoFlagOutline,
  IoTimeOutline,
  IoInformationCircleOutline,
  IoShieldCheckmarkOutline,
  IoMapOutline,
  IoBusinessOutline,
  IoDocumentTextOutline,
  IoReaderOutline
} from 'react-icons/io5';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import skLogo from '../../assets/images/sk.svg';

const UserProfile = () => {
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');

  // Full Profile State - Matches KK Survey Questionnaire
  const [profile, setProfile] = useState({
    respondentNo: '',
    date: '',
    lastName: '',
    firstName: '',
    middleName: '',
    suffix: '',
    region: '',
    province: '',
    municipality: '',
    barangay: '',
    purokZone: '',
    sex: '',
    age: '',
    email: '',
    birthday: '',
    contactNo: '',
    civilStatus: '',
    youthClassification: [],
    workStatus: '',
    youthAgeGroup: '',
    educationalBackground: '',
    isSKVoter: '',
    votedLastSK: '',
    isNationalVoter: '',
    timesVoted: '',
    attendedKKAssembly: '',
    whyNotAttend: '',
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('youthProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error loading profile:', e);
      }
    }
    
    if (user) {
      setProfile(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      }));
    }

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setImagePreview(savedImage);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setProfile(prev => ({
          ...prev,
          [name]: [...prev[name], value]
        }));
      } else {
        setProfile(prev => ({
          ...prev,
          [name]: prev[name].filter(item => item !== value)
        }));
      }
    } else if (type === 'radio') {
      setProfile(prev => ({ ...prev, [name]: value }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        localStorage.setItem('profileImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      localStorage.setItem('youthProfile', JSON.stringify(profile));
      setSuccessMessage('Profile saved successfully!');
      setIsEditing(false);
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      alert('Error saving profile: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: IoPersonOutline },
    { id: 'contact', label: 'Contact Details', icon: IoCallOutline },
    { id: 'location', label: 'Location', icon: IoLocationOutline },
    { id: 'demographic', label: 'Demographic', icon: IoPeopleOutline },
    { id: 'voter', label: 'Voter Info', icon: IoCheckboxOutline },
  ];

  const getSectionStyles = (sectionId) => {
    const styles = {
      personal: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        inputBg: 'bg-blue-50/50',
        active: 'bg-blue-600 text-white',
        inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      },
      contact: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        iconBg: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        inputBg: 'bg-emerald-50/50',
        active: 'bg-emerald-600 text-white',
        inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      },
      location: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        inputBg: 'bg-purple-50/50',
        active: 'bg-purple-600 text-white',
        inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      },
      demographic: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        inputBg: 'bg-orange-50/50',
        active: 'bg-orange-600 text-white',
        inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      },
      voter: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        inputBg: 'bg-red-50/50',
        active: 'bg-red-600 text-white',
        inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      },
    };
    return styles[sectionId] || styles.personal;
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Logo Watermark */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
        <img 
          src={skLogo} 
          alt="SK Logo" 
          className="w-[800px] h-[800px] object-contain"
        />
      </div>

      <div className="relative z-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Complete your personal information profile</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
            <IoCheckmarkCircleOutline className="w-5 h-5 text-green-600" />
            {successMessage}
          </div>
        )}

        {/* Profile Header Card */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <IoPersonOutline className="w-12 h-12 text-white" />
                )}
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition border border-gray-200">
                    <IoCameraOutline className="w-4 h-4 text-blue-600" />
                    <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800">
                {profile.firstName || 'Your'} {profile.lastName || 'Name'}
              </h2>
              <p className="text-gray-600">
                {profile.age ? `${profile.age} years old` : 'Age not set'} • {profile.sex || 'Gender not set'}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <IoShieldCheckmarkOutline className="w-3 h-3" />
                  {profile.civilStatus || 'Status not set'}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                  <IoHomeOutline className="w-3 h-3" />
                  {profile.barangay || 'Barangay not set'}
                </span>
                {profile.isSKVoter === 'Yes' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <IoCheckboxOutline className="w-3 h-3" />
                    SK Voter
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {!isEditing ? (
                <Button 
                  variant="primary" 
                  onClick={() => setIsEditing(true)} 
                  className="flex items-center gap-2 px-6 py-2.5"
                >
                  <IoPencilOutline className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsEditing(false)} 
                    className="flex items-center gap-2 px-4 py-2.5"
                  >
                    <IoCloseOutline className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button 
                    variant="success" 
                    onClick={handleSave} 
                    disabled={isSubmitting} 
                    className="flex items-center gap-2 px-6 py-2.5"
                  >
                    <IoSaveOutline className="w-4 h-4" />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map((section) => {
            const Icon = section.icon;
            const styles = getSectionStyles(section.id);
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  activeSection === section.id
                    ? styles.active + ' shadow-md'
                    : styles.inactive
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>

        {/* Profile Form - All Sections */}
        <Card className="p-6 shadow-sm">
          {/* Section 1: Personal Information */}
          {activeSection === 'personal' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3">
                <span className="p-2 bg-blue-100 rounded-lg">
                  <IoPersonOutline className="w-5 h-5 text-blue-600" />
                </span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                  <Input
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoPersonOutline}
                    placeholder="Enter first name"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                  <Input
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoPersonOutline}
                    placeholder="Enter last name"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Middle Name</label>
                  <Input
                    name="middleName"
                    value={profile.middleName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoPersonOutline}
                    placeholder="Enter middle name"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Suffix</label>
                  <Input
                    name="suffix"
                    value={profile.suffix}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoPersonOutline}
                    placeholder="Jr., Sr., III"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Age <span className="text-red-500">*</span></label>
                  <Input
                    name="age"
                    type="number"
                    value={profile.age}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoCalendarOutline}
                    placeholder="Enter age"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Sex <span className="text-red-500">*</span></label>
                  <select
                    name="sex"
                    value={profile.sex}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition duration-200"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Birthday</label>
                  <Input
                    name="birthday"
                    type="date"
                    value={profile.birthday}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoCalendarOutline}
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Contact Details */}
          {activeSection === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3">
                <span className="p-2 bg-emerald-100 rounded-lg">
                  <IoCallOutline className="w-5 h-5 text-emerald-600" />
                </span>
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <Input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoMailOutline}
                    placeholder="email@example.com"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number</label>
                  <Input
                    name="contactNo"
                    value={profile.contactNo}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoCallOutline}
                    placeholder="09xx-xxx-xxxx"
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Location */}
          {activeSection === 'location' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3">
                <span className="p-2 bg-purple-100 rounded-lg">
                  <IoLocationOutline className="w-5 h-5 text-purple-600" />
                </span>
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Region</label>
                  <Input
                    name="region"
                    value={profile.region}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoLocationOutline}
                    placeholder="Enter region"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Province</label>
                  <Input
                    name="province"
                    value={profile.province}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoMapOutline}
                    placeholder="Enter province"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Municipality</label>
                  <Input
                    name="municipality"
                    value={profile.municipality}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoBusinessOutline}
                    placeholder="Enter municipality"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Barangay</label>
                  <Input
                    name="barangay"
                    value={profile.barangay}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoHomeOutline}
                    placeholder="Enter barangay"
                    className="bg-white"
                  />
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Purok / Zone</label>
                  <Input
                    name="purokZone"
                    value={profile.purokZone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    icon={IoLocationOutline}
                    placeholder="Enter purok or zone"
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Demographic Information */}
          {activeSection === 'demographic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3">
                <span className="p-2 bg-orange-100 rounded-lg">
                  <IoPeopleOutline className="w-5 h-5 text-orange-600" />
                </span>
                Demographic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Civil Status <span className="text-red-500">*</span></label>
                  <select
                    name="civilStatus"
                    value={profile.civilStatus}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition duration-200"
                  >
                    <option value="">Select civil status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Separated">Separated</option>
                    <option value="Annulled">Annulled</option>
                    <option value="Live-in">Live-in</option>
                  </select>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Status</label>
                  <select
                    name="workStatus"
                    value={profile.workStatus}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition duration-200"
                  >
                    <option value="">Select work status</option>
                    <option value="Employed">Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Currently looking for a job">Currently looking for a job</option>
                    <option value="Not interested in looking for a job">Not interested in looking for a job</option>
                  </select>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Youth Age Group</label>
                  <select
                    name="youthAgeGroup"
                    value={profile.youthAgeGroup}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition duration-200"
                  >
                    <option value="">Select age group</option>
                    <option value="Child Youth (15-17 yrs. old)">Child Youth (15-17 yrs. old)</option>
                    <option value="Core Youth (18-24 yrs. old)">Core Youth (18-24 yrs. old)</option>
                    <option value="Young Adult (25-30 yrs. old)">Young Adult (25-30 yrs. old)</option>
                  </select>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Educational Background <span className="text-red-500">*</span></label>
                  <select
                    name="educationalBackground"
                    value={profile.educationalBackground}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition duration-200"
                  >
                    <option value="">Select educational background</option>
                    <option value="Elementary Undergraduate">Elementary Undergraduate</option>
                    <option value="Elementary Graduate">Elementary Graduate</option>
                    <option value="High school undergraduate">High school undergraduate</option>
                    <option value="High school graduate">High school graduate</option>
                    <option value="Vocational graduate">Vocational graduate</option>
                    <option value="College undergraduate">College undergraduate</option>
                    <option value="College graduate">College graduate</option>
                    <option value="Masters level">Masters level</option>
                    <option value="Masters graduate">Masters graduate</option>
                    <option value="Doctorate level">Doctorate level</option>
                    <option value="Doctorate graduate">Doctorate graduate</option>
                  </select>
                </div>
              </div>

              {/* Youth Classification */}
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Youth Classification</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['In School Youth', 'Out of School Youth', 'Working Youth', 'Person w/Disability', 'Children in Conflict w/Law', 'Indigenous People', 'Youth w/Specific Needs'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-gray-700">
                      <input 
                        type="checkbox" 
                        name="youthClassification" 
                        value={type} 
                        checked={profile.youthClassification.includes(type)}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Voter Information */}
          {activeSection === 'voter' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 border-b border-gray-200 pb-3">
                <span className="p-2 bg-red-100 rounded-lg">
                  <IoCheckboxOutline className="w-5 h-5 text-red-600" />
                </span>
                Voter Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registered SK Voter?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input 
                        type="radio" 
                        name="isSKVoter" 
                        value="Yes" 
                        checked={profile.isSKVoter === 'Yes'}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-red-600"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input 
                        type="radio" 
                        name="isSKVoter" 
                        value="No" 
                        checked={profile.isSKVoter === 'No'}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-red-600"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voted last SK election?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input 
                        type="radio" 
                        name="votedLastSK" 
                        value="Yes" 
                        checked={profile.votedLastSK === 'Yes'}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-red-600"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input 
                        type="radio" 
                        name="votedLastSK" 
                        value="No" 
                        checked={profile.votedLastSK === 'No'}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-red-600"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registered National Voter?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input 
                        type="radio" 
                        name="isNationalVoter" 
                        value="Yes" 
                        checked={profile.isNationalVoter === 'Yes'}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-red-600"
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input 
                        type="radio" 
                        name="isNationalVoter" 
                        value="No" 
                        checked={profile.isNationalVoter === 'No'}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-4 h-4 text-red-600"
                      />
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">Have you already attended KK Assembly?</label>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input 
                      type="radio" 
                      name="attendedKKAssembly" 
                      value="Yes" 
                      checked={profile.attendedKKAssembly === 'Yes'}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-4 h-4 text-red-600"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input 
                      type="radio" 
                      name="attendedKKAssembly" 
                      value="No" 
                      checked={profile.attendedKKAssembly === 'No'}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-4 h-4 text-red-600"
                    />
                    No
                  </label>
                </div>

                {/* If Yes, how many times */}
                <div className="mt-3 pt-3 border-t border-red-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">If Yes, how many times</label>
                  <div className="flex flex-wrap gap-4">
                    {['1-2 times', '3-4 times', '5 times & above'].map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm text-gray-700">
                        <input 
                          type="radio" 
                          name="timesVoted" 
                          value={option} 
                          checked={profile.timesVoted === option}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-4 h-4 text-red-600"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                {/* If No, Why */}
                {profile.attendedKKAssembly === 'No' && (
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">If No, Why?</label>
                    <select
                      name="whyNotAttend"
                      value={profile.whyNotAttend}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition duration-200"
                    >
                      <option value="">Select reason</option>
                      <option value="There was no KK Assembly">There was no KK Assembly</option>
                      <option value="Not interested to Attend">Not interested to Attend</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Profile Completion */}
        <Card className="p-4 mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <IoInformationCircleOutline className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Profile Completion</p>
                <div className="flex items-center gap-2">
                  <div className="w-40 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(
                          (Object.values(profile).filter(v => v && v !== '' && v.length > 0).length / 
                          Object.values(profile).length) * 100, 100
                        )}%` 
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {Math.round(
                      (Object.values(profile).filter(v => v && v !== '' && v.length > 0).length / 
                      Object.values(profile).length) * 100
                    )}%
                  </span>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {Object.values(profile).filter(v => v && v !== '' && v.length > 0).length} of {Object.values(profile).length} fields completed
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;