import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

const DraggableResizableDiv = ({ containerRef }) => {
    // Stan komponentu
    const [position, setPosition] = useState({ x: 50, y: 50 }); // Początkowa pozycja
    const [size, setSize] = useState({ width: 200, height: 150 }); // Początkowy rozmiar
    const [isDragging, setIsDragging] = useState(false); // Czy element jest przeciągany
    const [isResizing, setIsResizing] = useState(null); // Czy element jest zmieniany rozmiar (np. 'br', 'bl', 'tr', 'tl')
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // Przesunięcie kursora względem rogu elementu podczas przeciągania
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 }); // Początkowa pozycja kursora podczas zmiany rozmiaru
    const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 }); // Oryginalna pozycja podczas zmiany rozmiaru
    const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 }); // Oryginalny rozmiar podczas zmiany rozmiaru

    // Ref do samego elementu DraggableResizableDiv
    const divRef = useRef(null);

    // Funkcja rozpoczynająca przeciąganie
    const handleMouseDown = useCallback((e) => {
        if (e.target.dataset.resize) return; // Jeśli kliknięto uchwyt do zmiany rozmiaru, nie rozpoczynaj przeciągania

        setIsDragging(true);
        // Oblicz przesunięcie kursora względem lewego górnego rogu elementu
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        e.stopPropagation(); // Zapobiegaj propagacji zdarzenia do kontenera
    }, [position]);

    // Funkcja rozpoczynająca zmianę rozmiaru
    const handleResizeMouseDown = useCallback((e) => {
        setIsResizing(e.target.dataset.resize); // Ustaw typ zmiany rozmiaru (np. 'br' - bottom right)
        setResizeStart({ x: e.clientX, y: e.clientY });
        setOriginalPosition({ x: position.x, y: position.y });
        setOriginalSize({ width: size.width, height: size.height });
        e.stopPropagation(); // Ważne: zapobiegaj rozpoczęciu przeciągania
    }, [position, size]);

    // Funkcja obsługująca ruch myszy (przeciąganie i zmiana rozmiaru)
    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            // Oblicz nową pozycję, uwzględniając offset i granice kontenera
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const divRect = divRef.current.getBoundingClientRect();

                // Ograniczenia dla X
                let finalX = Math.max(0, newX);
                finalX = Math.min(finalX, containerRect.width - divRect.width);

                // Ograniczenia dla Y
                let finalY = Math.max(0, newY);
                finalY = Math.min(finalY, containerRect.height - divRect.height);

                setPosition({ x: finalX, y: finalY });
            }
        } else if (isResizing) {
            const dx = e.clientX - resizeStart.x;
            const dy = e.clientY - resizeStart.y;

            let newWidth = originalSize.width;
            let newHeight = originalSize.height;
            let newX = originalPosition.x;
            let newY = originalPosition.y;

            switch (isResizing) {
                case 'br': // Bottom Right
                    newWidth = originalSize.width + dx;
                    newHeight = originalSize.height + dy;
                    break;
                case 'bl': // Bottom Left
                    newWidth = originalSize.width - dx;
                    newHeight = originalSize.height + dy;
                    newX = originalPosition.x + dx;
                    break;
                case 'tr': // Top Right
                    newWidth = originalSize.width + dx;
                    newHeight = originalSize.height - dy;
                    newY = originalPosition.y + dy;
                    break;
                case 'tl': // Top Left
                    newWidth = originalSize.width - dx;
                    newHeight = originalSize.height - dy;
                    newX = originalPosition.x + dx;
                    newY = originalPosition.y + dy;
                    break;
                case 'r': // Right
                    newWidth = originalSize.width + dx;
                    break;
                case 'l': // Left
                    newWidth = originalSize.width - dx;
                    newX = originalPosition.x + dx;
                    break;
                case 'b': // Bottom
                    newHeight = originalSize.height + dy;
                    break;
                case 't': // Top
                    newHeight = originalSize.height - dy;
                    newY = originalPosition.y + dy;
                    break;
                default:
                    break;
            }

            // Minimalne rozmiary
            newWidth = Math.max(50, newWidth);
            newHeight = Math.max(50, newHeight);

            // Ograniczenia do kontenera
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const currentDivRect = divRef.current.getBoundingClientRect();

                // Sprawdzenie, czy nowa pozycja + nowy rozmiar nie wykracza poza kontener
                if (newX < 0) {
                    newWidth += newX; // Zmniejsz szerokość, aby pozostać w granicach
                    newX = 0;
                }
                if (newY < 0) {
                    newHeight += newY; // Zmniejsz wysokość, aby pozostać w granicach
                    newY = 0;
                }

                if (newX + newWidth > containerRect.width) {
                    newWidth = containerRect.width - newX;
                }
                if (newY + newHeight > containerRect.height) {
                    newHeight = containerRect.height - newY;
                }
            }

            setPosition({ x: newX, y: newY });
            setSize({ width: newWidth, height: newHeight });
        }
    }, [isDragging, isResizing, dragOffset, resizeStart, originalPosition, originalSize, position, size, containerRef]);

    // Funkcja kończąca przeciąganie/zmianę rozmiaru
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(null);
    }, []);

    // Dodaj i usuń globalne event listenery
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    return (
        <div
            ref={divRef}
            style={{
                position: 'absolute', // Ważne dla pozycjonowania w obrębie kontenera
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid grey',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none', // Zapobiega zaznaczaniu tekstu podczas przeciągania
                boxSizing: 'border-box', // Upewnij się, że padding i border są wliczone w szerokość/wysokość
            }}
            onMouseDown={handleMouseDown}
        >
            {/* Przesuń i zmień rozmiar! */}

            {/* Uchwyty do zmiany rozmiaru */}
            <div className="resizer top-left" data-resize="tl" onMouseDown={handleResizeMouseDown}></div>
            <div className="resizer top-right" data-resize="tr" onMouseDown={handleResizeMouseDown}></div>
            <div className="resizer bottom-left" data-resize="bl" onMouseDown={handleResizeMouseDown}></div>
            <div className="resizer bottom-right" data-resize="br" onMouseDown={handleResizeMouseDown}></div>
            <div className="resizer top" data-resize="t" onMouseDown={handleResizeMouseDown}></div>
            <div className="resizer bottom" data-resize="b" onMouseDown={handleResizeMouseDown}></div>
            <div className="resizer left" data-resize="l" onMouseDown={handleResizeMouseDown}></div>
            <div className="resizer right" data-resize="r" onMouseDown={handleResizeMouseDown}></div>
        </div>
    );
};

export default DraggableResizableDiv;