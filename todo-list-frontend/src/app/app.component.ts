import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {debounceTime, finalize, map} from "rxjs/operators";

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
            <app-todo-item *ngFor="let todo of filteredTodos$ | async" [item]="todo"></app-todo-item>
        </div>
    `,
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    private searchFilter$ = new BehaviorSubject<string>('');
    public isLoading = false;
    readonly todos$: Observable<Todo[]>;
    readonly filteredTodos$: Observable<Todo[]>;

    constructor(todoService: TodoService) {
        this.isLoading = true;
        this.todos$ = todoService.getAll().pipe(
            finalize(() => this.isLoading = false)
        );

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
}
