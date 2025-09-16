import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;


    logoBlanco = '../../../assets/icon/logoBlanco.png';
    logoOscuro = '../../../assets/icon/logooscuro.png';
    logo = this.logoBlanco;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop = window.scrollY;
        this.logo = scrollTop > 50 ? this.logoOscuro : this.logoBlanco;
    }

    scrollToFormulario() {
        if (this.router.url === '/' || this.router.url === '/home') {
            const formulario = document.getElementById('formulario');
            if (formulario) {
                formulario.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navega a home y pasa una bandera de que debe hacer scroll
            this.router.navigate(['/home'], { state: { scrollToFormulario: true } });
        }
    }

    constructor(public location: Location, private element: ElementRef, private router: Router) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        if (titlee === '/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    redirectToWhatsApp() {
        const phoneNumber = '573103241930';

        const message = 'Hola, me gustaría obtener más información.'; // Mensaje predefinido opcional
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    }

}

