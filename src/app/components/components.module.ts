import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { StationComponent } from './station/station.component';
import { RegistrationComponent } from './registration/registration.component';
import { AboutchurchComponent } from './aboutchurch/aboutchurch.component';
import { QueHacemosComponent } from './que-hacemos/que-hacemos.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { TrainingSchoolFormComponent } from './training-school-form/training-school-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VolunteerFormComponent } from './volunteer-form/volunteer-form.component';
import { MinistriesFormComponent } from './ministries-form/ministries-form.component';
import { FamiliaPastoralComponent } from './familia-pastoral/familia-pastoral.component';
import { SedesComponent } from './sedes/sedes.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
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
        StationComponent,
        RegistrationComponent,
        AboutchurchComponent,
        QueHacemosComponent,
        MusicPlayerComponent,
        TrainingSchoolFormComponent,
        VolunteerFormComponent,
        MinistriesFormComponent,
        FamiliaPastoralComponent,
        SedesComponent
    ],
    entryComponents: [NgbdModalContent],
    exports: [ComponentsComponent,
        StationComponent,
        MusicPlayerComponent
    ]
})
export class ComponentsModule { }
