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

  postedMesssage: string = '';
  privateMessages: string[] = [];

  constructor(private store: Store<Message>) {
    this.store.select('publicMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'third') {
            this.postedMesssage += 'I said: ' + msg.content + '\n';
          }
          else this.postedMesssage +=  msg.owner + ': ' + msg.content + '\n';
        }
        });

    this.store.select('privateMessage')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner !== 'third') {
            this.privateMessages.push(msg.content);
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

  postFirst(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'third', content: element.value}});
    element.value = '';
  }

  postSecond(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'private', payload: {owner: 'third', content: element.value}});
    element.value = '';
  }
}

