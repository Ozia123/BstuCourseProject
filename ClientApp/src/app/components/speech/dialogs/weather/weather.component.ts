import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { config } from 'src/app/constants/config';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import convert, { 
    setCurrentTemperatureUnit, getCurrentTemperatureUnit 
} from 'src/app/helpers/temperature-helpers';
import { TemperatureUnit } from 'src/app/enums/temperature-unit';
import { FormControl } from '@angular/forms';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import Speech from 'speak-tts';
import { getSpeechSettings } from '../../speech-helper/speech-helper';

@Component({
    selector: 'app-weather',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
    private speech: Speech;
    public forecast: any;
    public temperatureUnitPanel: FormControl;
    public temperatureUnits: Array<any>;

    public constructor(
        private readonly apiService: ApiService,
        public readonly dialogRef: MatDialogRef<WeatherComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(TranslatePipe) private readonly translatePipe: TranslatePipe
    ) {
        this.speech = new Speech();
    }

    public ngOnInit() {
        this.temperatureUnitPanel = new FormControl(this.getCurrentTemperatureUnit());
        this.temperatureUnits = this.getAvailableTemperatureUnits();

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const forecastUrl = config.getForecast(
                    position.coords.latitude, position.coords.longitude);

                this.apiService.get(forecastUrl).subscribe(forecast => {
                    this.forecast = forecast;
                    this.voiceForecast(forecast);
                });
            });
        }
    }

    public ngOnDestroy() {
        if (this.speech.speaking()) {
            this.speech.cancel();
        }
    }

    public convert(temperature: number): number {
        return convert(temperature, TemperatureUnit.Kelvin);
    }

    public getCurrentTemperatureUnit(): TemperatureUnit {
        return getCurrentTemperatureUnit();
    }

    public changeCurrentTemperatureUnit($event) {
        setCurrentTemperatureUnit($event.value);
    }

    public getCurrentDate(): string {
        return new Date().toDateString();
    }

    private voiceForecast(forecast) {
        const textToVoice = this.getTextFromForecastToVoice(forecast);

        const settings = getSpeechSettings();
        this.speech.init(settings).then(data => {
            this.speech.speak({ text: textToVoice });
        });
    }

    private getTextFromForecastToVoice(forecast): string {
        return this.translatePipe.transform('weather.forecast')
            (forecast.name, convert(forecast.main.temp), forecast.weather[0].description) as string;
    }

    private getAvailableTemperatureUnits(): Array<any> {
        return Object.keys(TemperatureUnit).map(key => {
            return {
                name: key,
                value: TemperatureUnit[key]
            };
        });
    }
}
