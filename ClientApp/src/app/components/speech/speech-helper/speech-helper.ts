import { languageCodes } from 'src/app/constants/language-codes';

export const getCurrentLanguageCode = () => {
    const language = getLanguage();
    
    return language.languageCode;
};

export const getSpeechSettings = () => {
    const language = getLanguage();

    return {
        'volume': 0.1,
        'lang': language.languageCode,
        'rate': 1,
        'pitch': 1,
        'voice': language.voice,
        'splitSentences': true
    };
};

function getLanguage() {
    const language = localStorage.getItem('language');

    if (language) {
        const languageCode = languageCodes.find(x => x.language == language);

        if (languageCode) {
            return languageCode;
        }
    }

    return languageCodes.find(x => true);
}
