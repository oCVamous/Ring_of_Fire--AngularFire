import { Component, Input, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode'; //Ok i dont know why its not running
// hmm everything is ok but i dont understand why ist is not removiung error

@Component({
  selector: 'app-dialog-qr-code',
  templateUrl: './dialog-qr-code.component.html',
  styleUrls: ['./dialog-qr-code.component.scss']
})
export class DialogQRCodeComponent implements OnInit {
  @Input() id:any;
  url:any;
  constructor() { }

  ngOnInit(): void {
    this.url=`https://ps-ring-of-fire.web.app/game/${this.id}`
    console.log(this.url)
  }

}
