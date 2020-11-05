import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, IonList } from "@ionic/angular";
import { Lista } from "src/app/models/lista.model";
import { DeseosService } from "src/app/services/deseos.service";

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent implements OnInit {
  @ViewChild(IonList) lista: IonList;
  @Input() terminada: true;
  listas: Lista[];
  constructor(
    public deseosService: DeseosService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      // Tengo que crear la lista
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
    this.deseosService.guardarStorage();
  }

  async editarLista(lista: Lista) {
    // this.router.navigateByUrl("/tabs/tab1/agregar");
    const alert = await this.alertController.create({
      header: "Editar Lista",
      inputs: [
        {
          name: "titulo",
          type: "text",
          value: lista.titulo,
          placeholder: "Nombre de la lista",
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            this.lista.closeSlidingItems();

          },
        },
        {
          text: "Actualizar",
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            // const listaId = this.deseosService.crearLista(data.titulo);
            lista.titulo = data.titulo;
            // Tengo que crear la lista
            // this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          },
        },
      ],
    });

    alert.present();
  }
}
