import { Injectable } from '@angular/core';
import { translations } from '../constants/translations';

@Injectable()
export class TranslationService {
    public languages = ['rus', 'eng'];

    constructor() { }

    public changeCurrentLanguage(language: string) {
        localStorage.setItem('language', language);
    }

    public getCurrentLanguage(): string {
        let language = localStorage.getItem('language');
        
        if (!language) {
            language = this.languages[0];
            localStorage.setItem('language', language);
        }

        return language;
    }

    public translate(key: string): string {
        let value = '';
        const language = this.getCurrentLanguage();

        if (translations[language]) {
            let node = translations[language];
            const nodeKeys = key.split('.');

            nodeKeys.forEach((nodeKey, nodeIndex) => {
                const hasKey = Object.keys(node).some(key => nodeKey == key);

                if (hasKey) {
                    node = node[nodeKey];

                    if (nodeIndex == (nodeKeys.length - 1)) {
                        value = node;
                    }
                }
                else {
                    return;
                }
            });
        }

        return value;
    }
}
