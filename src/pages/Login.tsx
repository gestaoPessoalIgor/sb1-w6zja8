import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-500 to-violet-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo ao GestPess</h1>
          <p className="text-gray-600">Entre para gerenciar suas finanças</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow"
              placeholder="Digite seu email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-shadow"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 text-white p-3 rounded-xl font-medium hover:bg-violet-700 transition-colors"
          >
            Entrar
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Ou continue com</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Chrome className="w-5 h-5 text-gray-700" />
          <span className="text-gray-700 font-medium">Entrar com Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Não tem uma conta?{' '}
          <a href="#" className="text-violet-600 font-medium hover:text-violet-700">
            Criar Conta
          </a>
        </p>
      </div>
    </div>
  );
}