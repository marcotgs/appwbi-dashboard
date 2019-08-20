import { LoginComponent } from "./login.component";
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';


describe('LoginComponent', () => {
    let fixture: ComponentFixture<LoginComponent> = null;

    beforeAll(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule
            ],
            declarations: [
                LoginComponent
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
    }));

    it('Should component to be truthy', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('Should component have a reactive login form', () => {
        const loginForm = fixture.debugElement.query(By.css('#loginForm'));
        expect(loginForm).toBeTruthy();
    });

    it('Should component form have reactive inputs', () => {
        const component = fixture.componentInstance;
        const inputValues = {
            email: 'test@test.com',
            password: '12345678',
        };
        component.loginForm.setValue(inputValues);
        expect(component.loginForm.value).toEqual(inputValues);
        expect(component.loginForm.valid).toBeTruthy();
    });

    it('Should component have function with error messages', () => {
        const emailErrors = fixture.componentInstance.getMessagesError('email');
        expect(emailErrors.length).not.toBeUndefined();
        expect(emailErrors[0].type).not.toBeNull();
    });
});