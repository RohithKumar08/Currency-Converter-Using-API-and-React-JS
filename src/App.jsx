import { useState, useEffect } from 'react'
import InputBox from './Components/InputBox';

function UseCurrency(from){
  const [data, setData] = useState({});

  useEffect(() => {
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${from}.json`).then((res) => res.json()).then((res) => setData(res[from]))
  }, [from]);
  return data;
}

function App() {

  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const currencyInfo = UseCurrency(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to);
    setTo(from);
  }

  const AmountChange = (value) => {
    setAmount(value);
  };

  const CurrencyChange = (currency, type) => {
    if (type === 'from') {
      setFrom(currency);
    } else {
      setTo(currency);
    }
  };

  const convertCurrency = () => {
    if (currencyInfo[to] && Number(amount)) {
      setConvertedAmount(Number(Number(amount) * currencyInfo[to]).toFixed(2));
    }
  };

  return (
    <div className= 'w-full h-screen rounded-2xl flex items-center justify-center'>
      <div className='w-full'>
        <div className='w-full max-w-sm mx-auto rounded-lg p-5 backdrop-blur-sm bg-white/35'>
        <h1 className='text-white w-full mb-3 text-2xl text-balance'>CURRENCY CONVERTER</h1>
          <form onSubmit={(e) => { e.preventDefault(); }}>
            <div className='w-full mb-1'><InputBox Label="FROM" amount={amount} currencyOption={options} selectCurrency = {from} onAmountChange={AmountChange} onCurrencyChange={(currency) => CurrencyChange(currency, 'from')} />
            </div>
            <div className=' relative w-full h-2'><button className='absolute top-1 left-1/2
            -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-md bg-blue-600 text-white' onClick={swap}>SWAP</button>
            </div>
            <div className='w-full mt-1'><InputBox Label="TO" amount={convertedAmount} currencyOption={options} selectCurrency = {to} onCurrencyChange={(currency) => CurrencyChange(currency, 'to')} /></div>
            <div className='w-full flex justify-center'>
            <button className='w-full max-w-40 rounded-md bg-blue-600 text-white mt-2 px-3 py-2' onClick={convertCurrency} >CONVERT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
