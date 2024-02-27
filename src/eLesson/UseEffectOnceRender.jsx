const effectRan = useRef(false);
useEffect(() => {
  if (effectRan.current === true) {
    // console.log("value: "+ value)
 //   console.log("Test tokenu"+ token.token)
    //console.log("Test pojedynczego rendera Header")
  }
  return () => {
    effectRan.current = true;
  };
}, []);