// the name of the file and folder is wrong!! you learned about component based architecture
// always start with capital letters, Crypto-tracker -> Crypto-tracker.jsx
// remove react import statement, if you are not using it otherwise you are pulling in unnecessary resources
// same here
import React, { useEffect, useState } from "react";

function CryptoTracker() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, SetSearch] = useState("");
  const controller = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "HD4q2fmEqbZlfGSnindGz2nR6j+GjA+bYGfUIPBGK20=",
        },
      };

      try {
        const response = await fetch(
          "https://openapiv1.coinstats.app/coins",
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCoins(data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      () => {
        controller.abort();
      };
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredCoins = coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filteredCoins);
  }, [search, coins]);

  const handleSearchInputChange = (e) => {
    SetSearch(e.target.value);
  };

  const priceChangeColor = (change) => {
    const changeValue = parseFloat(change);

    if (changeValue < 0) {
      return (
        <td className="text-red-500">
          <span className="flex items-center">
            <span className="mr-1">&#9660;</span>
            {change}
          </span>
        </td>
      );
    } else if (changeValue > 0) {
      return (
        <td className="text-green-500">
          <span className="flex items-center">
            <span className="mr-1">&#9650;</span>
            {change}
          </span>
        </td>
      );
    } else {
      return <td>{change}</td>;
    }
  };

  return (
    <>
      <header className="flex justify-center items-center content-center mb-32">
        <a className="logo" href="/">
          <img className="w-10" src="src/assets/Bitcoin.svg.png" alt="" />
        </a>
      </header>
      <h1 className="text-4xl font-extrabold mt-4 mb-20 text-white hover:text-gray-300">
        Check All Cryptocurrencies In One Place
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search coins..."
          className="p-2 w-96 rounded-md text-black focus:outline-none"
          value={search}
          onChange={handleSearchInputChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className=" mt-20 font-medium">
          <thead>
            <tr className="hover:bg-black text-white bg-black">
              <th>Rank</th>
              <th>Logo</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Market Cap</th>
              <th>Price</th>
              <th>Available Supply</th>
              <th>24h Volume</th>
              <th>Price hourly</th>
              <th>Price daily</th>
              <th>Price Weekly</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.rank}</td>
                <td>
                  <a href={coin.websiteUrl}>
                    <img className="w-8" src={coin.icon} alt="" />
                  </a>
                </td>
                <td>
                  <a href={coin.websiteUrl}>
                    <p className="text-orange-400">{coin.name}</p>
                  </a>
                </td>
                <td>{coin.symbol}</td>
                <td>${coin.marketCap.toFixed()}</td>
                <td>${coin.price.toFixed()}</td>
                <td>{coin.availableSupply}</td>
                <td>${coin.volume.toFixed()}</td>
                <td className="pl-8">{priceChangeColor(coin.priceChange1h)}</td>
                <td className="pl-7">{priceChangeColor(coin.priceChange1d)}</td>
                <td className="pl-8">{priceChangeColor(coin.priceChange1w)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default CryptoTracker;
