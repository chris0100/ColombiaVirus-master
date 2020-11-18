import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit {
  pacientes: any[] = new Array<any>();
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

    this.pacientes.length = 0;
    this.firestore.collection('pacientes').get().subscribe((resultado)=>{
      console.log(resultado.docs);

      resultado.docs.forEach((item)=>{
        const paciente = item.data();
        paciente.id = item.id;
        paciente.ref = item.ref;
        this.pacientes.push(paciente);
      });

    });
  }

}
