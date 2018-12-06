import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Observable, of as observableOf } from 'rxjs';

import { ContentsFlatNode } from 'src/app/models/contents-flat-node.model';
import { ContentsNode } from 'src/app/models/contents-node.model';
import { ContentsService } from 'src/app/services/contents.service';

@Component({
    selector: 'app-contents',
    templateUrl: 'contents.component.html',
    styleUrls: ['contents.component.scss']
})
export class ContentsComponent implements OnInit {
    treeControl: FlatTreeControl<ContentsFlatNode>;
    treeFlattener: MatTreeFlattener<ContentsNode, ContentsFlatNode>;
    dataSource: MatTreeFlatDataSource<ContentsNode, ContentsFlatNode>;

    public constructor(private readonly contentsService: ContentsService) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
        this._isExpandable, this._getChildren);
        this.treeControl = new FlatTreeControl<ContentsFlatNode>(this._getLevel, this._isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    }

    public ngOnInit() {
        this.contentsService.dataChange
            .subscribe(data => this.dataSource.data = data);
    }

    transformer = (node: ContentsNode, level: number) => 
        new ContentsFlatNode(!!node.children, node.name, node.path, level);

    hasChild = (_: number, _nodeData: ContentsFlatNode) => 
        _nodeData.expandable;

    private _getLevel = (node: ContentsFlatNode) => 
        node.level;

    private _isExpandable = (node: ContentsFlatNode) => 
        node.expandable;

    private _getChildren = (node: ContentsNode): Observable<ContentsNode[]> => 
        observableOf(node.children);
}
