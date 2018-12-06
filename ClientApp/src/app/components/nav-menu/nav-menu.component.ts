import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
    public constructor(private readonly translationService: TranslationService,
        private readonly router: Router) {
    }

    public ngOnInit() {
    }

    public changeLanguage(language: string) {
        this.translationService.changeCurrentLanguage(language);

        const currentPage = window.location.pathname;
        
        this.router.navigateByUrl('', { skipLocationChange: true })
            .then(() =>
                this.router.navigate([currentPage])
            );
    }
}
