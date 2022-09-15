import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {
  @Input() name: any;
  @Input() image = 'user (1).png'; //src\assets\profile\user (1).png
  @Input() playerActive: boolean = false;
  // @Input() image = 'src\assets\user (1).png';


  constructor() { }

  ngOnInit(): void {
  }

}
