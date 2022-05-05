/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ConverterService from '../service/ConverterService';
import ErrorBoundary from '../errorBoundary/errorBoundary';

function Converter() {
  const [initialValue, setInitialValue] = useState(1);
  const [resultValue, setResultValue] = useState(0);
  const [currancyName, setCurrancyName] = useState('USD');

  const converterService = new ConverterService();

  async function getRateCurrance(currancy = currancyName) {
    try {
      const result = await converterService.getResource();
      return result
        .filter((item) => item.ccy === currancy)
        .map((item) => item.buy);
    } catch {
      document.querySelector('.error_message').innerHTML =
        'we got error, please try to reload';
    }
  }

  useEffect(() => {
    calcResult(initialValue, currancyName);
  }, [initialValue, currancyName]);

  async function calcResult(initialNum, currancyName) {
    try {
      const rate = await getRateCurrance(currancyName);
      if (rate) {
        setResultValue((initialNum * rate).toFixed(2));
      }
    } catch {
      setResultValue(0);
    }
  }

  function setClickBtn() {
    const btns = document.querySelectorAll('.currency__btn');

    btns.forEach((item) => {
      item.addEventListener('click', () => {
        setCurrancyName(item.getAttribute('data-currancy'));
      });
    });
  }
  setClickBtn();

  return (
    <div>
      <ErrorBoundary>
        <input
          type="text"
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^\d]/g, '');
            setInitialValue(e.target.value);
          }}
          value={initialValue}
          className="initial__input"
        />
        <input
          disabled
          type="text"
          value={resultValue}
          className="result__input"
        />
      </ErrorBoundary>

      <div className="error_message"></div>

      <div className="wrap__btns">
        <button className="currency__btn" data-currancy={'USD'}>
          USD
        </button>
        <button className="currency__btn" data-currancy={'EUR'}>
          EUR
        </button>
        <button className="currency__btn" data-currancy={'BTC'}>
          BTC
        </button>
      </div>
    </div>
  );
}

export default Converter;
