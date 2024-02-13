import style from "../input.module.css"

const Input = ({placeholder, input, setInput, setPhoneAlert}) => {

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(number);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    // If the placeholder indicates this is the phone input, validate the phone number
    if (placeholder === "Numéro de Téléphone") {
      if (!validatePhoneNumber(value)) {
        setPhoneAlert(true);  // Set alert state to true if phone number is invalid
      } else {
        setPhoneAlert(false);  // Set alert state to false if phone number is valid
      }
    }
  };

  return (
    <div className="w-full">
      <label className={style.customFieldNewPassword}>
        <input value={input} onChange={handleInputChange} type={placeholder === "Numéro de Téléphone" ? "tel" : "text"} required></input>
        <span className={style.placeholder}>{placeholder}<span className="text-primary">*</span></span>
      </label>
    </div>
  )
}

export default Input;
