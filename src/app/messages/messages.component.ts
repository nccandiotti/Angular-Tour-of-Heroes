import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  // Angular will inject the singleton MessageService into that property when it creates the MessagesComponent - MUST be public because you're going to bind to it in the template.
  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}
}
