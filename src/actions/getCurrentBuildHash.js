export function getCurrentBuildHash() {
  // Wyszukaj wszystkie tagi script
  const scripts = document.getElementsByTagName('script');
  
  // Przejrzyj tagi w poszukiwaniu pliku main.<hash>.js
  for (const script of scripts) {
    const src = script.getAttribute('src');
    
    // Sprawdź, czy src pasuje do wzorca (np. /static/js/main.12345.js)
    if (src && src.includes('main.') && src.endsWith('.js')) {
      // Wyciągnij część zawierającą hash
      const fileName = src.substring(src.lastIndexOf('/') + 1); // np. main.12345.js
      
      // Użyj wyrażenia regularnego, aby wyłuskać sam hash (np. 12345)
      const match = fileName.match(/main\.([a-f0-9]+)\.js/i); 

      if (match && match[1]) {
        // match[1] to grupa przechwytująca, czyli sam hash
        return match[1]; 
      }
    }
  }
  return null;
}