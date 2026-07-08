import { useNavigate } from 'react-router-dom';
import { IoShieldCheckmarkOutline, IoPersonOutline } from 'react-icons/io5';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 flex items-center justify-center px-4 py-10 overflow-hidden">
      <div className="w-full max-w-4xl">
        {/* Header with SK Text - White Circle Background */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl flex items-center justify-center mb-4">
              <span className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-tight">
                SK
              </span>
            </div>
            <span className="text-4xl font-bold tracking-tight">
              <span className="text-yellow-400">SK</span>
              <span className="text-blue-50">IDS</span>
            </span>
            <p className="text-m text-blue-100/70 max-w-md mx-auto">
              Sangguniang Kabataan Information Dissemination System
            </p>
          </div>
        </div>

        {/* Access Type Selection */}
        <div className="text-center mb-10">
          <h2 className="text-xl font-semibold text-white">Select your access type to continue</h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* User Login Card */}
          <div 
            className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer group"
            onClick={() => navigate('/user-login')}  // ← UPDATED
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors mb-4">
                <IoPersonOutline className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">User Login</h3>
              <p className="text-sm text-gray-500 mb-6">
                For registered youth members. Sign in with your Google account.
              </p>
              <button className="w-full py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg shadow-blue-500/30">
                Enter as User
              </button>
            </div>
          </div>

          {/* SK Officer Login Card */}
          <div 
            className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20 cursor-pointer group"
            onClick={() => navigate('/officer-login')}  // ← UPDATED
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center group-hover:bg-yellow-100 transition-colors mb-4">
                <IoShieldCheckmarkOutline className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">SK Officer Login</h3>
              <p className="text-sm text-gray-500 mb-6">
                For authorized Sangguniang Kabataan officers only.
              </p>
              <button className="w-full py-3 text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 rounded-lg transition-colors duration-200 shadow-lg shadow-yellow-500/30">
                Enter as SK Officer
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t border-white/10">
          <p className="text-xs text-blue-200/60">
            © 2026 SKIDS — Sangguniang Kabataan Information Dissemination System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
