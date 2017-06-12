import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherListPage } from './teacher-list';

@NgModule({
  declarations: [
    TeacherListPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherListPage),
  ],
  exports: [
    TeacherListPage
  ]
})
export class TeacherListPageModule {}
