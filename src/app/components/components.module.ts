import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { RouterModule } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DonationsComponent } from './donations/donations.component';
import { BeliefComponent } from './belief/belief.component';
import { MaterialModule } from 'app/shared/material/material.module';
import { ModalPromotionsComponent } from './modal-promotions/modal-promotions.component';
import { MissionsComponent } from './missions/missions.component';
import { MisionEsperanzaModalComponent } from './mision-esperanza-modal/mision-esperanza-modal.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        MaterialModule
    ],
    declarations: [
        ComponentsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalComponent,
        NgbdModalContent,
        CalendarComponent,
        DonationsComponent,
        BeliefComponent,
        ModalPromotionsComponent,
        MissionsComponent,
        MisionEsperanzaModalComponent
    ],
    entryComponents: [NgbdModalContent],
    exports:[ ComponentsComponent]
})
export class ComponentsModule { }
