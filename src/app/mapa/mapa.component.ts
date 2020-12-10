import { Component, OnInit } from '@angular/core';
import {MapaService} from './mapa.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html'
})


export class MapaComponent implements OnInit {


  constructor(private map: MapaService) { }

  ngOnInit(): void {
  }



}
