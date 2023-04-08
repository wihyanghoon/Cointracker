import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

type CoinTypes = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
};

const Coins = () => {
  const { isLoading, data } = useQuery<CoinTypes[]>("getCoins", fetchCoins);
  const setter = useSetRecoilState(isDarkAtom);

  return (
    <Container>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Header>
        <Logo src={`${process.env.PUBLIC_URL}/icon-help-80d774cbc542f81b887e0a968d1bbb98.svg`} alt="" />
        <Title>Coin Tracker</Title>
        <button onClick={() => setter((prev) => !prev)}>Mode</button>
      </Header>
      <CoinList>
        {isLoading
          ? "is loading..."
          : data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name , logoSrc: String(coin.symbol)},
                  }}
                >
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
      </CoinList>
    </Container>
  );
};

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  button {
    background: ${props => props.theme.bgColor};
    box-shadow:  ${props => props.theme.boxShadowNone};
    color: ${(props) => props.theme.textColor};
    border: none;
    padding: 10px 20px;
    margin-bottom: 30px;
    border-radius: 10px;

    &:hover{
      box-shadow:  ${props => props.theme.boxShadowClick}
    }
  }
`;

const Logo = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  margin: 20px auto 0px auto;
`

const Coin = styled.li`
  background: ${props => props.theme.bgColor};
  box-shadow:  ${props => props.theme.boxShadowNone};
  margin-bottom: 30px;
  border-radius: 15px;
  transition: background 0.2s ease-in;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    box-shadow:  ${props => props.theme.boxShadowClick}
  }
`;

const Img = styled.img`
  width: 25px;
  margin-right: 10px;
`;

const CoinList = styled.div``;

const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.textColor};
  height: 100px;
  line-height: 100px;
  font-size: 60px;
`;

export default Coins;
