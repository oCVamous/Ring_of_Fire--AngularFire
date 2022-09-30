import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Wasserfall', description: 'Alle trinken gleichzeitig.Sobald Player1 mit dem trinken aufhört, darf Player 2 aufhören. Player 3 darf erst aufhören, wenn Player 2 fertig ist uns so weiter...' },
    { title: 'Du', description: 'Wähle jemanden aus, der trinken muss' },
    { title: 'Ich', description: 'Glückwunsch, trink einen shot' },
    { title: 'Sükrü', description: 'Sükrü muss trinken' },
    { title: 'Verteile', description: 'Verteile 10 Schlücke oder trinke Sie selber' },
    { title: 'Frauen', description: 'Alle Frauen müssen trinken' },
    { title: 'Himmel', description: 'Hände in die Luft!!! Der letzte muss trinken' },
    { title: 'Buddy', description: 'Wähle einen Buddy aus, wenn du trinkst muss er auch trinken und anders herum' },
    { title: 'Toilette', description: 'Der letzte der auf dem WC war muss trinken' },
    { title: 'Männer', description: 'Alle Männer müssen trinken' },
    { title: 'Exen', description: 'Du oder jemand anderes muss sein Glas exen' },
    { title: 'Gewählte', description: 'Alle Gewählten müssen trinken' },
    { title: 'Regel', description: 'Mach eine Regel, jedesmal wenn Sie gebrochen wird muss die Person trinken' },
  ];

  title: string ='';
  description = '';
  @Input() card!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.card) {
      console.log('current Card is:', this.card);
      let cardNumber = +this.card.split('_')[1]; // console.log('current number is:', +this.card.split('_')[1]);
      this.title = this.cardAction[cardNumber -1].title;
      this.description = this.cardAction[cardNumber -1].description;
    }

  }

}
