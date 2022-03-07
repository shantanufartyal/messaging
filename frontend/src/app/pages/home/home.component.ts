import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sendMessage: string;
  receivedMessage: string;
  time;
  messages: any = [];
  constructor(private socket: Socket) {}

  ngOnInit() {
    this.socket.on('receive-message', (msg) => {
      console.log(msg);
      this.receivedMessage = msg;
      msg['messagedById'] = '1';
      console.log(msg);
      this.messages.push(msg);
    });
  }

  click(event) {
    let currentTime = new Date();
    let options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    } as const;
    this.time = currentTime.toLocaleString('en-US', options);

    let message = {
      message: this.sendMessage,
      messagedAt: this.time,
      messagedByName: 'Shantanu',
      messagedById: '2',
    };
    this.socket.emit('send-message', message);
    this.messages.push(message);
    this.sendMessage = '';
  }
}
