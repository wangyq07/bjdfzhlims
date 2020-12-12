import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';
import { ShareModule } from 'src/share/share.module';
import { X_CONFIG, XConfig } from '@ng-nest/ui/core';  
import {StompService}from 'ng2-stomp-service';
enableProdMode()
const ngNestConfig: XConfig = {
  components: {
    button: { size: 'large', round: true },
    tag: { dark: true },
    icon: {
      href: 'assets/icons/'
    }
  },
  theme: {
    colors: { primary: '#4a19d2' }
  }
};
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ShareModule, AppRoutesModule],
  providers: [ { provide: X_CONFIG, useValue: ngNestConfig },
         {provide:'stompService',useClass:StompService}

            /* {
               provide:InjectableRxStompConfig,
               useValue:stompConfig
             } ,
             {
                provide:RxStompService,
                useFactory:rxStompServiceFactory,
                deps:[InjectableRxStompConfig]
             }*/
             ],
  bootstrap: [AppComponent]
})
export class AppModule {}
