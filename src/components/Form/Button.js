import styled from 'styled-components';
import LoadingButton from '../../assets/styles/LoadingButton';

export default function ButtonForm({ type, disabled, children }) {
  return (
    <ButtonContainer>
      {disabled ? (
        <ButtonStyle disabled={disabled}>
          <LoadingButton />
        </ButtonStyle>
      ) : (
        <ButtonStyle type={type} disabled={disabled}>
          {children}
        </ButtonStyle>
      )}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 2.5rem;
  border: none;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? 'cursor' : 'pointer')};
`;
