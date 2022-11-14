import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingItemsComponent } from './ranking-items.component';

describe('RankingItemsComponent', () => {
  let component: RankingItemsComponent;
  let fixture: ComponentFixture<RankingItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
