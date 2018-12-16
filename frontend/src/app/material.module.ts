/*
* The idea of creating a new Angular module (@NgModule) is to centralize what you will import from Angular Material in a single file.
* So, before adding Angular Material components in this file, you will need to import and configure it in your main module.
* */

import {NgModule} from '@angular/core';

@NgModule({
  imports: [],
  exports: []
})
export class MaterialModule {}
