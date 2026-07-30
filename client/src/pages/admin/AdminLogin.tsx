import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiArrowRight } from 'react-icons/fi';
import loginImage from '../../assets/Admin/LoginImage.png';
import logo from '../../assets/Admin/logo2.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Temporarily bypassing backend auth since DB is down
      /*
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      */
      
      // Force redirect to dashboard for now
      navigate('/admin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA]">
      {/* Left side: Image and Text overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <img 
          src={loginImage} 
          alt="Sigiriya Heritage" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        {/* Gradient overlay to make text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        
        {/* Text content at bottom left */}
        <div className="absolute bottom-16 left-16 right-16 text-white z-10">
          <h1 className="text-5xl font-['Playfair_Display'] font-bold leading-tight mb-5">
            Preserving Sri Lanka's<br/>Heritage Digitally
          </h1>
          <p className="text-gray-300 text-base font-['Inter'] leading-relaxed max-w-md">
            A Unified Platform For The Department Of Archaeology, Royal College Colombo & HEJ Ceylon To Catalogue, Protect And Share The Island's Living History.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 relative bg-[#F8F6F1]">
        
        {/* Top Logo */}
        <div className="absolute top-5">
          <img src={logo} alt="Sri Lanka Heritage Logo" className="h-[4.5rem] object-contain" />
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[28rem] bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 mt-20">
          
          {/* Admin Login Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-[1px] w-12 bg-[#B98E3A]/40"></div>
            <h2 className="mx-4 text-[#B98E3A] font-semibold tracking-[0.15em] text-xs uppercase">Admin Login</h2>
            <div className="h-[1px] w-12 bg-[#B98E3A]/40"></div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h3 className="text-[1.75rem] font-['Playfair_Display'] font-bold text-gray-900 mb-2">
              Welcome Back, Admin
            </h3>
            <p className="text-gray-500 text-sm font-['Inter']">
              Sign In To The Heritage Administration Console.
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm font-['Inter'] text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div>
              <label className="block text-gray-800 font-medium text-[15px] mb-2 font-['Inter']">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiMail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@heritage.lk"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E5646]/50 focus:border-[#1E5646] transition-colors placeholder:text-gray-400 text-gray-700 font-['Inter'] text-[15px]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-gray-800 font-medium text-[15px] font-['Inter']">Password</label>
                <a href="#" className="text-xs text-[#D97757] hover:text-[#c46142] transition-colors font-medium">Forget Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <FiLock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E5646]/50 focus:border-[#1E5646] transition-colors placeholder:text-gray-400 text-gray-700 font-['Inter'] tracking-widest text-[15px]"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiEye size={18} />
                </button>
              </div>
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center">
              <div className="relative flex items-center">
                 <input 
                   type="checkbox" 
                   id="remember"
                   className="peer appearance-none w-5 h-5 border border-gray-300 rounded bg-white checked:bg-[#275949] checked:border-[#275949] cursor-pointer transition-all focus:ring-2 focus:ring-[#275949]/50 focus:outline-none"
                   defaultChecked
                 />
                 <svg className="absolute w-3 h-3 text-white pointer-events-none left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
              <label htmlFor="remember" className="ml-2.5 text-xs font-semibold text-gray-800 cursor-pointer font-['Inter'] tracking-wide">
                Keep Me signed in
              </label>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-[#1c4437] opacity-70' : 'bg-[#275949] hover:bg-[#1c4437]'} text-white font-medium text-[15px] py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_14px_0_rgb(39,89,73,0.39)] mt-2`}
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
            </button>
            
          </form>

          {/* Copyright */}
          <div className="mt-8 pt-4 text-center">
            <p className="text-[7px] text-gray-400 font-['Inter']">
              @2026 Heritage Sri Lanka - All Right Reserved
            </p>
          </div>

          {/* Back to Website Link */}
          
        <div className="mt-2 ml-25 text-[13px] text-gray-800 font-['Inter'] font-semibold">
          Login To Main Website - <Link to="/" className="text-[#275949] hover:underline font-bold">Click Here</Link>
        </div>
          
        </div>

        

      </div>
    </div>
  );
};

export default AdminLogin;
