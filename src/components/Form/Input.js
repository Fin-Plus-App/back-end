import styled from 'styled-components';

export default function InputForm({ label, id, name, value, onChange, type, placeholder, minLength, required }) {
  return (
    <>
      <LabelStyle htmlFor={id}>{label}</LabelStyle>
      <InputStyle
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        required={required}
      />
    </>
  );
}

const InputStyle = styled.input``;

const LabelStyle = styled.label``;
