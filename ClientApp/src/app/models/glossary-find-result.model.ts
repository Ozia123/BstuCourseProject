import { GlossaryItemModel } from './glossary-item.model';

export class GlossaryFindResultModel {
    public searchString: string;

    public items: Array<GlossaryItemModel>;
}