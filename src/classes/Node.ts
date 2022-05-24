import NodeUIDataStore from '../store/data/NodeUIDataStore';
import {BitmapInput} from './IO/Bitmap/BitmapInput';
import {Input, Output} from './IO/IO';
import {action, makeObservable, observable} from 'mobx';
import {Control} from './controls/Control';
import {IOType} from "../types/IO";

export class Node {
  UIData: NodeUIDataStore = new NodeUIDataStore();

  controls: Control[] = []
  inputs: Input[] = []
  outputs: Output[] = []

  constructor() {
    makeObservable(this, {
      inputs: observable,
      outputs: observable,
      controls: observable,
      setInputs: action,
      setOutputs: action,
      setControls: action,
    })
  }

  setInputs(inputs: Input[]) {
    this.inputs = inputs;
  }

  setOutputs(outputs: Output[]) {
    this.outputs = outputs;
  }

  setControls(controls: Control[]) {
    this.controls = controls;
  }
}

export class RenderableNode extends Node {
  constructor() {
    super();
  }
}

// TODO: rename to OutputNode?

export class OutputNode extends Node {
  input: BitmapInput = new BitmapInput('bitmap', this, IOType.Bitmap);

  constructor() {
    super();
    this.setInputs([this.input]);
  }
}
