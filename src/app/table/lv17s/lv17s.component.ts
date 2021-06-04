import { Component, OnInit, Inject } from '@angular/core';
import { Difficult } from '../../indicate';
import { 
  DIFFICULTS_17P7,
  DIFFICULTS_17P6,
  DIFFICULTS_17P5,
  DIFFICULTS_17P4,
  DIFFICULTS_17P3,
  DIFFICULTS_17P2,
  DIFFICULTS_17P1,
  DIFFICULTS_17P0,
  DIFFICULTS_17M1,
  DIFFICULTS_17M2,
  DIFFICULTS_17M3,
  DIFFICULTS_17M4,
  DIFFICULTS_17M5,
  DIFFICULTS_17M6,
  DIFFICULTS_17M7
} from '../../lv17s-tables';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

// 以下追加したもの
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';

export interface DialogData {
  name: string;
  score: number;
}

@Component({
  selector: 'app-lv17s',
  templateUrl: './lv17s.component.html',
  styleUrls: ['./lv17s.component.css']
})
export class Lv17sComponent implements OnInit {

  difficults_17p7 = DIFFICULTS_17P7;
  difficults_17p6 = DIFFICULTS_17P6;
  difficults_17p5 = DIFFICULTS_17P5;
  difficults_17p4 = DIFFICULTS_17P4;
  difficults_17p3 = DIFFICULTS_17P3;
  difficults_17p2 = DIFFICULTS_17P2;
  difficults_17p1 = DIFFICULTS_17P1;
  difficults_17p0 = DIFFICULTS_17P0;
  difficults_17m1 = DIFFICULTS_17M1;
  difficults_17m2 = DIFFICULTS_17M2;
  difficults_17m3 = DIFFICULTS_17M3;
  difficults_17m4 = DIFFICULTS_17M4;
  difficults_17m5 = DIFFICULTS_17M5;
  difficults_17m6 = DIFFICULTS_17M6;
  difficults_17m7 = DIFFICULTS_17M7;
  selectedDifficult_17p7: Difficult;
  selectedDifficult_17p6: Difficult;
  selectedDifficult_17p5: Difficult;
  selectedDifficult_17p4: Difficult;
  selectedDifficult_17p3: Difficult;
  selectedDifficult_17p2: Difficult;
  selectedDifficult_17p1: Difficult;
  selectedDifficult_17p0: Difficult;
  selectedDifficult_17m1: Difficult;
  selectedDifficult_17m2: Difficult;
  selectedDifficult_17m3: Difficult;
  selectedDifficult_17m4: Difficult;
  selectedDifficult_17m5: Difficult;
  selectedDifficult_17m6: Difficult;
  selectedDifficult_17m7: Difficult;


  public csvStringData;
  csvControl;

  // selected file
  public selectedFile;
  public csvFile;
  public csvArray = new Array();
  public userFilePath;
  public storageRef;
  public dataActive = false;
  public viewDataActive = false;

  // ファイルのURL
  public uploadFileUrl;
  public uid;

  public getDataResult;

  constructor(
    private storage: AngularFireStorage,
    private store: AngularFirestore,
    public auth: AuthService,
    private http: HttpClient,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.csvStringData = this.formBuilder.group({
      csv: '',
    });
    this.csvControl = '';
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.uid = user.uid;
      const filePath = 'uploads/' + this.uid + '/' + 'score.csv';
      const storageRef = this.storage.ref(filePath);

      storageRef.getDownloadURL().subscribe(
        (result) => {
          this.uploadFileUrl = result;
          this.http.get(this.uploadFileUrl, {responseType: 'text'}).subscribe(
            (data) => {
              this.viewDataActive = true;
              this.getUploadCSVArray(data);
            }
          );
        },
        (error) => {
          console.log('pass');
        }
      );
    });

    this.dataActive = false;
  }

  ngAfterViewInit(){

    var element = document.createElement('a');//aタグを作ります
    element.setAttribute('href',"https://twitter.com/share?ref_src=twsrc%5Etfw");
    element.setAttribute('class',"twitter-share-button");
    element.setAttribute('data-size',"large");
    element.setAttribute('data-text',"シェアしたいテキスト！");
    element.setAttribute('data-url',"http://example.com");
    element.setAttribute('data-hashtags',"hogehoge");
    element.setAttribute('data-show-count',"false");

    var script = document.createElement('script');//scriptタグを作ります
    script.async = true;
    script.setAttribute('src',"https://platform.twitter.com/widgets.js");
    script.setAttribute('charset','utf-8');

    //aタグ、scriptタグの順で設置します
    var div = document.getElementById("div");//ボタンを置きたい場所の手前の要素を取得
    div.parentNode.insertBefore(element,div.nextSibling);//ボタンを置きたい場所にaタグを追加
    div.parentNode.insertBefore(script,div.nextSibling);//scriptタグを追加してJSを実行し、aタグをボタンに変身させる
  }
  

  selectFile(evt: any) {
    // ファイルを未選択で閉じた場合など。
    if (!evt.target || !evt.target.files || evt.target.files.length !== 1) {
      this.selectedFile = null;
      return;
    }
    this.selectedFile = evt.target.files[0];
  }


  async refrection() {
    this.dataActive = true;
  }

  async getData(xhrData: any) {
    console.log(xhrData);
    return await xhrData.send();
  }

  async upload() {
    if (!this.selectedFile) {
      return;
    }

    const user = this.auth.user;
    const filePath = 'uploads/' + this.uid + '/' + 'score.csv';
    const storageRef = this.storage.ref(filePath);

    // putまたはputStringであげる
    await storageRef.put(this.selectedFile, {'cacheControl': 'public, max-age=86400'});

    await storageRef.getDownloadURL().subscribe((result) => {
      this.uploadFileUrl = result;
      this.http.get(this.uploadFileUrl, {responseType: 'text'}).subscribe(
        (data) => {
          this.viewDataActive = true;
          this.getUploadCSVArray(data);
        }
      )
    });
  }

  onSelect_17p7(difficult: Difficult): void {
    this.selectedDifficult_17p7 = difficult;
  }
  onSelect_17p6(difficult: Difficult): void {
    this.selectedDifficult_17p6 = difficult;
  }
  onSelect_17p5(difficult: Difficult): void {
    this.selectedDifficult_17p5 = difficult;
  }
  onSelect_17p4(difficult: Difficult): void {
    this.selectedDifficult_17p4 = difficult;
  }
  onSelect_17p3(difficult: Difficult): void {
    this.selectedDifficult_17p3 = difficult;
  }
  onSelect_17p2(difficult: Difficult): void {
    this.selectedDifficult_17p2 = difficult;
  }
  onSelect_17p1(difficult: Difficult): void {
    this.selectedDifficult_17p1 = difficult;
  }
  onSelect_17p0(difficult: Difficult): void {
    this.selectedDifficult_17p0 = difficult;
  }
  onSelect_17m1(difficult: Difficult): void {
    this.selectedDifficult_17m1 = difficult;
  }
  onSelect_17m2(difficult: Difficult): void {
    this.selectedDifficult_17m2 = difficult;
  }
  onSelect_17m3(difficult: Difficult): void {
    this.selectedDifficult_17m3 = difficult;
  }
  onSelect_17m4(difficult: Difficult): void {
    this.selectedDifficult_17m4 = difficult;
  }
  onSelect_17m5(difficult: Difficult): void {
    this.selectedDifficult_17m5 = difficult;
  }
  onSelect_17m6(difficult: Difficult): void {
    this.selectedDifficult_17m6 = difficult;
  }
  onSelect_17m7(difficult: Difficult): void {
    this.selectedDifficult_17m7 = difficult;
  }

  getUploadCSVArray(data) {
    //console.log(data);
    interface User {
      name: string;
      grade: string;
      difficult: number;
      rank: string;
      score: number;
    }
    interface UserDictionary {
      [id: string]: User;
    }
    const dic: UserDictionary = {};
    
    var tempArray = data.split("\n");
    var tempcsvArray = new Array();
    
    for(var i = 0; i < tempArray.length; i++){
      tempcsvArray[i] = tempArray[i].split(",");
      const name = tempcsvArray[i][0];
      const grade = tempcsvArray[i][1];
      const difficult = tempcsvArray[i][2];
      const rank = tempcsvArray[i][4];
      const score = tempcsvArray[i][5];
    
      if (difficult == 17){
        dic[name] = { name: name, grade: grade, difficult: difficult, rank: rank, score: score}
      }
    }
    
    for(var i = 0; i < this.difficults_17p7.length; i++){
      var musicname = this.difficults_17p7[i].name;
      try {
        this.difficults_17p7[i].rank = dic[musicname].rank;
        this.difficults_17p7[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p7[i].rank = '-' }
    }
        
    for(var i = 0; i < this.difficults_17p6.length; i++){
      var musicname = this.difficults_17p6[i].name;
      try {
        this.difficults_17p6[i].rank = dic[musicname].rank;
        this.difficults_17p6[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p6[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17p5.length; i++){
      var musicname = this.difficults_17p5[i].name;
      try {
        this.difficults_17p5[i].rank = dic[musicname].rank;
        this.difficults_17p5[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p5[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17p4.length; i++){
      var musicname = this.difficults_17p4[i].name;
      try {
        this.difficults_17p4[i].rank = dic[musicname].rank;
        this.difficults_17p4[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p4[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17p3.length; i++){
      var musicname = this.difficults_17p3[i].name;
      try {

        this.difficults_17p3[i].rank = dic[musicname].rank;
        this.difficults_17p3[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p3[i].rank = '-'}
    }

    for(var i = 0; i < this.difficults_17p2.length; i++){
      var musicname = this.difficults_17p2[i].name;
      try {
        this.difficults_17p2[i].rank = dic[musicname].rank;
        this.difficults_17p2[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p2[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17p1.length; i++){
      var musicname = this.difficults_17p1[i].name;
      try {
        this.difficults_17p1[i].rank = dic[musicname].rank;
        this.difficults_17p1[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p1[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17p0.length; i++){
      var musicname = this.difficults_17p0[i].name;
      try {
        this.difficults_17p0[i].rank = dic[musicname].rank;
        this.difficults_17p0[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17p0[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17m1.length; i++){
      var musicname = this.difficults_17m1[i].name;
      try {
        this.difficults_17m1[i].rank = dic[musicname].rank;
        this.difficults_17m1[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17m1[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17m2.length; i++){
      var musicname = this.difficults_17m2[i].name;
      try {
        this.difficults_17m2[i].rank = dic[musicname].rank;
        this.difficults_17m2[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17m2[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17m3.length; i++){
      var musicname = this.difficults_17m3[i].name;
      try {
        this.difficults_17m3[i].rank = dic[musicname].rank;
        this.difficults_17m3[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17m3[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17m4.length; i++){
      var musicname = this.difficults_17m4[i].name;
      try {
        this.difficults_17m4[i].rank = dic[musicname].rank;
        this.difficults_17m4[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17m4[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17m5.length; i++){
      var musicname = this.difficults_17m5[i].name;
      try {
        this.difficults_17m5[i].rank = dic[musicname].rank;
        this.difficults_17m5[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17m5[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17m6.length; i++){
      var musicname = this.difficults_17m6[i].name;
      try {
        this.difficults_17m6[i].rank = dic[musicname].rank;
        this.difficults_17m6[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17m6[i].rank = '-' }
    }

    for(var i = 0; i < this.difficults_17m7.length; i++){
      var musicname = this.difficults_17m7[i].name;
      try {
        this.difficults_17m7[i].rank = dic[musicname].rank;
        this.difficults_17m7[i].score = dic[musicname].score;
      } catch (e) { this.difficults_17m7[i].rank = '-' }
    }
  }


  async onLoadData(csvData: any) {
    console.log(csvData.csv);
    const blob = new Blob([csvData.csv],{type:"text/plan"});

    const user = this.auth.user;
    const filePath = 'uploads/' + this.uid + '/' + 'score.csv';
 
    const storageRef = this.storage.ref(filePath);
    // putまたはputStringであげる
    await storageRef.put(blob, {'cacheControl': 'public, max-age=86400'});

    await storageRef.getDownloadURL().subscribe((result) => {
      this.uploadFileUrl = result;
      this.http.get(this.uploadFileUrl, {responseType: 'text'}).subscribe(
        (data) => {
          this.viewDataActive = true;
          this.getUploadCSVArray(data);
        }
      )
    });
  }

  openDialog(lv17: Difficult) {
    this.dialog.open(DialogDataLv17Dialog, {
      data: {
        name: lv17.name,
        score: lv17.score
      }
    });
  }

}

@Component({
  selector: 'dialog-data-lv17-dialog',
  templateUrl: 'dialog-data-lv17-dialog.html',
})
export class DialogDataLv17Dialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}