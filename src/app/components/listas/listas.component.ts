import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Lista } from "src/app/models/lista.model";
import { DeseosService } from "src/app/services/deseos.service";

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent implements OnInit {
  listas: Lista[];
  @Input() terminada: true;
  constructor(private deseosService: DeseosService, private router: Router) {
    this.listas = deseosService.listas;
  }

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      // Tengo que crear la lista
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }
}
