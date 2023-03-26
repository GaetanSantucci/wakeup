import './input.scss'

const Input = ({ id, type, label, value, onChangeValue }) => {

  return (
    <input
      id={id}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChangeValue}
      required
    />
  )
}

export default Input;