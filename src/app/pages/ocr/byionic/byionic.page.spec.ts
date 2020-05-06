import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ByionicPage } from './byionic.page';

describe('ByionicPage', () => {
  let component: ByionicPage;
  let fixture: ComponentFixture<ByionicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByionicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ByionicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
