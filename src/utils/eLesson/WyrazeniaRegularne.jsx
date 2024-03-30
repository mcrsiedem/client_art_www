
999,99
const re = /^\d{0,3}(?:\,\d{0,2}){0,1}$/;


// const re = /^[a-zA-Z0-9_+\sZąćęłńóśźżĄĘŁŃÓŚŹŻ]+$/;
if ( event.target.value === '' || re.test(event.target.value)) {
setDaneZamowienia({...daneZamowienia, cena: event.target.value});
setSaveButtonDisabled(false)
}