// NewWindowPortal.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const NewWindowPortal = ({ children, title = 'Nowe Okno React', initialSize = 'width=600,height=400',setShowPortal }) => {
  const [containerEl, setContainerEl] = useState(null);
  const [newWindow, setNewWindow] = useState(null);

  // Funkcja Kopiująca Style
  const copyStyles = (sourceDoc, targetDoc) => {
    // Kopiuj wszystkie <link> (dla zewnętrznych CSS, np. z CDN)
    Array.from(sourceDoc.querySelectorAll('link[rel="stylesheet"]'))
      .forEach(link => {
        targetDoc.head.appendChild(link.cloneNode(true));
      });

    // Kopiuj wszystkie <style> (KLUCZOWE dla CSS Modules i CSS-in-JS)
    Array.from(sourceDoc.querySelectorAll('style'))
      .forEach(style => {
        targetDoc.head.appendChild(style.cloneNode(true));
      });
  };

  

  useEffect(() => {
    // 1. Otwórz nowe okno
    const win = window.open('', '', initialSize);
    if (!win) {
      console.error('Nie udało się otworzyć nowego okna.');
      return;
    }
    setNewWindow(win);

    // 2. Przygotuj DOM w nowym oknie
    win.document.title = title;

    // 3. SKOPIUJ STYLE Z GŁÓWNEGO DOKUMENTU
    copyStyles(document, win.document);

    // 4. Utwórz kontener, do którego będzie renderowany komponent React
    const container = win.document.createElement('div');
    container.id = 'react-new-window-root';
    win.document.body.appendChild(container);
    setContainerEl(container);

    // 5. Obsłuż zamknięcie i czyszczenie
    const handleClose = () => {
      setShowPortal(false)
        // Możesz tutaj wykonać dodatkowe czyszczenie stanu w komponencie nadrzędnym
    };
    win.addEventListener('beforeunload', handleClose);

    return () => {
      win.removeEventListener('beforeunload', handleClose);
      if (win && !win.closed) {
        win.close();
      }
    };


  }, [initialSize, title]);

  if (!containerEl) {
    return null;
  }

  // Użyj React.createPortal
  return ReactDOM.createPortal(
    children,
    containerEl
  );
};

export default NewWindowPortal;