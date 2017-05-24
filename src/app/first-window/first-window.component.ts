import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Message} from "../message";

@Component({
  selector: 'app-first-window',
  templateUrl: './first-window.component.html',
  styleUrls: ['./first-window.component.css']
})
export class FirstWindowComponent implements OnInit {

  postedMesssage: string = '';

  constructor(private store: Store<Message>) {
    this.store.select('message')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'first') {
            this.postedMesssage += 'I said: ' + msg.content + '\n';
          }
          else this.postedMesssage +=  msg.owner + ': ' + msg.content + '\n';
        }
      });
  }

  ngOnInit() {
  }

  clickFirstButton(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'post', payload: {owner: 'first', content: element.value}});
    element.value = '';
  }

}
