import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataParseService {
  constructor(private httpclient: HttpClient) {}

  dataParse(csvData) {
    var tempArray = csvData.split("\n");
    var tempcsvArray = new Array();
    var gradeList18 = [];
    var gradeList17 = [];

    for(var i = 0; i < tempArray.length; i++){
      tempcsvArray[i] = tempArray[i].split(",");
      //const grade = tempcsvArray[i][1];
      const difficult = tempcsvArray[i][2];
      const rank = tempcsvArray[i][4];
      if (difficult == 17) gradeList17.push(rank);
      if (difficult == 18) gradeList18.push(rank);
    }
    console.log(gradeList17);
    const list17 = this.countParseData(gradeList17);
    const list18 = this.countParseData(gradeList18);
    return { list17, list18 };
  }

  countParseData(data) {
    // 要素数を数える
    let count_S = data.filter(function(x){return x==='S'}).length;
    let count_AAAp = data.filter(function(x){return x==='AAA+'}).length;
    console.log(`AAA+:${count_AAAp}`);
    let count_AAA = data.filter(function(x){return x==='AAA'}).length;
    let count_AAp = data.filter(function(x){return x==='AA+'}).length; 
    let count_AA = data.filter(function(x){return x==='AA'}).length;
    let count_Ap = data.filter(function(x){return x==='A+'}).length; 
    let count_A = data.filter(function(x){return x==='A'}).length;
    let count_B = data.filter(function(x){return x==='B'}).length;
    let count_C = data.filter(function(x){return x==='C'}).length;
    let count_D = data.filter(function(x){return x==='D'}).length;

    return {'S': count_S, 'AAAp': count_AAAp, 'AAA': count_AAA, 'AAp': count_AAp, 'AA': count_AA, 
    'Ap': count_Ap, 'A': count_A, 'B': count_B, 'C': count_C, 'D': count_D};
  }


  getTable(data):Observable<any> {
    const url = 'http://localhost:5000/create_18table/' + data;
    console.log(data);
    return this.httpclient.get(url, {responseType: 'arraybuffer'});
  }

 

}