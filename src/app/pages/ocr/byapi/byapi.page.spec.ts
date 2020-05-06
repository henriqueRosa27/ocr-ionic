import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ByapiPage } from './byapi.page';

describe('ByapiPage', () => {
  let component: ByapiPage;
  let fixture: ComponentFixture<ByapiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByapiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ByapiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
