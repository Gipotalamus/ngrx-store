import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {Message} from "../message";

@Component({
  selector: 'app-second-window',
  templateUrl: './second-window.component.html',
  styleUrls: ['./second-window.component.css']
})
export class SecondWindowComponent implements OnInit {

  postedMesssage: string = '';
  privateMessages: string[] = [];

  constructor(private store: Store<Message>) {
    this.store.select('publicMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'second') {
            this.postedMesssage += 'I said: ' + msg.content + '\n';
          }
          else this.postedMesssage +=  msg.owner + ': ' + msg.content + '\n';
        }
      });
    this.store.select('privateMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner !== 'second') {
            this.privateMessages.push(msg.content);
          }
        }
      });
  }

  ngOnInit() {
  }

  postAll(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'public', payload: {owner: 'second', content: element.value}});
    element.value = '';
  }

  postFirst(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'second', content: element.value}});
    element.value = '';
  }

  postThird(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'second', content: element.value}});
    element.value = '';
  }

}
