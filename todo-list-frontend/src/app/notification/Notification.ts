export enum NotificationType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INFO = 'INFO'
}

export class Notification {
    key: string;
    message: string;
    type: NotificationType;


    constructor(message: string, type?: NotificationType) {
        this.message = message;
        this.type = type || NotificationType.INFO;
        this.key = [new Date().toISOString(), this.type.toString()].join('_');
    }

}
