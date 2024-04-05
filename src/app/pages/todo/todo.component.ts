import { HeaderComponent } from '../../core/components/header/header.component';

import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { lazyLoad } from '../../shared/functions/lazyLoad';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    DragDropModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  val: string = '';
  loading: string = '';
  deletingTodo: number = -1;
  todos: { id: number; name: string }[] = todos;
  editingTodo: number = -1;

  constructor(private snackbar: MatSnackBar) {}

  async addTodo() {
    if (
      !this.todos.find(
        (f) => f.name.toLocaleLowerCase() === this.val.toLocaleLowerCase()
      ) &&
      this.val
    ) {
      this.loading = 'add';
      await lazyLoad();
      const newId =
        this.todos.length > 0
          ? Math.max(...this.todos.map((todo) => todo.id)) + 1
          : 0;
      this.todos.push({
        id: newId,
        name: this.val.slice(0, 1).toUpperCase() + this.val.slice(1),
      });

      this.val = '';
      this.loading = '';
    } else {
      this.snackbar.open('This todo exist or new todo is empty', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        direction: 'ltr',
      });
    }
    console.log(this.todos);
  }

  async deleteTodo(id: number) {
    this.loading = 'delete';
    this.deletingTodo = id;
    await lazyLoad();
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos.splice(index, 1);
    this.snackbar.open('Successfully deleted', '', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'ltr',
    });
    this.loading = '';
    this.deletingTodo = -1;
  }

  async editTodo() {
    this.loading = 'edit';
    await lazyLoad();
    const todoIndex = this.todos.findIndex(
      (todo) => todo.id === this.editingTodo
    );
    if (todoIndex !== -1) {
      this.todos[todoIndex].name = this.val;
      this.snackbar.open('Todo updated successfully', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        direction: 'ltr',
      });
    } else {
      this.snackbar.open('Todo not found', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        direction: 'ltr',
      });
    }

    this.loading = '';
    this.val = '';
    this.editingTodo = -1;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}

export const todos: { name: string; id: number }[] = [
  {
    id: 0,
    name: 'Todo1',
  },
  {
    id: 1,
    name: 'Todo2',
  },
];
