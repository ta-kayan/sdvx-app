import { Component, OnInit } from '@angular/core';
import { Difficult } from '../../indicate';
import { DIFFICULTS_18P7, DIFFICULTS_18P6, } from '../../lv18s-tables';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';

// 以下追加したもの
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-difficult',
  templateUrl: './difficult.component.html',
  styleUrls: ['./difficult.component.css']
})
export class DifficultComponent implements OnInit {

  difficults_18p7 = DIFFICULTS_18P7;
  difficults_18p6 = DIFFICULTS_18P6;
  selectedDifficult_18p7: Difficult;
  selectedDifficult_18p6: Difficult;

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

  onSelect_18p7(difficult: Difficult): void {
    this.selectedDifficult_18p7 = difficult;
  }
  onSelect_18p6(difficult: Difficult): void {
    this.selectedDifficult_18p6 = difficult;
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
    
      if (difficult == 18){
        dic[name] = { name: name, grade: grade, difficult: difficult, rank: rank, score: score}
      }
    }
    console.log(dic);
    
    for(var i = 0; i < this.difficults_18p7.length; i++){
      var musicname = this.difficults_18p7[i].name;
      //console.log(musicname);
      try {
        this.difficults_18p7[i].rank = dic[musicname].rank;
        this.difficults_18p7[i].score = dic[musicname].score;
      } catch (e) {}
    }
        
    for(var i = 0; i < this.difficults_18p6.length; i++){
      var musicname = this.difficults_18p6[i].name;
      //console.log(musicname);
      try {
        //console.log(dic[musicname].name);
        this.difficults_18p6[i].rank = dic[musicname].rank;
        this.difficults_18p6[i].score = dic[musicname].score;
      } catch (e) {}
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

}