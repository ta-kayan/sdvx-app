import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient } from '@angular/common/http';

// 以下追加したもの
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { DataParseService } from './../../services/data.service';

export interface PeriodicElement {
  level: number;
  gradeB: number;
  gradeC: number;
  gradeD: number;
  gradeAp: number;
  gradeAAp: number;
  gradeAAAp: number;
  gradeA: number;
  gradeAA: number;
  gradeAAA: number;
  gradeS: number;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  public userInfo;
  private uid;
  private parseData;

  public S18;
  public AAA18;
  public AA18;
  public A18;

  displayedColumns: string[] = ['Level', 'A', 'Ap', 'AA', 'AAp', 'AAA', 'AAAp', 'S'];
  
  public elementData: PeriodicElement[] = [
    {level: 17, gradeD: 0, gradeC: 0, gradeB: 0, gradeA: 0, gradeAp: 0, gradeAA: 0, gradeAAp: 0, gradeAAA: 0, gradeAAAp: 0, gradeS: 0},
    {level: 18, gradeD: 0, gradeC: 0, gradeB: 0, gradeA: 0, gradeAp: 0, gradeAA: 0, gradeAAp: 0, gradeAAA: 0, gradeAAAp: 0, gradeS: 0},
  ];


  constructor(
    public auth: AuthService,
    private parse: DataParseService,
    private router: Router,
    private http: HttpClient,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.userInfo = user;
      this.uid = user.uid;
      const filePath = 'uploads/' + this.uid + '/' + 'score.csv';
      const storageRef = this.storage.ref(filePath);

      storageRef.getDownloadURL().subscribe(
        (result) => {
          this.http.get(result, {responseType: 'text'}).subscribe(
            (data) => {
              this.parseData = this.parse.dataParse(data);
              this.elementData[1]['gradeS'] = this.parseData.list18.S;
              this.elementData[1]['gradeAAA'] = this.parseData.list18.AAA;
              this.elementData[1]['gradeAA'] = this.parseData.list18.AA;
              this.elementData[1]['gradeA'] = this.parseData.list18.A;
              this.elementData[1]['gradeAAAp'] = this.parseData.list18.AAAp;
              this.elementData[1]['gradeAAp'] = this.parseData.list18.AAp;
              this.elementData[1]['gradeAp'] = this.parseData.list18.Ap;
              this.elementData[1]['gradeB'] = this.parseData.list18.B;
              this.elementData[1]['gradeC'] = this.parseData.list18.C;
              this.elementData[1]['gradeD'] = this.parseData.list18.D;
              this.elementData[0]['gradeS'] = this.parseData.list17.S;
              this.elementData[0]['gradeAAA'] = this.parseData.list17.AAA;
              this.elementData[0]['gradeAA'] = this.parseData.list17.AA;
              this.elementData[0]['gradeA'] = this.parseData.list17.A;
              this.elementData[0]['gradeAAAp'] = this.parseData.list17.AAAp;
              this.elementData[0]['gradeAAp'] = this.parseData.list17.AAp;
              this.elementData[0]['gradeAp'] = this.parseData.list17.Ap;
              this.elementData[0]['gradeB'] = this.parseData.list17.B;
              this.elementData[0]['gradeC'] = this.parseData.list17.C;
              this.elementData[0]['gradeD'] = this.parseData.list17.D;
            }
          );
        },
        (error) => {
          console.log('pass');
        }
      );
    });

  }

  logout() {
    this.auth.logout();
  }

  onGetLv18Table() {
    this.parse.getTable(this.uid).subscribe((blob) => {
      console.log(blob);
      const url = window.URL.createObjectURL(new Blob([blob], {type: 'image/png'}));
      let title = "lv18.png";
      
      // aタグを作成して無理やりクリック -> ダウンロード機能発火
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = title;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  onEditClick() {
    this.auth.user.subscribe(user => {
      if (user !== null) {
        this.router.navigate(['useredit']);
      }
      else{
        this.router.navigate(['login']);
      }
    });
  }

}