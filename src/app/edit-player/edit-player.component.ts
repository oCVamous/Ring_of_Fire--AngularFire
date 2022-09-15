import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})

// allProfilePictures = ['1.webp', '2.png', 'pinguin.svg', 'monkey.png', 'winkboy.svg', 'serious-woman.svg'];
export class EditPlayerComponent implements OnInit {
  allProfilePictures = ['../assets/profile/user (1).png', 'female-2022387_1280.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }

}
