import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
    name: 'translate',
    pure: false
})
export class TranslatePipe {
    constructor(private translationService: TranslationService) { }

    transform(value: any, args?: any): any {
        return this.translationService.translate(value);
    }
}
