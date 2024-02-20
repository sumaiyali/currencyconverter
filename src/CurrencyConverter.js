import './orig_css_som.css';
import { Country_List } from './orig_countries';
import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('GBP');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);

  const getExchangeRate = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/3c636dd19d597956949312c3/latest/${fromCurrency}`);
      const result = await response.json();
      const rate = result.conversion_rates[toCurrency];
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  }; 

  useEffect(() => {
    // Fetch exchange rate when component mounts
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleCurrencyChange = (e, isFromCurrency) => {
    const currency = e.target.value;
    if (isFromCurrency) {
      setFromCurrency(currency);
    } else {
      setToCurrency(currency);
    }
  };

  const handleSwapCurrencies = () => {
    // Swap fromCurrency and toCurrency
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Fetch new exchange rate
    getExchangeRate();
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <form>
        <div className="amount">
          <label htmlFor="amount">Amount</label>
          <input type="text" id="amount" value={amount} onChange={handleAmountChange} />
        </div>
        <div className="convert-box">
          <div className="from">
            <label htmlFor="fromCurrency">From</label>
            <div className="select-input">
              <img src={`https://flagcdn.com/48x36/${Country_List[fromCurrency].toLowerCase()}.png`} alt={`${fromCurrency} Flag`} />
              <select id="fromCurrency" value={fromCurrency} onChange={(e) => handleCurrencyChange(e, true)}>
                {Object.keys(Country_List).map((curCode) => (
                  <option key={curCode} value={curCode}>{curCode}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="swap-button reverse" onClick={handleSwapCurrencies}>
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="to">
            <label htmlFor="toCurrency">To</label>
            <div className="select-input">
              <img src={`https://flagcdn.com/48x36/${Country_List[toCurrency].toLowerCase()}.png`} alt={`${toCurrency} Flag`} />
              <select id="toCurrency" value={toCurrency} onChange={(e) => handleCurrencyChange(e, false)}>
                {Object.keys(Country_List).map((curCode) => (
                  <option key={curCode} value={curCode}>{curCode}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="result">
            {exchangeRate !== null ? `${amount} ${fromCurrency} = ${(amount * exchangeRate).toFixed(2)} ${toCurrency}` : 'Getting exchange rate...'}
          </div>
          <button type="button" onClick={getExchangeRate}>Get Exchange Rate</button>
        </div>
      </form>
    </div>
  );
};

export default CurrencyConverter;