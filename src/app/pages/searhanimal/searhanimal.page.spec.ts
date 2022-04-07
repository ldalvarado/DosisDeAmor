import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhanimalPage } from './searhanimal.page';

describe('SearhanimalPage', () => {
  let component: SearhanimalPage;
  let fixture: ComponentFixture<SearhanimalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearhanimalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearhanimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
