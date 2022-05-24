import { makeAutoObservable } from 'mobx';

export default class NodeUIDataStore {
  width: number;
  height: number;
  x: number;
  y: number;
  title: string;
  inputs: any[];
  outputs: any[];

  constructor(data?: Partial<NodeUIDataStore>) {
    this.update(
      Object.assign(
        {
          x: 0,
          y: 0,
          title: 'NodeDefaultTitle',
          inputs: [],
          outputs: [],
          width: 300,
          height: 300,
        },
        data
      )
    );
    makeAutoObservable(this, {}, { autoBind: true })
  }

  update(data: Partial<NodeUIDataStore>): void {
    Object.assign(this, data)
  }
}
