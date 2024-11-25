import { useState } from "react";

function useForm<T>(initialValues: T) {
  const [formValues, setFormValues] = useState<T>(initialValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setFormValues(
      {
        ...formValues,
        [event.target.name]: event.target.value,
      }
    );
  }

  const resetFormValues = () => {
    setFormValues(initialValues);
  }

  return { formValues, handleInputChange, resetFormValues, setFormValues };
}

export default useForm;