import style from "../styles/input.module.css"

const InputTicket = ({input, setInput}) => {

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    // If the placeholder indicates this is the phone input, validate the phone number
  };

  return (
    <div className="w-full">
      <label className={style.customFieldEmail}>
        <input value={input} onChange={handleInputChange} type="email" required></input>
        <span className={style.placeholder}>Email<span className="text-tertiary">*</span></span>
      </label>
    </div>
  )
}

export default InputTicket;
