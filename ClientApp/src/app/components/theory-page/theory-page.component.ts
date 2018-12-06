import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { translations } from '../../constants/translations';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-theory-page',
    templateUrl: './theory-page.component.html',
    styleUrls: ['./theory-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TheoryPageComponent implements OnInit {
    private lastPage: number;

    public page: number;
    
    public constructor(
        private readonly route: ActivatedRoute, 
        private readonly router: Router,
        private readonly translationService: TranslationService) {
    }
    
    public ngOnInit() {
        this.lastPage = this.getLastPage();

        this.route.params.subscribe(params => {
            window.scroll(0, 0);
            
            this.page = params['page'];

            if (this.page < 1 || this.page > this.lastPage) {
                this.router.navigate(['/']);
            }
        });
    }

    private getLastPage(): number {
        const language = this.translationService.getCurrentLanguage();

        const pages = Object.keys(translations[language]['theory-page']).length - 1;

        return pages;
    }

    public getNextPageUrl(): string {
        if (this.page == this.lastPage) {
            return '/contents';
        }

        const nextPage: number = +this.page + 1;
        return `/page/${nextPage}`;
    }

    public getPreviousPageUrl(): string {
        const prevPage: number = +this.page - 1;
        return `/page/${prevPage}`;
    }
}
