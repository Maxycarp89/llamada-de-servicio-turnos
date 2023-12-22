import { Component, OnInit,ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ChartsService } from 'src/app/core/services/charts.service';
import { headers } from './data';

export interface TurnData {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
    selector: 'app-turnos',
    templateUrl: './turnos.component.html',
    styleUrls: ['./turnos.component.scss'],
  })

export class TurnosComponent implements OnInit {
  

  headers: string[] = headers


  constructor(private chartService: ChartsService) { 

  }
  ngOnInit(): void {
 
  }
  
}