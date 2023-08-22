import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { ProductoModule } from './producto/producto.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PedidosModule } from './pedidos/pedidos.module';
import { DireccionesModule } from './direcciones/direcciones.module';
import { MetodopagoModule } from './metodopago/metodopago.module';
import { ComentarioModule } from './comentario/comentario.module';
import { ReporteModule } from './reporte/reporte.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // Modulos
    CoreModule,
    ShareModule,
    //todos los demas modulos 
    HomeModule,
    UserModule,
    ProductoModule,
    PedidosModule,
    DireccionesModule,
    MetodopagoModule, 
    ComentarioModule,
    ReporteModule, 
    // Debe ser el ultimo
    AppRoutingModule,
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
