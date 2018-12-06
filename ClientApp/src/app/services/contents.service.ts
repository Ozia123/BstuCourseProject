import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentsNode } from 'src/app/models/contents-node.model';
import { contentsTree } from 'src/app/constants/contents';

@Injectable()
export class ContentsService {
    dataChange = new BehaviorSubject<ContentsNode[]>([]);

    get data(): ContentsNode[] { 
        return this.dataChange.value; 
    }
  
    constructor() {
      this.initialize();
    }
  
    initialize() {
      const dataObject = JSON.parse(contentsTree);
  
      const data = this.buildContentsTree(dataObject, 0);
  
      this.dataChange.next(data);
    }
  
    buildContentsTree(obj: object, level: number): ContentsNode[] {
        return Object.keys(obj).reduce<ContentsNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new ContentsNode();
            
            node.name = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildContentsTree(value, level + 1);
                } 
                else {
                    node.path = value;
                }
            }

            return accumulator.concat(node);
        }, []);
    }
}
