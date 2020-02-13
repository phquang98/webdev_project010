// This is a custom hook that will be used for a form
import React, { useState } from "react";

function useForm(iniVal) {
  const [formValue, setFormValue] = useState(iniVal); // set the state initial value to the arg of this custom hook

  return [
    formValue,
    event => {
      setFormValue({
        ...formValue, // keep all the data from the state
        [event.target.name]: event.target.value // this line modify the obj state
        /* 
        - the initial state value will be an obj { email: "", password: "" } -> 2 key/value pair here which is email: "" and password: ""
        - wrap inside a bracket to recognise it as the key inside an obj
        - use event.target.name here because we set the inputs taking data from the obj state { email: "", password: "" }
          - to test, change state obj to { emailCustom: "", passwordCustom: "" } -> now event.target.name will became emailCustom and passwordCustom
          - to work, now we need to change input name field and value field to name="emailCustom" value={formData.emailCustom} and name="passwordCustom" value={formData.passwordCustom}
        */
      });
    }
  ]; // return an arr as normal hooks also returns an arr, 1st ele is the state itself which is an obj here, 2nd ele is a func that keep all the data from the state obj and only change the key/value pair with key is the name of the input
}

export default useForm;
