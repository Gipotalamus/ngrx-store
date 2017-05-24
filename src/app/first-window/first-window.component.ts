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
  privateMessages: string[] = [];

  constructor(private store: Store<Message>) {
    this.store.select('publicMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'first') {
            this.postedMesssage += 'I said: ' + msg.content + '\n';
          }
          else this.postedMesssage +=  msg.owner + ': ' + msg.content + '\n';
        }
      });

    this.store.select('privateMessage')
      .subscribe((msg: Message) => {
      console.log(msg.owner)
        if (msg.owner) {
          if (msg.owner !== 'first') {
            this.privateMessages.push(msg.content);
          }
        }
      });
  }

  ngOnInit() {
  }

  postAll(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'public', payload: {owner: 'first', content: element.value}});
    element.value = '';
  }

  postSecond(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'first', content: element.value}});
    element.value = '';
  }

  postThird(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'first', content: element.value}});
    element.value = '';
  }
}
