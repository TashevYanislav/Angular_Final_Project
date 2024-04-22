import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularGamesLoaderComponent } from './popular-games-loader.component';

describe('PopularGamesLoaderComponent', () => {
  let component: PopularGamesLoaderComponent;
  let fixture: ComponentFixture<PopularGamesLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopularGamesLoaderComponent]
    });
    fixture = TestBed.createComponent(PopularGamesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
