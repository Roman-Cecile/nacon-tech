/**
 * Hook personnalisé pour le composant Footer
 */
export const useFooter = () => {
  // Ce hook est simple car le composant Footer n'a pas de logique complexe
  // Mais nous le créons pour maintenir une structure cohérente
  
  const getCurrentYear = () => new Date().getFullYear();
  
  return {
    currentYear: getCurrentYear()
  };
};