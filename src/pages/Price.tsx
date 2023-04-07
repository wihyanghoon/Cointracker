
import styled from "styled-components";

type propTypes = {
  priceData:
     {
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
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
          };
        };
      } | undefined

}

function Price({ priceData }: propTypes) {
  return (
    <>
      <Overview>
        <OverviewItem>
          <span>last_updated:</span>
          <span>{priceData?.last_updated}</span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>rank:</span>
          <span>{priceData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
          <span>volume_24h:</span>
          <span>{priceData?.quotes.USD.volume_24h}</span>
        </OverviewItem>
      </Overview>
      <Overview>
        <OverviewItem>
          <span>1시간 전:</span>
          <span>{priceData?.quotes.USD.percent_change_1h}</span>
        </OverviewItem>
        <OverviewItem>
          <span>6시간 전:</span>
          <span>{priceData?.quotes.USD.percent_change_6h}</span>
        </OverviewItem>
        <OverviewItem>
          <span>12시간 전:</span>
          <span>{priceData?.quotes.USD.percent_change_12h}</span>
        </OverviewItem>
        <OverviewItem>
          <span>24시간 전:</span>
          <span>{priceData?.quotes.USD.percent_change_24h}</span>
        </OverviewItem>
      </Overview>
    </>
  );
}

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  & + & {
    margin-top: 1rem;
  }
`;
const OverviewItem = styled.div`
  flex: 1;
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

export default Price;