import { JsonPipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, merge, mergeMap, Observable, observable, of, tap } from 'rxjs';

import { ApiService } from 'src/app/services/api.service';
import { Welcome } from 'src/app/types/api';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})



export class DetailComponent implements OnInit {
GetCurrency(arg0: import("src/app/types/api").Currency[]) {
throw new Error('Method not implemented.');
}


  $country: Observable<Welcome>;
  trusted: any;
  $borderCountry: Observable<Welcome[]>;
  data: any;
  urls: any;
  array : string[] = [];
  public getJsonValue: any;
  constructor(private api:ApiService, private route:ActivatedRoute, private sanitizer:DomSanitizer) { }

  mytrusdetUrl: any;
  myFlag: any;
  

  ngOnInit(): void {
    
    this.route.params.subscribe(params =>{
      this.$country = this.api.GetcountryByname(params.Country)
      .pipe(tap((res)=> res),
      mergeMap(res =>{
        JSON.stringify(res)
        
        this.data= this.api.getImage(res.name).subscribe((res) => {
          //console.log(res);
          JSON.stringify(this.getJsonValue)
          this.getJsonValue = res;
          for (let i = 0; i < 20; i++) {
            let url = this.getJsonValue.hits[i].largeImageURL;
            this.mytrusdetUrl = this.sanitizer.bypassSecurityTrustUrl(url)
            this.urls = url;
            this.array.push(this.urls);
          }
          //console.log(this.array)


        })

        if(JSON.stringify(res).includes("border"))
        {
          //console.log(res.flag)
          console.log("has border")
          this.$borderCountry = this.api.GetFullCountry(res.borders)
        }else{
          console.log("No Borders")
        }

        return of(res)
      }))
    })
    
  }

  

}
  