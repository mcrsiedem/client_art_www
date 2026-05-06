import { useEffect, createContext, useState } from "react";

export const ZamowienieContext = createContext();
export const ZamowienieContextProvider = ({ children }) => {
  const [wybranyKlient, setWybranyKlient] = useState(0);
  const [wybranyOpiekun, setWybranyOpiekun] = useState(0);
  const [sortowanieZamowien, setSortowanieZamowien] = useState(0);
  const [zestawZamowien, setZestawZamowien] = useState(0);


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
   zestawZamowien, setZestawZamowien

      }}
    >
      {children}
    </ZamowienieContext.Provider>
  );
};
