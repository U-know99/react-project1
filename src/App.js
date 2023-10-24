import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [dollar, setDollar] = useState();

  function onSelect(event) {
    const newSelectedCoin = event.target.value;
    setSelectedCoin(newSelectedCoin);

    // 선택한 코인을 바꾸면서 바로 계산을 수행
    convert({ target: { value: dollar } });
  }

  function convert(event) {
    const selectedCoinInfo = coins.find((coin) => coin.symbol === selectedCoin);
    const usdAmount = event.target.value;
    const converted = (usdAmount / selectedCoinInfo.quotes.USD.price).toFixed(
      3
    );

    setDollar(converted);
  }
  // 선택한 코인의 심볼

  return (
    <div>
      <h1>
        The Amazing Coin Converter!
        {loading ? "" : ` ( with ${coins.length}coins )`}
      </h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onSelect}>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}USD{" "}
            </option>
          ))}
        </select>
      )}
      <div>
        <h2>You want convert USD to {selectedCoin} </h2>
        If you have <input onChange={convert} type="number" /> USD
      </div>
      <div>You can buy {dollar}</div>
    </div>
  );
}

export default App;
