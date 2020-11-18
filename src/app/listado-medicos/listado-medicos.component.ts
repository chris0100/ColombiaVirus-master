import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-medicos',
  templateUrl: './listado-medicos.component.html',
  styleUrls: ['./listado-medicos.component.scss']
})
export class ListadoMedicosComponent implements OnInit {
  medicos: any[] = new Array<any>();
  constructor(private dbM: AngularFirestore) { }

  ngOnInit(): void {

    this.medicos.length = 0;
    this.dbM.collection('medicos').get().subscribe((resultado) => {

      resultado.docs.forEach((item) => {

        const medico = item.data();
        medico.id = item.id;
        medico.ref = item.ref;
        this.medicos.push(medico);
      });

    });
  }

}
