import { config } from "./config";

export const SpeechPatterns = [
    { 
        dialog: config.dialogs.weatherDialog,
        patterns: [/^weather$/, /^погода$/] 
    },
    {
        dialog: config.dialogs.searchDialog,
        patterns: [/.*/]
    }
]
