import { Control } from './Control';
import { action, makeObservable, observable } from 'mobx';

export class SliderControl extends Control {
  public value: number;
  public defaultValue: number;

  constructor(
    public object: {},
    public field: string,
    public step: number,
    public min: number,
    public max: number
  ) {
    super();
    this.defaultValue = this.object[this.field];
    this.value = this.object[this.field];
    makeObservable(this, {
      step: observable,
      min: observable,
      max: observable,
      value: observable,
      setValue: action,
    }, { autoBind: true })
  }

  setValue(value: number) {
    this.object[this.field] = value;
    this.value = value;
  }
}
