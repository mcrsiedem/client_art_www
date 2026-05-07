import { useEffect, createContext, useState } from "react";

export const ZamowienieContext = createContext();
export const ZamowienieContextProvider = ({ children }) => {
  const [wybranyKlient, setWybranyKlient] = useState(0);
  const [wybranyOpiekun, setWybranyOpiekun] = useState(0);
  const [sortowanieZamowien, setSortowanieZamowien] = useState(0);
  const [widokZamowien,setWidokZamowien] = useState(0);


  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 50,
    total: 0,
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
  };


  useEffect(() => {}, []);

  return (
    <ZamowienieContext.Provider
      value={{
   wybranyKlient, setWybranyKlient,
   wybranyOpiekun, setWybranyOpiekun,
   sortowanieZamowien, setSortowanieZamowien,
   _widokZamowien,widokZamowien,setWidokZamowien,handlePageChange,pagination, setPagination

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
