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
        console.log(this.list);

        this.loading = false
        this.showTable = true
        this.showNoRecords = false
      }
    },(err) =>{
      console.log(err);

        if(err)
        {
          this.loading = false
          this.showTable = false
          this.showNoRecords = true
        }
    })
  }

}