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

  postedMessage: string = '';
  privateMessages: Message[] = [];
  displayMessage: string = '';
  readPrivate: boolean = false;

  constructor(private store: Store<Message>) {
    this.store.select('publicMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'first') {
            this.postedMessage += 'I said: ' + msg.content + '\n';
          }
          else this.postedMessage +=  msg.owner + ' says: ' + msg.content + '\n';
          this.displayMessage = this.postedMessage;
          this.readPrivate = false;
        }
      });

    this.store.select('privateMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner !== 'first' && msg.adresat === 'first') {
            this.privateMessages.push(msg);

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
    this.store.dispatch({type: 'private', payload: {owner: 'first', adresat: 'second', content: element.value}});
    element.value = '';
  }

  postThird(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'first', adresat: 'third', content: element.value}});
    element.value = '';
  }

  readMessages(message: Message) {
    this.readPrivate = !this.readPrivate;
    if (this.readPrivate) {
      this.displayMessage = this.privateMessages.map((msg: Message) => msg.owner + ' says: ' + msg.content).join('\n');
    } else {
      this.displayMessage = this.postedMessage;
    }
  }
}
