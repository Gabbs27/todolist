import { useRef, useEffect } from "react";


//Funcion para obtener el valor anterior de una variable 
//Se usa para focusear el valor anterior al elimiar o cambiar de foco
//Accedibility of the user with tabs.
//Utilizada actualmente en APP.JS / TODO.JS
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
