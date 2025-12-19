import React from 'react'

const InputField = ({ label, id, type = 'text', ...rest }) => {
  return (
    <label style={{display: 'flex', flexDirection: 'column', gap: '6px'}} htmlFor={id}>
      <span style={{fontSize: '14px', color: '#00d4ff', fontWeight: '500'}}>{label}</span>
      <input 
        id={id} 
        name={id} 
        type={type} 
        {...rest}
        style={{
          padding: '0.75rem',
          backgroundColor: '#1a2a42',
          color: '#e0e0e0',
          border: '1px solid #00d4ff',
          borderRadius: '4px',
          fontFamily: 'inherit',
          fontSize: '1rem',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          ...rest.style
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#00ffff'
          e.target.style.boxShadow = '0 0 8px rgba(0, 212, 255, 0.5)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#00d4ff'
          e.target.style.boxShadow = 'none'
        }}
      />
    </label>
  )
}

export default InputField
