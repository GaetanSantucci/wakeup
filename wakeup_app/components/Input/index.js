import './input.scss'

const Input = ({ id, type, label, value, onChangeValue }) => {
  console.log('value: ', value);

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