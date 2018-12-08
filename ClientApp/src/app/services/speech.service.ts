import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { DialogModel } from '../models/dialog.model';
import { SpeechPatterns } from '../constants/speech-patterns';
import createDialog from '../helpers/create-dialog-helper';

@Injectable()
export class SpeechService {
    public constructor(public dialog: MatDialog) { }

    public openDialog(message: string): Observable<any> {
        const dialog = this.getDialogToOpen(message);

        return createDialog(this.dialog, dialog, message);
    }

    private getDialogToOpen(message: string): DialogModel {
        const pattern = SpeechPatterns.find(speechPattern => 
                speechPattern.patterns.some(pattern => pattern.test(message))
            );

        return pattern.dialog;
    }
}
