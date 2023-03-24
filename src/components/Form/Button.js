import styled from 'styled-components';

export default function ButtonForm({ type, disabled, children }) {
  return (
    <ButtonStyle type={type} disabled={disabled}>
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button``;
