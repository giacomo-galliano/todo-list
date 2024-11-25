import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {BehaviorSubject, combineLatest, Observable, ReplaySubject} from "rxjs";
import {debounceTime, finalize, map} from "rxjs/operators";
import {NotificationService} from "./notification.service";
import {Notification, NotificationType} from "./notification/Notification";

@Component({
    selector: 'app-root',
    template: `
        <div class="title">
            <h1>
                A list of TODOs
            </h1>
        </div>
        <div class="list">
            <label for="search">Search...</label>
            <input #searchInput id="search" type="text" (input)="onSearchChanged(searchInput.value)">
            <app-progress-bar *ngIf="isLoading"></app-progress-bar>
            <app-todo-item
                    *ngFor="let todo of filteredTodos$ | async"
                    [item]="todo"
                    (onRemoveClicked)="onRemoveClick($event)"
            ></app-todo-item>
            <app-notification-list></app-notification-list>
        </div>
    `,
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    public isLoading = false;
    private searchFilter$ = new BehaviorSubject<string>('');
    private todoSubject$ = new ReplaySubject<Todo[]>();
    readonly todos$: Observable<Todo[]> = this.todoSubject$.asObservable();
    readonly filteredTodos$: Observable<Todo[]>;

    constructor(
        private todoService: TodoService,
        private notificationService: NotificationService
    ) {
        this.loadTodos();

        this.filteredTodos$ = combineLatest([
            this.searchFilter$.pipe(debounceTime(250)),
            this.todos$
        ]).pipe(
            map(([searchFilter, todos]) => {
                return todos.filter(todo => todo.task.toLowerCase().includes(searchFilter.toLowerCase()))
            })
        )
    }

    onSearchChanged(searchFilter: string): void {
        this.searchFilter$.next(searchFilter);
    }

    loadTodos(): void {
        this.isLoading = true;
        this.todoService.getAll().pipe(
            finalize(() => this.isLoading = false)
        ).subscribe(todos => this.todoSubject$.next(todos));
    }

    onRemoveClick(id: number): void {
        this.todoService.remove(id).subscribe(
            () => {
                this.loadTodos();
                this.notificationService.emitNotification(new Notification(`Succesfully removed todo item ${id}`, NotificationType.SUCCESS));
            },
            (err) => {
                this.notificationService.emitNotification(new Notification(`Error removing todo item ${id}: ${err}`, NotificationType.ERROR))
            }
        )
    }
}
