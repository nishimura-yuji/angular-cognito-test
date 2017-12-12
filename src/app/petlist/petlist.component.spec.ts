import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetlistComponent } from './petlist.component';

describe('PetlistComponent', () => {
  let component: PetlistComponent;
  let fixture: ComponentFixture<PetlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
