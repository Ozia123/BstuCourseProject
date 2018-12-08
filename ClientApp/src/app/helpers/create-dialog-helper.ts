import { Observable } from "rxjs";
import { SpeechDialogs } from "../components/speech/dialogs";
import { resolveDialogWidth, resolveDialogHeight } from "./dialog-helpers";
import { MatDialog } from "@angular/material";

export default function createDialog(dialogRef: MatDialog, dialog: any, message: string): Observable<any> {
    const dialogReference = dialogRef
        .open(SpeechDialogs[dialog.componentName], {
            width: resolveDialogWidth(dialog.width, true) as string,
            height: resolveDialogHeight(dialog.height, true) as string,
            data: { message: message },
            panelClass: dialog.className
        });

    return dialogReference.afterClosed();
}
