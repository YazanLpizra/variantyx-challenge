import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-not-found',
    template: `
    <h1> 404 You must be lost! </h1>
    <button mat-raised-button (click)="goHome()"> Go Home </button>
    `
})
export class NotFoundComponent {

    constructor(private router: Router) {
    }

    goHome() {
        this.router.navigate(['']);
    }
}
