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

  postedMessage: string = '';
  privateMessages: Message[] = [];
  displayMessage: string = '';
  readPrivate: boolean = false;

  constructor(private store: Store<Message>) {
    this.store.select('publicMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'second') {
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
          if (msg.owner !== 'second' && msg.adresat === 'second') {
            this.privateMessages.push(msg);

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
    this.store.dispatch({type: 'private', payload: {owner: 'second', adresat: 'first', content: element.value}});
    element.value = '';
  }

  postThird(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'second', adresat: 'third', content: element.value}});
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
