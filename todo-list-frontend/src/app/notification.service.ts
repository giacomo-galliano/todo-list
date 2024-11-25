import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Notification} from "./notification/Notification";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public currentNotifications: Notification[] = [];
    private notifications$ = new BehaviorSubject<Notification[]>([]);
    private timeoutsMap: Map<string, any> = new Map()

    constructor() {
    }

    emitNotification(notification: Notification): void {
        this.currentNotifications = [...this.currentNotifications, notification];
        this.notifications$.next(this.currentNotifications);
        const timeoutId = setTimeout(() => {
            this.dismissNotification(notification);
        }, 3000);
        this.timeoutsMap.set(notification.key, timeoutId);
    }

    dismissNotification(notification: Notification): void {
        const timeoutId = this.timeoutsMap.get(notification.key);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.timeoutsMap.delete(notification.key);
        }
        this.currentNotifications = this.currentNotifications.filter(item => item.key !== notification.key);
        this.notifications$.next(this.currentNotifications);
    }

    get notifications(): Observable<Notification[]> {
        return this.notifications$.asObservable();
    }
}
