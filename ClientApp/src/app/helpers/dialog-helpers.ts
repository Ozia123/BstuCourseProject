import { DialogHeight } from '../enums/dialog-height';
import { DialogWidth } from '../enums/dialog-width';
import { NumericConstants } from '../constants/numeric-constants';

export function resolveDialogHeight(dialogHeight: DialogHeight, returnString: boolean): number | string {
    const screenHeight = window.innerHeight;

    const height = screenHeight * dialogHeight * NumericConstants.dialog.heightUnit;

    return returnString ? resolveString(height) : height;
}

export function resolveDialogWidth(dialogWidth: DialogWidth, returnString: boolean): number | string {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= NumericConstants.screen.lowResolution) {
        dialogWidth = DialogWidth.wide;
    }

    const width = screenWidth * dialogWidth * NumericConstants.dialog.widthUnit;

    return returnString ? resolveString(width) : width;
}

function resolveString(value: number): string {
    return `${value}px`;
}
