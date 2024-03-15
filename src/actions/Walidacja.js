function isNumberWalidation(value) {

    var expression = /^[0-9]+$/;
    if (value === '' || value.test(expression)) {
        return true
    } else{return false}

    
  }

  export {isNumberWalidation}


