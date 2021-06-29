import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Task } from '../models/taskModel'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  todos: Task[] = []

  inprogressList: Task[] = []

  completed: Task[] = []

  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
   this.taskForm = this.formBuilder.group({
     taskTitle: null,
     taskDescription: null
   })

   if (localStorage.getItem("todoAppData")) {
    this.todos = JSON.parse(localStorage.getItem("todoAppData")).todos
    this.inprogressList = JSON.parse(localStorage.getItem("todoAppData")).inprogressList
    this.completed = JSON.parse(localStorage.getItem("todoAppData")).completed
   }
  }

  submit() {
    if (!(this.taskForm.value.taskTitle || this.taskForm.value.taskDescription)) {
      return;
    }
    this.todos = [...this.todos, new Task(this.taskForm.value.taskTitle, this.taskForm.value.taskDescription) ]
    console.log(this.todos)
    this.taskForm.reset();
    localStorage.setItem("todoAppData", JSON.stringify({
      todos: this.todos,
      inprogressList: this.inprogressList,
      completed: this.completed
    }))
  }

  onDrop(event:CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex,event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    }
    localStorage.setItem("todoAppData", JSON.stringify({
      todos: this.todos,
      inprogressList: this.inprogressList,
      completed: this.completed
    }))
  }
}
