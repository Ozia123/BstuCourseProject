import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { config } from 'src/app/constants/config';
import { Subscription } from 'rxjs';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';
import { GlossaryFindResultModel } from 'src/app/models/glossary-find-result.model';
import { GlossaryItemModel } from 'src/app/models/glossary-item.model';
import { getSpeechSettings } from 'src/app/components/speech/speech-helper/speech-helper';
import Speech from 'speak-tts';

@Component({
    selector: 'app-glossary',
    templateUrl: './glossary.component.html',
    styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit, OnDestroy {
    private speech: Speech;
    private subscription: Subscription;
    
    public items: Array<GlossaryItemModel>;

    public constructor(
        private readonly apiService: ApiService,
        public readonly dialogRef: MatDialogRef<GlossaryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(TranslatePipe) private readonly translatePipe: TranslatePipe
    ) {
        this.speech = new Speech();
    }

    public ngOnInit() {
        const url = config.findInGlossary(this.data.message);

        this.subscription = 
            this.apiService.get(url).subscribe(
                (result: GlossaryFindResultModel) => {
                    this.items = result.items;
                    this.voiceSearchResult(result.items[0].content);
                },
                error => {
                    this.searchInWeb(this.data.message);
                }
            );
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.speech.speaking()) {
            this.speech.cancel();
        }
    }

    private voiceSearchResult(textToVoice) {
        const settings = getSpeechSettings();
        this.speech.init(settings).then(data => {
            this.speech.speak({ text: textToVoice });
        });
    }

    private searchInWeb(message: string) {
        this.dialogRef.close({ nonSuccess: true });
    }
}
