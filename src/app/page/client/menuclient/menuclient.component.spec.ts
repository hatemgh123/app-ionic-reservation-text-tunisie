import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuclientComponent } from './menuclient.component';

describe('MenuclientComponent', () => {
  let component: MenuclientComponent;
  let fixture: ComponentFixture<MenuclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuclientComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
