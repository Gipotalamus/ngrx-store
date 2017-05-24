import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Message} from "../message";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-third-window',
  templateUrl: './third-window.component.html',
  styleUrls: ['./third-window.component.css']
})
export class ThirdWindowComponent implements OnInit {

  postedMessage: string = '';
  privateMessages: Message[] = [];
  displayMessage: string = '';
  readPrivate: boolean = false;

  constructor(private store: Store<Message>) {
    this.store.select('publicMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'third') {
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
          if (msg.owner !== 'third' && msg.adresat === 'third') {
            this.privateMessages.push(msg);

          }
        }
      });
  }

  ngOnInit() {
  }

  postAll(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'public', payload: {owner: 'third', content: element.value}});
    element.value = '';
  }

  postSecond(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'third', adresat: 'second', content: element.value}});
    element.value = '';
  }

  postFirst(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'third', adresat: 'first', content: element.value}});
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
