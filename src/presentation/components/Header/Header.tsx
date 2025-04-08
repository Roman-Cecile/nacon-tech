import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="text-purple-500 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-white text-2xl font-bold">Nacon LiveOps</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <span className="text-gray-400 mr-6">
            Plateforme de gestion des jeux
          </span>
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="text-white hover:text-purple-500 transition-colors"
                >
                  Administration
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-purple-500 transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
