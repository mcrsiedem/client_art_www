
export  function wagaArkuszy (arkusz_szerokosc,arkusz_wysokosc,gramatura,przeloty) {
          let waga = parseInt(arkusz_szerokosc)/1000 * parseInt(arkusz_wysokosc)/1000 * parseInt(gramatura)/1000 * parseInt(przeloty)
          return Math.ceil(waga)
        }
