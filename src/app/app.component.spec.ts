import { TestBed } from '@angular/core/testing'
import {createComponentMock} from 'angular-unit-test-helper'

import { AppComponent } from './app.component'
import { CurrentWeatherComponent } from './current-weather/current-weather.component'

TestBed.configureTestingModule({
  declarations:[
    createComponentMock('CurrentWeatherComponent')
  ]
})
describe('AppComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports:[...,MaterialModule],
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    expect(compiled.querySelector('span')?.textContent).toContain(
      'WeatherMe'
    )
  })
})

