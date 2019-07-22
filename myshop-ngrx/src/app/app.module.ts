import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { sessionReducer } from './state/session.reducer';
import { SessionEffects } from './state/session.effects';

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule, 
    AppRouterModule, 
    HttpClientModule, 
    StoreModule.forRoot({
      "session" : sessionReducer
    }),
    EffectsModule.forRoot(
      [ SessionEffects ]
    ),
    StoreDevtoolsModule.instrument({
      name: 'MyShop',
      maxAge: 25,
      logOnly: false,
    })],
  declarations: [AppComponent, ContentComponent, HeaderComponent, FooterComponent, HomeComponent, ProductsComponent, LoginComponent, RegistrationComponent, ContactusComponent, ProductComponent, CartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
