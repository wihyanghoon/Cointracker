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
  useEffect(() => {
    console.log(data);
  }, []);
  // const [coins, setCoins] = useState<CoinTypes[]>([]);
  // const [loading, setLoading] = useState(true);
  // // 즉시 실행 함수 실행
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <Header>
        <Title>Tracker</Title>
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
                    state: { name: coin.name },
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
  overflow: auto;
  button {
    background-color: #3498db;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    float: right;
    margin-bottom: 10px;
  }
`;

const Coin = styled.li`
  background-color: #ffffff;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
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
  }
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 25px;
  margin-right: 10px;
`;

const CoinList = styled.div``;

const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.accentColor};
  height: 100px;
  line-height: 100px;
  font-size: 60px;
`;

export default Coins;
