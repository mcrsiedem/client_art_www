//----------------------------------------------------------------------------------


      const promiseA = new Promise((resolve, reject) => {
        if (procesyElementowTech.length == grupaWykonan.length) {
          resolve("OK");
        } else {
          reject("Dodaj procesy");
        }
      });
      promiseA
        .then((res) => setSaveButtonDisabled(false))
        .catch(function (rej) {
          //here when you reject the promise
          alert(rej);
          console.log(rej);
        });


