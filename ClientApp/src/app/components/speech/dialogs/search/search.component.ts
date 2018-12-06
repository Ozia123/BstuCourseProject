import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Subscription } from 'rxjs';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { getSpeechSettings } from 'src/app/components/speech/speech-helper/speech-helper';
import Speech from 'speak-tts';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    private speech: Speech;
    private subscription: Subscription;
    
    public items: Array<any>;

    public constructor(
        private readonly apiService: ApiService,
        public readonly dialogRef: MatDialogRef<SearchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(TranslatePipe) private readonly translatePipe: TranslatePipe
    ) {
        this.speech = new Speech();
    }

    public ngOnInit() {
        const url = config.getSearchResult(this.data.message);

        this.subscription = 
            this.apiService.get(url).subscribe(result => {
                this.items = result.items;
                this.voiceSearchResult(result);
            });
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.speech.speaking()) {
            this.speech.cancel();
        }
    }

    private voiceSearchResult(result) {
        const textToVoice = this.getTextFromResultToVoice(result);

        const settings = getSpeechSettings();
        this.speech.init(settings).then(data => {
            this.speech.speak({ text: textToVoice });
        });
    }

    private getTextFromResultToVoice(result): String {
        if (result.items.length === 0) {
            return this.translatePipe.transform('speech.result-not-found');
        }

        const foundResultText = 
            `${this.translatePipe.transform('speech.result-found')} ${this.translatePipe.transform('speech.is')}`;

        return `${foundResultText} ${result.items[0].snippet}`;
    }
}
