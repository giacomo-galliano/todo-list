import {Component} from '@angular/core';
import {NotificationService} from "../notification.service";
import {Notification} from "../notification/Notification";

@Component({
    selector: 'app-notification-list',
    template: `
        <div class="notification-list-container">
            <app-notification
                    *ngFor="let notification of notificationService.notifications | async"
                    [notification]="notification"
                    (removeClicked)="removeNotification(notification)"
            ></app-notification>
        </div>
    `,
    styleUrls: ['notification-list.component.scss']
})
export class NotificationListComponent {

    constructor(public notificationService: NotificationService) {
    }

    removeNotification(notification: Notification): void {
        this.notificationService.dismissNotification(notification);
    }

}
