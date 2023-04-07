import React, { useEffect, useState } from "react";
import { Route, Switch, useLocation, useParams, Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query"
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Helmet from "react-helmet"
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

type RouterTypes = {
  name: string,
};

type ParamsTypes = {
  coinId: string,
};

type infoTypes = {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
  contract: string,
  platform: string,
  contracts: object,
  logo: string,
  description: string,
  message: string,
  open_source: boolean,
  started_at: string,
  development_status: string,
  hardware_wallet: boolean,
  proof_type: string,
  org_structure: string,
  hash_algorithm: string,
  links_extended: object,
  first_data_at: string,
  last_data_at: string,
}

type priceTypes = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string,
      ath_price: number,
      market_cap: number,
      market_cap_change_24h: number,
      percent_change_1h: number,
      percent_change_1y: number,
      percent_change_6h: number,
      percent_change_7d: number,
      percent_change_12h: number,
      percent_change_15m: number,
      percent_change_24h: number,
      percent_change_30d: number,
      percent_change_30m: number,
      percent_from_price_ath: number,
      price: number,
      volume_24h: number,
      volume_24h_change_24h: number,
    };
  };
}

const Coin = () => {

  const { coinId } = useParams<ParamsTypes>();
  const { state } = useLocation<RouterTypes>();
  const chartMatch = useRouteMatch("/:coinId/chart")
  const priceMatch = useRouteMatch("/:coinId/price")
  const setter = useSetRecoilState(isDarkAtom)
  const {isLoading: infoLoading, data: infoData} = useQuery<infoTypes>(["info", coinId], () => fetchCoinInfo(coinId))
  const {isLoading: priceLoading, data: priceData} = useQuery<priceTypes>(
    ["price", coinId],
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 10000
    }
    )

  const loading = infoLoading || priceLoading
  return (
    <Container>
      <Helmet>
        <title>{state?.name || "Loading"}</title>
      </Helmet>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
        <button onClick={() => setter((prev) => !prev)}>Mode</button>
      </Header>
      {loading ? 
        "Loading..."
       : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{priceData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price priceData={priceData} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId}/>
            </Route>
          </Switch>

          <Button value="뒤로가기">
            <Link to="/">뒤로가기</Link>
          </Button>
        </>)
        }
    </Container>
)}

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

const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.accentColor};
  height: 100px;
  line-height: 100px;
  font-size: 60px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 20px;
  text-align: justify;
  color: ${(props) => props.theme.textColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  padding: 10px 14px;
  border-radius: 10px;
`

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export default Coin;
