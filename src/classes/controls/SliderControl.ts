import { Control } from './Control';
import { action, makeObservable, observable } from 'mobx';
import ControlUIDataStore from "../../store/data/ControlUIDataStore";

export class SliderControl extends Control {
  public value: number;
  public defaultValue: number;

  public UIData: ControlUIDataStore;

  constructor(
    uiData: Partial<ControlUIDataStore>,
    public object: {},
    public field: string,
    public step: number,
    public min: number,
    public max: number
  ) {
    super();
    this.UIData = new ControlUIDataStore(uiData);
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
