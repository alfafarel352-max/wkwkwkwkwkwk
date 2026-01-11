
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  BookOpen, 
  MessageSquare, 
  Upload as UploadIcon, 
  User as UserIcon, 
  LogOut,
  Terminal,
  FolderOpen,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { User } from './types';
import { mockBackend } from './services/mockBackend';

// Pages
import HomePage from './pages/Home';
import LearnPage from './pages/Learn';
import QnAPage from './pages/QnA';
import UploadPage from './pages/Upload';
import LoginPage from './pages/Login';
import FilesPage from './pages/Files';

const Navbar = ({ user, onLogout }: { user: User | null, onLogout: () => void }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent italic">
                AllLabz
              </span>
            </Link>
            
            <div className="hidden lg:flex items-baseline space-x-2">
              {[
                { name: 'Home', path: '/', icon: HomeIcon },
                { name: 'Belajar', path: '/learn', icon: BookOpen },
                { name: 'Tanya Jawab', path: '/qna', icon: MessageSquare },
                { name: 'File Vault', path: '/files', icon: FolderOpen },
                { name: 'Share', path: '/upload', icon: UploadIcon },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive(item.path)
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-black uppercase">
                    {user.username.charAt(0)}
                  </div>
                  <span className="text-slate-200 text-sm font-bold">
                    {user.username}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all border border-slate-700"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-xl shadow-blue-900/40"
              >
                <UserIcon className="w-4 h-4" />
                Masuk
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await mockBackend.getCurrentUser();
      setUser(currentUser);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (u: User) => setUser(u);
  const handleLogout = async () => {
    await mockBackend.logout();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-slate-400 font-bold animate-pulse">Menghubungkan ke Secure Backend...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 selection:bg-blue-500/30">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/qna" element={<QnAPage user={user} />} />
            <Route path="/files" element={<FilesPage />} />
            <Route 
              path="/upload" 
              element={user ? <UploadPage user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
