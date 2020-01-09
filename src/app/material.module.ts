import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSortModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatAutocompleteModule
    ]
})
export class MaterialModule {}