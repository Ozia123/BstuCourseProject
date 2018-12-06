import { Injectable } from '@angular/core';
import { SpeechDialogs } from '../components/speech/dialogs';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { resolveDialogWidth, resolveDialogHeight } from '../helpers/dialog-helpers';
import { DialogModel } from '../models/dialog.model';
import { SpeechPatterns } from '../constants/speech-patterns';

@Injectable()
export class SpeechService {
    public constructor(public dialog: MatDialog) { }

    public openDialog(message: string): Observable<any> {
        const dialog = this.getDialogToOpen(message);

        const dialogRef = this.dialog
            .open(SpeechDialogs[dialog.componentName], {
                width: resolveDialogWidth(dialog.width, true) as string,
                height: resolveDialogHeight(dialog.height, true) as string,
                data: { message: message },
                panelClass: dialog.className
            });

        return dialogRef.afterClosed();
    }

    private getDialogToOpen(message: string): DialogModel {
        const pattern = SpeechPatterns.find(speechPattern => 
                speechPattern.patterns.some(pattern => pattern.test(message))
            );

        return pattern.dialog;
    }
}
