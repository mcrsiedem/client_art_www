import React, { useContext } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import style from "./FormToPDF.module.css";
import { TechnologyContext } from 'context/TechnologyContext';
// Używamy tylko standardowych stylów
const styles = StyleSheet.create({
  page: { padding: 30 },
  text: { fontSize: 12, marginBottom: 10 }
});


const SimpleDoc = ({ data }) => (
    
  <Document>
    <Page style={styles.page} size="A4" orientation="landscape">
      <View>
        <Text>Karta Technologiczna</Text>
        <Text>{   data.daneTech.klient}</Text>
        <Text>{   data.daneTech.tytul}</Text>
     
        {/* <Text>Name: {data?.name || 'Empty'}</Text> */}
      </View>
    </Page>
  </Document>
);

const FormToPdf = () => {
  const [formData, setFormData] = React.useState({ name: 'Jan Kowalski' });
    const techContext = useContext(TechnologyContext);

  return (
    <div style={{ padding: 50 }}>
      {/* <h1>Generator PDF</h1> */}
      
      <PDFDownloadLink 
        document={<SimpleDoc  data={techContext} />} 
        fileName="test.pdf"
      >
        {({ loading, error }) => {
          if (error) return `Błąd: ${error.message}`;
        //   return loading ? 'Generowanie...' : 'Pobierz teraz';
          return loading ? 'Generowanie...' : <button className={style.btn} > PDF</button>;
        }}
      </PDFDownloadLink>
    </div>
  );
};

export default FormToPdf;