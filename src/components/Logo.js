import styled from 'styled-components';

export default function Logo() {
  return (
    <div>
      <LogoName>
        <p>fin</p>
        <DynamicText>ance</DynamicText>
        <p>+</p>
      </LogoName>
    </div>
  );
}

const LogoName = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: 'Alkatra', cursive;
  font-weight: 400;
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const DynamicText = styled.p`
  animation-timing-function: linear;
  animation: hideText 1.5s 1s both;

  @keyframes hideText {
    from {
      width: 100%;
    }
    to {
      width: 0%;
      overflow: hidden;
    }
  }
`;
