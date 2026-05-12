import { useEffect, createContext, useState } from "react";

export const ZamowienieContext = createContext();
export const ZamowienieContextProvider = ({ children }) => {


  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 50,
    totalPages: 0,
    total: 0
  });

    const [widok, setWidok] = useState({
    kolumna: "nr",
    kierunek: "asc",
    widok: "Bieżące", // używamy ID z tablicy _widokZamowien
    klientId: 0,
    opiekunId: 0,
  });

const updatePagination = (updates) => {
    setPagination((prev) => ({
      ...prev,
      ...updates,
      // Jeśli zmieniamy filtr lub sortowanie, zazwyczaj chcemy wrócić na 1. stronę
      // currentPage: updates.currentPage || (updates.pageSize ? prev.currentPage : 1),
    }));
  };



  const updateWidok = (updates) => {
    setWidok((prev) => ({
      ...prev,
      ...updates
      // Jeśli zmieniamy filtr lub sortowanie, zazwyczaj chcemy wrócić na 1. stronę
      // currentPage: updates.currentPage || (updates.pageSize ? prev.currentPage : 1),
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };


  // useEffect(() => {
  //   console.log(pagination.kolumna)
  //   console.log(pagination.kierunek)
  //   console.log(pagination.widok)
  //   console.log(`Opiekun:  ${pagination.opiekunId}`)
  //   console.log(`Klient:  ${pagination.klientId}`)
  // }, [pagination]);

  return (
    <ZamowienieContext.Provider
      value={{
   _widokZamowien,handlePageChange,
      updatePagination,  pagination, setPagination,widok,updateWidok

      }}
    >
      {children}
    </ZamowienieContext.Provider>
  );
};

  const _widokZamowien = [
        {
      id:0,
      nazwa: "Bieżące",
    },
            {
      id:1,
      nazwa: "Przed drukiem",
    },
    {
      id: 2,
      nazwa: "Harmonogram",
    },
    {
      id: 3,
      nazwa: "Wydrukowane",
    },
    {
      id: 4,
      nazwa: "Sfalcowane",
    },
    
    {
      id: 5,
      nazwa: "Oprawione",
    },
    
    {
      id: 6,
      nazwa: "Oddane",
    },

        {
      id: 7,
      nazwa: "Anulowane",
    },
    {
      id: 8,
      nazwa: "Wszystkie",
    }
  ,
    {
      id: 9,
      nazwa: "Proofy",
    },
  ];
