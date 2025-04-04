import { Routes } from '@angular/router';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './components/template-driven-form/template-driven-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'reactive-form', pathMatch: 'full' },
    { path: 'reactive-form', component: ReactiveFormComponent },
    { path: 'template-driven-form', component: TemplateDrivenFormComponent }
];
