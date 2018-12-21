import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatTabsModule, MatToolbarModule} from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SharedModule {}
