import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth, User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ColombiaVirus';
  cargando = true;


  constructor()
  {
    setTimeout(() => {
      this.cargando = false;
    }, 5000);

  }
}
