import { Component, AfterViewInit } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  templateUrl: './chat.component.html'
})
export class ChatComponent implements AfterViewInit {
  public config: PerfectScrollbarConfigInterface = {};
  public showSidebar = false;
  public selectedUser: any;

  users: Object[] = [
    {
      name: 'Steve Rogers',
      avtar: 'assets/images/users/1.jpg',
      status: 'online',
      lastmsg: 'Hey Banner, where are you?',
      time: '9:30 AM'
    },
    {
      name: 'Tony Stark',
      avtar: 'assets/images/users/2.jpg',
      status: 'busy',
      lastmsg: 'Thanos is coming.',
      time: '9:30 AM'
    },
    {
      name: 'Buckey Barnes',
      avtar: 'assets/images/users/3.jpg',
      status: 'away',
      lastmsg: 'I did not kill your father.',
      time: '9:30 AM'
    },
    {
      name: 'Natasha Romanoff',
      avtar: 'assets/images/users/4.jpg',
      status: 'offline',
      lastmsg: 'I am multitasking.',
      time: '9:30 AM'
    },
    {
      name: 'Maria Hill',
      avtar: 'assets/images/users/5.jpg',
      status: 'online',
      lastmsg: 'We are not at war.',
      time: '9:30 AM'
    },
    {
      name: 'Wanda Maximoff',
      avtar: 'assets/images/users/6.jpg',
      status: 'busy',
      lastmsg: 'We have to save Vision.',
      time: '9:30 AM'
    },
    {
      name: 'Carol Danevars',
      avtar: 'assets/images/users/7.jpg',
      status: 'away',
      lastmsg: 'I am coming.',
      time: '9:30 AM'
    },
    {
      name: 'Thor',
      avtar: 'assets/images/users/d1.jpg',
      status: 'busy',
      lastmsg: 'please dont smash this time.',
      time: '9:30 AM'
    },
    {
      name: 'Nick Fury',
      avtar: 'assets/images/users/d2.jpg',
      status: 'away',
      lastmsg: 'Hey banner, how you doin?',
      time: '9:30 AM'
    },
    {
      name: 'Peter',
      avtar: 'assets/images/users/d3.jpg',
      status: 'away',
      lastmsg: 'I am eager to meet you.',
      time: '9:30 AM'
    }
  ];

  constructor() {
    this.selectedUser = this.users[1];
  }

  mobileSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  onSelect(user: Object[]): void {
    this.selectedUser = user;
  }

  ngAfterViewInit() {}
}
