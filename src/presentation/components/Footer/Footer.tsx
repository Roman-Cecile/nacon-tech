/**
 * Composant de pied de page pour l'application
 */
import React from 'react';
import { useFooter } from './useFooter';

/**
 * Composant qui affiche le pied de page de l'application
 */
export const Footer: React.FC = () => {
  const { currentYear } = useFooter();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-white text-lg font-bold">Nacon LiveOps</h3>
            <p className="text-gray-400 text-sm mt-1">
              Plateforme de gestion des jeux vidéo
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              <span className="sr-only">Support</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12a3 3 0 106 0 3 3 0 00-6 0z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              <span className="sr-only">Documentation</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Nacon. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};
