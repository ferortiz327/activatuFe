import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test : Date = new Date();

    constructor() { }

    ngOnInit() {}

    redirectToWhatsApp() {
        const phoneNumber = '573153468700';

        const message = 'Hola, me gustaría obtener más información.'; // Mensaje predefinido opcional
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    }
}
