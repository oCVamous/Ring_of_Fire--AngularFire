import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getFirestore, setDoc } from '@angular/fire/firestore';
import  {Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { doc, onSnapshot} from 'firebase/firestore';
import firebase from 'firebase/compat';
import app = firebase.app;
import { DialogQRCodeComponent } from '../dialog-qr-code/dialog-qr-code.component';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    gameOver = false;
    pickCardAnimation = false;
    currentCard: string = '';
    game!: Game;
    gameId!: string;
    // games$: Observable<any[]> | undefined;
    // games: Array<any> | undefined;
    // coll: any;
    // // db: any;

    // db = getFirestore();

    // private firestore: getFirestore,
    constructor(
        private firestore: AngularFirestore, 
        public dialog: MatDialog, 
        private route: ActivatedRoute) {

        // let db = getFirestore(app);

    }

    openQR_Code(): void {
        const dialogRef = this.dialog.open(DialogQRCodeComponent);
        dialogRef.componentInstance.id=this.gameId

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogAddPlayerComponent);

        dialogRef.afterClosed().subscribe((name: string) => {
            if (name && name.length > 0) {
                
                this.game.players.push(name);
                this.game.player_images.push('user (1).png');
                this.saveGame();
                // this.route.params.subscribe(async (params) => {


                //     // await setDoc(doc(this.db, 'games', params['id']), {
                //     //     players: this.game.players
                //     // }).then(r => {
                //     //     console.log(r);
                //     // });

                //     await this.firestore.collection("games")
                //         .doc(this.gameId)
                //         .update({game: this.game})

                // });

            }
        });
    }

    // async ngOnInit(): Promise<void> {
    //   // this.newGame()
    //   this.route.params.subscribe(async (params) => {
    //     console.log(params['id']);

    //     const coll = doc(params['id']);
    //     let gameInformation = await addDoc(this.coll, { game: this.game.toJSON() });
    //     console.log(gameInformation);

    //     this.game.currentPlayer = this.game.currentPlayer;
    //     this.game.playedCards = this.game.playedCards;
    //     this.game.players = this.game.players;
    //     this.game.stack = this.game.stack;
    //   });


    //   // const unsub = onSnapshot(
    //   //   doc(this.coll),
    //   //   { includeMetadataChanges: true },
    //   //   (doc) => {
    //   //     // ...
    //   //   });


    // }

    ngOnInit(): void {
        this.newGame();
        this.route.params.subscribe((params) => {
            console.log(params['id']);
            this.gameId = params['id'];

            this
                .firestore
                .collection('games')
                .doc(params['id'])
                .valueChanges()
                .subscribe((game: any) => {
                    console.log('Game update', game);
                    this.game.currentPlayer = game.currentPlayer;
                    this.game.playedCards = game.playedCards;
                    this.game.players = game.players;
                    this.game.player_images = game.player_images;
                    this.game.stack = game.stack;
                    this.game.pickCardAnimation = game.pickCardAnimation;
                    this.game.currentCard = game.currentCard;
                });

        });

    }

    async newGame() {
        this.game = new Game();
        // const coll = collection(this.firestore, 'games');
        // let gameInformation = await addDoc(coll, { game: this.game.toJSON() });
        // console.log(gameInformation);

    }
    takeCard() {
        if(this.game.stack.length == 0) {
          this.gameOver = true;
        } else if (!this.game.pickCardAnimation) {
          this.game.currentCard = this.game.stack.pop();
          this.game.pickCardAnimation = true;
          console.log('New card: ' + this.game.currentCard);
          console.log('Game is', this.game);
          this.game.currentPlayer++;
          this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    
          this.saveGame();
    
          setTimeout(() => {
            this.game.playedCards.push(this.game.currentCard);
            this.game.pickCardAnimation = false;
            this.saveGame();
          }, 1000);
        }
    }

    editPlayer(playerID: number) {
        console.log('Edit Player', playerID);

        const dialogRef = this.dialog.open(EditPlayerComponent);

        dialogRef.afterClosed().subscribe((change: string) => {
            console.log('Received change', change);
            if (change) {
                if (change == 'DELETE') {
                    this.game.players.splice(playerID, 1);
                    this.game.player_images.splice(playerID, 1);
                } else {
                    this.game.player_images[playerID] = change;
            }
            this.saveGame();
        }
            // if (name && name.length > 0) {
                
            //     this.game.players.push(name);
            //     this.saveGame();
            // }
        });
    }

    async saveGame() {
        await this
            .firestore
            .collection('games')
            .doc(this.gameId)
            .update(this.game.toJSON())
    }


    // saveGame(){
    //  const coll:any = collection(this.firestore, 'games');
    //  setDoc(doc(coll, this.gameId), this.game.toJSON());
    // }

    // openDialog(): void {
    //   const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  
    //   dialogRef.afterClosed().subscribe((name: string) => {
    //     if (name && name.length > 0) {
    //       this.game.players.push(name)
    //       this.saveGame();
    //     };
    //   });
    // }

    // ngOnInit(): void {
    //   this.newGame();
  
    //   this.route.params.subscribe(async (params) => {
    //     this.gameId = params['gameId'];
    //     onSnapshot(doc(this.firestore, "games", params['gameId']), (doc) => {
    //       const loadGame:any =doc.data();     
    //       this.updateGameData(loadGame);
    //     });
    //   })
    // }


}