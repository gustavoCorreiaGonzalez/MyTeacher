import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

/**
 * Generated class for the TeacherDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-teacher-detail',
  templateUrl: 'teacher-detail.html',
})
export class TeacherDetailPage {

	public teacher = null;

  	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams, 
  		public http: Http
  	) {}

  	ionViewDidLoad() {
    	this.http.get(`http://localhost:3000/professores/professor/${this.navParams.get('id')}`)
    		.toPromise().then((response) => {
    			this.teacher = response.json();
    		})
  	}

}
