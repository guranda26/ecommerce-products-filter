import React, { useState } from "react";
import styled from "styled-components";
import { BiSolidPhoneCall } from "react-icons/bi";
import Image from "next/image";
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import GlobalStyles from "../styles/GlobalStyles";
import cartImage from "../icons/shopping-cart.svg";
import { HeaderProps } from "../interfaces/HeaderProps";

const MainNav = styled.div`
  padding: 10px 0;
  background-color: var(--background-color);
  @media (max-width: 1024px) {
    display: none;
  }
`;

const AnotherNav = styled.div`
  padding: 10px 0;
  background-color: #f2f2f2;
`;

const MainNavElements = styled.ul`
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  &:first-of-type {
    justify-content: flex-end;
  }
  &:last-of-type {
    justify-content: flex-end;
  }

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const HeaderList = styled.li`
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  opacity: 0.7;
  &:hover {
    color: #fff;
    opacity: 1;
  }
  &:first-child {
    justify-self: flex-start;
    margin-right: auto;
    opacity: 1;
  }
  &:first-child:hover {
    transform: scale(1.01);
  }

  @media (max-width: 1024px) {
    font-size: 10px;
  }
`;

const PhoneIcon = styled.span`
  display: flex;
  width: 20px;
  height: 20px;
  background-color: #fff;
  opacity: 0.8;
  border-radius: 3px;
  color: var(--background-color);
  align-items: center;
  justify-content: center;
`;

const PhoneElement = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 1024px) {
    gap: 5px;
    span {
      font-size: 10px;
    }
  }
`;

const NavigationText = styled.span`
  font-size: 17px;
  color: #fff;
  opacity: 0.9;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavigationGrid = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`;

const Navigation = styled.a`
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background-color: var(--background-color);
  box-shadow: 0px 2px 10px 0px #0000001a;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 460px;
  height: 40px;
  border: 1px solid #ec5e2a80;
  border-radius: 12px;
  padding: 0 20px 0 40px;
  position: relative;
  box-shadow: 0px 2px 10px 0px #0000001a;

  &::placeholder {
    font-size: 14px;
    color: #000000cc;
    opacity: 0.8;
    font-weight: bold;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SearchIcon = styled.div`
  width: 24px;
  height: 24px;
  color: #ec5e2a;
  position: absolute;
  top: 25%;
  left: 15px;

  @media (max-width: 1024px) {
    position: static;
    color: #000;
  }
`;

const NavContainer = styled.a`
  display: inline-block;
  width: 130px;
  height: 40px;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0px 2px 10px 0px #0000001a;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);

  &:hover {
    background-color: rgb(255, 255, 255);
  }

  @media (max-width: 1024px) {
    width: auto;
    padding: 0 10px;
    background-color: transparent;
    box-shadow: none;
    span {
      display: none;
    }
  }
`;

const ProfileNavContainer = styled(NavContainer)`
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;

  @media (max-width: 1024px) {
    justify-content: center;
    align-items: center;
  }
`;

const LogoImage = styled.a`
  justify-self: flex-start;
`;

const LogoImgList = styled.li`
  margin-right: auto;
`;

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  // const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Prevent default form submission behavior
  //   handleSearch(searchQuery); // Call handleSearch with the search query
  // };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault(); // Prevent default form submission
  //     handleSearch(searchQuery); // Call handleSearch with the search query
  //   }
  // };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Redirect to the search page with the search query
    // if (query.trim() !== "") {
    //   router.push(`/search/${encodeURIComponent(query)}`);
    // }
  };

  return (
    <nav>
      <GlobalStyles />
      <MainNav>
        <MainNavElements>
          <GlobalStyles />
          <HeaderList>
            <PhoneElement href="#">
              <PhoneIcon>
                <BiSolidPhoneCall />
              </PhoneIcon>
              <span>*7007 / +995 (32) 2 60 30 60</span>
            </PhoneElement>
          </HeaderList>
          <HeaderList>
            <a href="#">ონლაინ განვადება</a>
          </HeaderList>
          <HeaderList>
            <a href="#">ფილიალები</a>
          </HeaderList>
          <HeaderList>
            <a href="#">ყველა აქცია</a>
          </HeaderList>
        </MainNavElements>
      </MainNav>
      <AnotherNav>
        <MainNavElements>
          <LogoImgList>
            <LogoImage href="#">
              <Image
                src="/assets/logo.png"
                alt="logo"
                width={151}
                height={40}
                priority
              />
            </LogoImage>
          </LogoImgList>
          <li>
            <Navigation href="#">
              <NavigationGrid>
                <TfiLayoutGrid3Alt />
              </NavigationGrid>
              <NavigationText>ნავიგაცია</NavigationText>
            </Navigation>
          </li>
          <li>
            <SearchContainer>
              <form>
                <SearchInput
                  type="search"
                  placeholder="ძიება"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <SearchIcon>
                  <CiSearch size={24} />
                </SearchIcon>
              </form>
            </SearchContainer>
          </li>
          <li>
            <NavContainer href="#">
              <Image src={cartImage} alt="button-icon" width={24} height={24} />
              <span style={{ fontSize: "14px" }}>კალათა</span>
            </NavContainer>
          </li>
          <li>
            <ProfileNavContainer>
              <CgProfile size={24} />
              <span style={{ fontSize: "14px" }}>პროფილი</span>
            </ProfileNavContainer>
          </li>
        </MainNavElements>
      </AnotherNav>
    </nav>
  );
};

export default Header;
