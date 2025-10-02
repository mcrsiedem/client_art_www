import React, { useRef } from 'react';

const SimplePrintTextarea = () => {
    const textareaRef = useRef(null);

    const handlePrint = () => {
        // 1. Sprawdzenie, czy element istnieje
        if (!textareaRef.current) return;

        // 2. Pobieramy zawartość pola
        const contentToPrint = textareaRef.current.value;

        // 3. Otwieramy nowe, tymczasowe okno
        const printWindow = window.open('', '', 'height=600,width=800');
        
        // --- Manipulacja DOM w nowym oknie ---
        
        // 4. Tworzymy główny element dla treści (np. <pre>)
        const preElement = printWindow.document.createElement('pre');
        
        // Ustawiamy tekst z textarea. Tekst musi być w węźle tekstowym.
        const textNode = printWindow.document.createTextNode(contentToPrint);
        preElement.appendChild(textNode);

        // 5. Opcjonalnie: Ustawiamy styl dla czytelności (CSS)
        preElement.style.fontFamily = 'Arial, sans-serif';
        preElement.style.whiteSpace = 'pre-wrap';
        preElement.style.margin = '20px';

        // 6. Czyścimy i dodajemy treść do <body>
        printWindow.document.body.innerHTML = '';
        printWindow.document.body.appendChild(preElement);
        
        // 7. Ustawiamy tytuł
        printWindow.document.title = 'Wydruk zawartości pola';

        // --- Drukowanie ---

        // 8. Wywołujemy natychmiastowe drukowanie
        // printWindow.print();
        
        // printWindow.close(); // Opcjonalnie: zamknięcie okna po wydruku
    };

    return (
        <div>   
            <textarea
                ref={textareaRef}
                rows="10"
                cols="50"
                placeholder="Wpisz tekst..."
                defaultValue="Nowoczesny wydruk z użyciem metod DOM."
            />
            <br />
            
            <button onClick={handlePrint}>
                Drukuj (bez document.write)
            </button>

 
        </div>
    );
};

export default SimplePrintTextarea;