import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

	expandedEspecie = true;
	expandedEstatus = false;
	expandedSexo = true;

	constructor(private translate: TranslateService) { }

	ngOnInit() {
	}

	goToAccount(valor) {
		switch(valor) {
		  case 1:
		    this.expandedEspecie = true;
			this.expandedEstatus = false;
			this.expandedSexo = false;
		    break;
		  case 2:
		    this.expandedEspecie = false;
			this.expandedEstatus = true;
			this.expandedSexo = false;
		    break;
		  case 3:
		    this.expandedEspecie = false;
			this.expandedEstatus = false;
			this.expandedSexo = true;
		    break;
		  default:
		    this.expandedEspecie = true;
			this.expandedEstatus = false;
			this.expandedSexo = false;
			break;
		}

  	}

   /**
   * Refresca la página.
   * @param event
   */
 doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
