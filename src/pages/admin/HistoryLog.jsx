import { useState, useEffect } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Input from '../../components/common/Input';
import { getActivityLog } from '../../utils/mockData';

const HistoryLog = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Future API call: fetchActivityLog()
    // axios.get('/api/admin/history')
    //   .then(response => setLogs(response.data))
    //   .catch(error => console.error('Error fetching activity log:', error));

    const data = getActivityLog();
    setLogs(data);
  }, []);

  const columns = [
    { key: 'user', header: 'User' },
    { key: 'action', header: 'Action' },
    { key: 'details', header: 'Details' },
    { key: 'date', header: 'Date & Time' }
  ];

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">History Log</h1>
        <p className="text-gray-500 mt-1">Track all admin activities and system changes.</p>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={IoSearchOutline}
          />
        </div>
        <Table
          columns={columns}
          data={filteredLogs}
          emptyMessage="No activity logs found."
        />
      </Card>
    </div>
  );
};

export default HistoryLog;
