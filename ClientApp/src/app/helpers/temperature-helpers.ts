import { TemperatureUnit } from '../enums/temperature-unit';
import { NumericConstants } from '../constants/numeric-constants';

const defaultTemperatureUnit = TemperatureUnit.Celsius;

export default function convert(temperature: number, 
    convertFrom: TemperatureUnit = TemperatureUnit.Kelvin, convertTo: TemperatureUnit = null): number {
    
    if (!convertTo) {
        convertTo = getCurrentTemperatureUnit();
    }

    if (convertTo == convertFrom) {
        return temperature;
    }

    const convertFromName = getFullNameOfTemperatureUnit(convertFrom);
    const convertToName = getFullNameOfTemperatureUnit(convertTo);

    return converter[convertFromName][`to${convertToName}`](temperature);
}

export function setCurrentTemperatureUnit(temperatureUnit: TemperatureUnit) {
    const temperatureUnitName = getFullNameOfTemperatureUnit(temperatureUnit);

    localStorage.setItem('TemperatureUnit', temperatureUnitName);
}

export function getCurrentTemperatureUnit(): TemperatureUnit {
    let temperatureUnitName = localStorage.getItem('TemperatureUnit');
    
    if (!temperatureUnitName || !TemperatureUnit[temperatureUnitName]) {
        return defaultTemperatureUnit;
    }

    return TemperatureUnit[temperatureUnitName];
}

function getFullNameOfTemperatureUnit(temperatureUnit: TemperatureUnit) {
    return Object.keys(TemperatureUnit).find(key => TemperatureUnit[key] == temperatureUnit);
}

function kelvinToCelsius(temperature: number): number {
    return temperature - NumericConstants.weather.absoluteZero;
}

function celsiusToKelvin(temperature: number): number {
    return temperature + NumericConstants.weather.absoluteZero;
}

function fahrenheitToCelsius(temperature: number): number {
    return (temperature - 32) * 5 / 9;
}

function celsiusToFahrenheit(temperature: number): number {
    return (temperature * 9 / 5) + 32;
}

const converter = {
    Celsius: {
        toKelvin: (temperature: number) => celsiusToKelvin(temperature),
        toFahrenheit: (temperature: number) => celsiusToFahrenheit(temperature)
    },

    Fahrenheit: {
        toKelvin: (temperature: number) => {
            const celsius = fahrenheitToCelsius(temperature);
            return celsiusToKelvin(celsius);
        },
        toCelsius: (temperature: number) => fahrenheitToCelsius(temperature)
    },

    Kelvin: {
        toFahrenheit: (temperature: number) => {
            const celsius = kelvinToCelsius(temperature);
            return celsiusToFahrenheit(celsius);
        },
        toCelsius: (temperature: number) => kelvinToCelsius(temperature)
    }
    
}
