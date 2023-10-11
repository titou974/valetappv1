import style from "../input.module.css"

const Input = ({placeholder, input, setInput}) => {
  return (
    <div className="w-full my-10">
      <label className={style.customField}>
        <input onChange={(e) => setInput(e.target.value)} type="text" required></input>
        <span className={style.placeholder}>{placeholder}<span className="text-primary">*</span></span>
      </label>
    </div>
  )
}

export default Input;
