import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { injectSpy } from 'angular-unit-test-helper';
import { of } from 'rxjs';

import { WeatherService } from '../weather/weather.service';
import { fakeWeather } from '../weather/weather.service.fake';
import { WeatherServiceFake } from '../weather/weather.service.fake';
import { CurrentWeatherComponent } from './current-weather.component';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async(()=>{
    const weatherServiceSpy = jasmine.createSpyObj(
      'WeatherService',
      ['getCurrentWeather']
    )
    TestBed.configureTestingModule({
      declarations:[],
      providers:[{
        provide: WeatherService, useClass:weatherServiceSpy
      }],
    }).compileComponents()
    weatherServiceMock = injectSpy(WeatherService)
  }))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    // Act
    fixture.detectChanges() //triggers ngOnInit()
    // Assert
    expect(component).toBeTruthy();
  });

  it('should get currentWeather from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of())
    // Act
    fixture.detectChanges() // triggers ngOnInit()
    // Assert
    expect(weatherServiceMock.getCurrentWeather)
      .toHaveBeenCalledTimes(1)
  })

  it('should eagerly load currentWeather in Machakos from weatherService', () => {
    // Arrange
    weatherServiceMock.getCurrentWeather
      .and.returnValue(of(fakeWeather))
    // Act
    fixture.detectChanges() // triggers ngOnInit()
    // Assert
    expect(component.current).toBeDefined()
    expect(component.current.city).toEqual('Machakos')
    expect(component.current.temperature).toEqual(280.32)
    // Assert on DOM
    const debugEl = fixture.debugElement
    const titleEl: HTMLElement = debugEl.query(By.css('span'))
      .nativeElement
    expect(titleEl.textContent).toContain('Machakos')
  })
});
