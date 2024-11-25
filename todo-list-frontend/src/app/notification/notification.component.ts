import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Notification} from "./Notification";

@Component({
    selector: 'app-notification',
    template: `
        <div #notificationContainer
             class="notification-container"
             [ngClass]="'notification-style-'+notification?.type?.toLowerCase()"
        >
            <div #notificationTitle
                 class="notification-title">
                <strong>{{ notification?.type }}</strong>
                <i class="notification-close-icon fa-solid fa-xmark"
                   (click)="onRemoveClicked()"></i>
            </div>
            <span #notificationMessage
            >{{ notification?.message }}</span>
        </div>
    `,
    styleUrls: ['notification-component.scss']
})
export class NotificationComponent {

    @Input() notification: Notification | undefined;
    @Output() removeClicked = new EventEmitter<string>();

    constructor() {
    }

    onRemoveClicked(): void {
        this.removeClicked.emit(this.notification?.key)
    }

}
