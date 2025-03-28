import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { SessionService } from '../../services/session.service';
@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterModule,PanelMenuModule, TagModule, MenuModule, MenubarModule, SidebarModule, ButtonModule, ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  sidebarVisible = false;
  isMobile = false;  // Gère la visibilité du menu hamburger
  adminMenu: MenuItem[] = [];
  memberMenu: MenuItem[] = [];
  sessionService = inject(SessionService);

  ngOnInit() {
    this.adminMenu = [
      { label: 'Accueil', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Liste des membres', icon: 'pi pi-user', routerLink: '/member' },
      { label: 'Créer un membre', icon: 'pi pi-user-plus', routerLink: '/member/register' },
      { label: 'Liste des tournois', icon: 'pi pi-list', routerLink: '/tournament' },
      { label: 'Créer un tournoi', icon: 'pi pi-calendar-plus', routerLink: '/tournament/create' },
    ];
    this.memberMenu = [
      { label: 'Accueil', icon: 'pi pi-home', routerLink: '/home' },
      { label: 'Liste des tournois', icon: 'pi pi-list', routerLink: '/tournament' },
    ];
    this.updateScreenSize();  // Vérifie la taille de l'écran au chargement
  }

  // Cette méthode met à jour la variable isMobile en fonction de la largeur de l'écran
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScreenSize();
  }

  private updateScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
}
