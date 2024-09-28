import style from '../styles/input.module.css';

const Input = ({ placeholder, input, setInput }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <div className='w-full'>
      <label className={style.customFieldNewPassword}>
        <input
          value={input}
          onChange={handleInputChange}
          type={placeholder === 'Numéro de Téléphone' ? 'tel' : 'text'}
          required
        ></input>
        <span className={style.placeholder}>
          {placeholder}
          <span className='text-primary'>*</span>
        </span>
      </label>
    </div>
  );
};

export default Input;
