import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WetherservicesService } from 'src/app/services/wetherservices.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: any;
  showNoRecords: boolean = false;
  submitted:boolean = false
  errorMessage: any;

  dataList:any  = []
  constructor(private fb:FormBuilder,private api:WetherservicesService){

  }
  weatherForm:FormGroup;
  loading:boolean = false
  showTable:boolean = false
  ngOnInit(): void {

    this.weatherForm = this.fb.group(
      {
        cityName:['',Validators.required]
      }
    )
  }
  get f()
  {
    return this.weatherForm.controls;
  }
  submit()
  {
    this.submitted = true;
    this.showTable = false
    if(this.weatherForm.invalid)
    {
      return
    }
    this.loading = true;
    this.api.getWetherByCity(this.weatherForm.get('cityName')?.value).subscribe((res) =>
    {
      console.log(res);
      if(res.cod ===  '200')
      {
        this.list = res.list
        this.loading = false
        this.showTable = true
        this.showNoRecords = false

        this.list.forEach((element: any) => {
          var a = element.dt_txt.split(" ");
          var date = a[0];
          console.log(this.dataList.length);

          if(this.dataList.length > 0)
          {
            console.log(this.dataList);

            let data = this.dataList.find((x:any) => x.date === date)
            if(data == undefined)
            {
              let obj = {
                date:date,
                wetherInfo:element
              }
              this.dataList.push(obj)
            }
          }
          else
          {
            let obj = {
              date:date,
              wetherInfo:element
            }
            this.dataList.push(obj)
          }
        });
      }
      else if(res.cod ===  '404')
      {
        this.loading = false
        this.showTable = false
        this.showNoRecords = true
      }

    },(err) =>{

      this.errorMessage = err;
      if(this.errorMessage != null)
      {
        this.list = [];
        this.loading = false
        this.showTable = false
        this.showNoRecords = true
      }
    })
  }

}
