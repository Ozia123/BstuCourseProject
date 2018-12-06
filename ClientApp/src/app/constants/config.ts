import { environment } from '../../environments/environment';
import { DialogModel } from '../models/dialog.model';
import { DialogWidth } from '../enums/dialog-width';
import { DialogHeight } from '../enums/dialog-height';

export const config = {
    getForecast: (lat, lon) => 
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${environment.weatherMap.appId}`,

    getSearchResult: (query) =>
        `https://www.googleapis.com/customsearch/v1?key=${environment.googleCustomSearch.apiKey}&cx=${environment.googleCustomSearch.searchEngineCode}&q=${query}`,

    dialogs: {
        searchDialog: {
            componentName: 'SearchComponent',
            className: 'overlay-dialog-container',
            width: DialogWidth.wide,
            height: DialogHeight.high
        },

        weatherDialog: {
            componentName: 'WeatherComponent',
            className: 'overlay-weather-dialog-container',
            width: DialogWidth.normal,
            height: DialogHeight.normal
        }
    }
};