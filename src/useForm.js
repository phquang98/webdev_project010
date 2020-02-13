// This is a custom hook that will be used for a form
import React, { useState } from "react";

function useForm(iniVal) {
  const [formValue, setFormValue] = useState(iniVal); // set the state initial value to the arg of this custom hook

  return [
    formValue,
    event => {
      console.log("name here", event.target.name);
      console.log("value here", event.target.value);
      setFormValue({
        ...formValue, // keep all the data from the state
        [event.target.name]: event.target.value
        /* 
        - why need to wrap inside a bracket []
        - why use event.target.name here 
        - why when input has name email and password, it works; but when changed to like emailCustom and passwordCustom, it did not work anymore
        */
      });
    }
  ]; // return an arr as normal hooks also returns an arr, 1st ele is the state itself, 2nd ele 7
}

export default useForm;
