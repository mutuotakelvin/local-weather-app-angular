import { Component, OnInit } from '@angular/core';

import { ICurrentWeather } from '../interfaces';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current:ICurrentWeather | undefined

  constructor() {
    this.current = {
      city: 'Machakos',
      country: 'Kenya',
      date: new Date(),
      image: 'assets/img/cloud.ico',
      temperature: 72,
      description: 'cloudy',
    } as ICurrentWeather
  }

  ngOnInit(): void {
  }

}
