import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { TeacherDetailPage } from '../teacher-detail/teacher-detail'
/**
 * Generated class for the TeacherListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-teacher-list',
  templateUrl: 'teacher-list.html',
})
export class TeacherListPage {

	public teachers = [];

  	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams, 
  		public http: Http
  	) {}

  	ionViewDidLoad() {
    	this.http.get('http://localhost:3000/professores')
    		.toPromise().then((response) => {
    			this.teachers = response.json();
    		})
  	}

  	goToTeacherDetail(teacher){
  		this.navCtrl.push(TeacherDetailPage, {id: teacher.id})
  	}
}
