import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import './input.css';

const Input = ({ label, type, value, onChange, placeholder, label , type }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
      type={type == 'password' ? showPassword ? 'text' : 'password' :type}
        placeholder={placeholder}
        className='w-full bg-transparent outline-none'
      value={value}
      onChange={(e) => onChange(e)}
    />
    {type === 'password' && (
        <>
        {showPassword ? (
            <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={() => toggleShowPassword()}
            />
        ) : (
            <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={() => toggleShowPassword()}
            />
        )}
        </>
    )}
    </div>
  )
}

export default Input

