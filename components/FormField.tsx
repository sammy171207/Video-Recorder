import React from 'react'

const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  as = 'input',
  options = [],
}: FormFieldProps) => {
const InputToRender = (type: string) => {
  if (as === 'textarea') {
    return (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded p-2"
      />
    );
  } else if (as === 'select') {
    return (
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full border rounded p-2"
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border rounded p-2"
      />
    );
  }
};

  return (
    <div className='form-field'>
        <label htmlFor={id}>{label}</label>
       {InputToRender(type)}
    </div>
  )
}

export default FormField