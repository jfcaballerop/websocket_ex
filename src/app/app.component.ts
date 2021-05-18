import { Component, OnDestroy, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { SOCKET_CONFIG, SOCKET_URL_DEV } from './config/Config';
import { ISearchResults } from './interfaces/ISearchResult';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'WebSockets query';
  description = 'Angular-WebSocket Demo';
  results: string[] = [];
  disabled = true;
  name: string;
  filteredSuggest: any[];
  private stompClient = null;


  filterResults(event): void {
    const query = event.query;
    this.sendFilterMsg(query);
  }

  setConnected(connected: boolean): void {
    this.disabled = !connected;

    if (connected) {
      this.results = [];
    }
  }
  connect(): void {
    const socket = new SockJS(SOCKET_URL_DEV.URL);
    this.stompClient = Stomp.over(socket);
    const headers = {};

    this.stompClient.connect(headers, (frame) => {
      this.setConnected(true);
      console.log('Connected: ' + frame);
      this.stompClient.subscribe(SOCKET_CONFIG.TOPIC, (msg) => {
        console.log(msg.body);
        let body: ISearchResults;
        body = JSON.parse(msg.body);
        this.filteredSuggest = body.data;

        console.log('body2: ', body);
        this.showResults(body);

      });
    });
  }

  disconnect(): void {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendMsg(): void {
    const headers = {};

    this.stompClient.send(
      SOCKET_CONFIG.ENDPOINT_SEND,
      headers,
      JSON.stringify({ name: this.name })
    );
  }
  sendFilterMsg(filterchain: string): void {
    const headers = {};

    this.stompClient.send(
      SOCKET_CONFIG.ENDPOINT_SEND,
      headers,
      JSON.stringify({ name: filterchain })
    );
  }

  showResults(results: ISearchResults): void {
    this.results = [];

    for (const item of results.data) {
      this.results.push(item.name);
    }
  }

  constructor() {

  }
  ngOnDestroy(): void {
    this.disconnect();
  }
  ngOnInit(): void {
    this.connect();
  }

}
