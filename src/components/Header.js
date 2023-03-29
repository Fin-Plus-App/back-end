import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { IoPersonCircle } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function Header({ page }) {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState();

  function logOut() {
    localStorage.removeItem('userData');
    setUserData({});
    navigate('/');
  }

  if (!userData || JSON.stringify(userData) === '{}') {
    return <></>;
  }

  return (
    <HeaderContainer>
      <PageName>{page}</PageName>
      <UserInfos>
        <UserName>{userData.user.name}</UserName>
        {userData.user.pictureUrl ? (
          <UserImage src={userData.user.pictureUrl} alt="avatar" />
        ) : (
          <UserAvatar>
            <IoPersonCircle />
          </UserAvatar>
        )}
        <Options onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          {menuOpen && (
            <DropdownMenuActive>
              <Option onClick={logOut}>
                <BiLogOut />
                <h3>Sair</h3>
              </Option>
            </DropdownMenuActive>
          )}
        </Options>
      </UserInfos>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 4rem;
  background: #ffffff;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const PageName = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;

const UserInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const UserImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const UserAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: #637381;
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
`;

const DropdownMenuActive = styled.div`
  width: 125px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 0;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: red;
  &::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 10px;
    height: 20px;
    width: 20px;
    background: red;
    z-index: -1;
    transform: rotate(45deg);
  }
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  margin-top: 10px;
  h3 {
    font-size: 14px;
  }
  &:hover {
    color: #d52b2b;
    cursor: pointer;
  }
`;
