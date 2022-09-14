import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { addDoc, collection, Firestore } from 'firebase/firestore';
import { Firestore, collectionData, collection, setDoc, addDoc, docData  } from '@angular/fire/firestore';
// import { Game } from '../../models/game';
import { Game } from 'src/models/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';

  games : Array<any> | undefined;
  coll: any;
  gameId: any = '';
  game: any;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  async newGame() {
    let game = new Game();
    // const coll = collection(this.firestore, 'games');
    // let gameInformation = await addDoc(coll, game.toJSON() ).then((gameID: any) => {
    // console.log(gameID);
    // this.router.navigateByUrl('/game/' + gameID.id);
    // });
    //console.log(gameInformation);
    //new Game
    let newGame = await this.firestore.collection("games")
      .add(game.toJSON());
      console.log(newGame);
      this.router.navigateByUrl('/game/' + newGame.id);
    
  }

}
