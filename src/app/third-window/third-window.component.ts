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

  constructor(private store: Store<Message>) {
    this.store.select('message')
      .subscribe((msg: Message) => {
        if (msg.owner) {
          if (msg.owner === 'third') {
            this.postedMesssage += 'I said: ' + msg.content + '\n';
          }
          else this.postedMesssage +=  msg.owner + ': ' + msg.content + '\n';
        }
        });
  }


  ngOnInit() {
  }

  clickThirdButton(element: HTMLTextAreaElement) {
    this.store.dispatch({type: 'post', payload: {owner: 'third', content: element.value}});
    element.value = '';
  }

}

