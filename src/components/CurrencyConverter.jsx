import React, {useEffect, useState} from 'react';
import './CurrencyConverter.css'
import axios from "axios";

const CurrencyConverter = () => {

    const [rates, setRates] = useState(null)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("EUR")
    const [amaunt, setAmaunt] = useState(1)
    const [convertedAmaunt, setConvertedAmaunt] = useState(null)

    useEffect(() => {

        axios.get("https://v6.exchangerate-api.com/v6/30e37840969222bd385273d7/latest/USD")
            .then((response) => {
                setRates(response.data.conversion_rates)
            }).catch((erro) => {
                console.log("Ocorreu um erro " +  erro)
        })

        console.log(rates)
    }, [])

    useEffect(() => {
        if (rates) {
            const rateFrom = rates[fromCurrency] || 0
            const rateTo = rates[toCurrency] || 0
            setConvertedAmaunt(((amaunt / rateFrom) * rateTo.toFixed(2)))
        }
    }, [amaunt, rates, fromCurrency, toCurrency])

    if (!rates) {
        return <h1>Carregando...</h1>
    }

    return (
        <div className="converter">
            <h2>Conversor de Moedas</h2>
            <input type="number" placeholder="Digite o Valor..."
                   value={amaunt}
                   onChange={(e) => setAmaunt(e.target.value)}/>
            <span>Selecione as Moedas</span>
            <select value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}>
                {Object.keys(rates).map((currency) => (
                    <option value={currency} key={currency}>{currency}</option>
                ))}
            </select>
            <span>Para</span>
            <select value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}>
                {Object.keys(rates).map((currency) => (
                    <option value={currency} key={currency}>{currency}</option>
                ))}
            </select>
            <h3>{convertedAmaunt.toFixed(2)} {toCurrency}</h3>
            <p>{amaunt} {fromCurrency} valem {convertedAmaunt.toFixed(2)} {toCurrency}</p>
        </div>
    );
};

export default CurrencyConverter;