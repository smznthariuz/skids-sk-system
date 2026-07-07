import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IoSearchOutline, 
  IoAddOutline, 
  IoFilterOutline,
  IoEyeOutline,
  IoDownloadOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoCalendarOutline
} from 'react-icons/io5';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import { getYouthProfiles } from '../../utils/mockData';
import { generateYouthProfilePDF } from '../../utils/pdfGenerator';

const YouthManagement = () => {
  const navigate = useNavigate();
  const [youthData, setYouthData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYouth, setSelectedYouth] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    barangay: '',
    contact: '',
    email: '',
    gender: '',
    civilStatus: '',
    voterStatus: '',
    workStatus: ''
  });

  useEffect(() => {
    const data = getYouthProfiles();
    setYouthData(data);
  }, []);

  // Handle Row Click - Navigate to profile
  const handleRowClick = (youth) => {
    navigate(`/admin/youth/${youth.id}/profile`);
  };

  // Handle View Profile
  const handleViewProfile = (youth) => {
    navigate(`/admin/youth/${youth.id}/profile`);
  };

  // Handle Download PDF
  const handleDownloadPDF = (youth) => {
    const savedProfile = localStorage.getItem('youthProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        const fullProfile = {
          ...profile,
          firstName: youth.name?.split(' ')[0] || profile.firstName,
          lastName: youth.name?.split(' ').slice(1).join(' ') || profile.lastName,
          barangay: youth.barangay || profile.barangay,
          age: youth.age || profile.age,
          email: youth.email || profile.email,
          contactNo: youth.contact || profile.contactNo,
          sex: youth.gender || profile.sex,
          civilStatus: youth.civilStatus || profile.civilStatus,
          workStatus: youth.workStatus || profile.workStatus,
        };
        generateYouthProfilePDF(fullProfile, youth);
      } catch (error) {
        console.error('Error generating PDF:', error);
        generateYouthProfilePDF(youth, youth);
      }
    } else {
      generateYouthProfilePDF(youth, youth);
    }
  };

  // Handle Delete
  const handleDelete = (id, e) => {
    e.stopPropagation(); // Prevent row click from triggering
    if (window.confirm('Are you sure you want to delete this youth profile?')) {
      setYouthData(youthData.filter(youth => youth.id !== id));
    }
  };

  // Handle Edit
  const handleEdit = (youth, e) => {
    e.stopPropagation(); // Prevent row click from triggering
    setSelectedYouth(youth);
    setFormData(youth);
    setIsModalOpen(true);
  };

  const columns = [
    { 
      key: 'name', 
      header: 'Name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
            {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <span className="font-medium text-gray-800">{row.name}</span>
        </div>
      )
    },
    { 
      key: 'age', 
      header: 'Age',
      render: (row) => (
        <div className="flex items-center gap-1">
          <IoCalendarOutline className="w-4 h-4 text-gray-400" />
          {row.age}
        </div>
      )
    },
    { 
      key: 'barangay', 
      header: 'Barangay',
      render: (row) => (
        <div className="flex items-center gap-1">
          <IoLocationOutline className="w-4 h-4 text-gray-400" />
          {row.barangay}
        </div>
      )
    },
    { 
      key: 'contact', 
      header: 'Contact',
      render: (row) => (
        <div className="flex items-center gap-1">
          <IoCallOutline className="w-4 h-4 text-gray-400" />
          {row.contact || 'N/A'}
        </div>
      )
    },
    { 
      key: 'email', 
      header: 'Email',
      render: (row) => (
        <div className="flex items-center gap-1">
          <IoMailOutline className="w-4 h-4 text-gray-400" />
          <span className="truncate max-w-[150px]">{row.email || 'N/A'}</span>
        </div>
      )
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => handleViewProfile(row)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            title="View Full Profile"
          >
            <IoEyeOutline className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDownloadPDF(row)}
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
            title="Download PDF"
          >
            <IoDownloadOutline className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => handleEdit(row, e)}
            className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
            title="Edit"
          >
            <IoPencilOutline className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => handleDelete(row.id, e)}
            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
            title="Delete"
          >
            <IoTrashOutline className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredData = youthData.filter(youth =>
    youth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    youth.barangay.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedYouth(null);
    setFormData({
      name: '',
      age: '',
      barangay: '',
      contact: '',
      email: '',
      gender: '',
      civilStatus: '',
      voterStatus: '',
      workStatus: ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (selectedYouth) {
      setYouthData(youthData.map(y => 
        y.id === selectedYouth.id ? { ...y, ...formData } : y
      ));
    } else {
      const newYouth = {
        id: youthData.length + 1,
        ...formData
      };
      setYouthData([...youthData, newYouth]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Youth Information</h1>
          <p className="text-slate-500 mt-1">Manage and organize youth profiles in your barangay.</p>
        </div>
        <Button onClick={handleAdd} icon={IoAddOutline}>
          Add Youth Member
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by name or barangay..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={IoSearchOutline}
            />
          </div>
          <Button variant="outline" icon={IoFilterOutline}>
            Filter
          </Button>
        </div>

        {/* Table with clickable rows */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {columns.map((col, index) => (
                  <th key={index} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-4">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8 text-gray-400">
                    <IoPersonOutline className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium">No youth members found</p>
                    <p className="text-sm">Try adjusting your search or add a new member.</p>
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr 
                    key={row.id}
                    onClick={() => handleRowClick(row)}
                    className="border-b border-gray-100 hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
                  >
                    {columns.map((col, index) => (
                      <td key={index} className="py-3 px-4">
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with count */}
        {filteredData.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-400">
            <span>Showing {filteredData.length} of {youthData.length} youth members</span>
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedYouth ? 'Edit Youth Profile' : 'Add Youth Member'}
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Barangay"
            name="barangay"
            value={formData.barangay}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Civil Status</label>
            <select
              name="civilStatus"
              value={formData.civilStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Civil Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Voter Status</label>
            <select
              name="voterStatus"
              value={formData.voterStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Voter Status</option>
              <option value="Registered">Registered</option>
              <option value="Not Registered">Not Registered</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Status</label>
            <select
              name="workStatus"
              value={formData.workStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Work Status</option>
              <option value="Student">Student</option>
              <option value="Employed">Employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {selectedYouth ? 'Update' : 'Add'} Youth Member
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default YouthManagement;