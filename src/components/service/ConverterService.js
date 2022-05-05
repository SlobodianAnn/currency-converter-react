class ConverterService {
  _apiBase = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  getResource = async (url = this._apiBase) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fecth ${url}. status: ${res.status}`);
    }
    return res.json();
  };
}

export default ConverterService;
