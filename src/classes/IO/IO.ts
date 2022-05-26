import { action, makeObservable, observable, transaction } from 'mobx';
import type {Node} from "../Node";
import {IOType} from "../../types/IO";
import {generateUUID} from "../../utils/generateUUID";

type InvertIO<T> = T extends Output ? Input : Output;

class IOData<T> {
  ioType: IOType = null;
  node: Node = null;

  constructor() {}

  // connectTo(a: InvertIO<T>) {
  //   this.connectedTo = a;
  // }

  setNode(node: Node) {
    this.node = node;
  }
}

export default class IO<T> extends IOData<T> {
  shaderResultName: string;
  constructor() {
    super();
  }
}

export class Input extends IO<Input> {
  id = `IO${generateUUID()}`;
  connectedTo: Output | null;

  constructor() {
    super();
    this.connectedTo = null;

    makeObservable(this, {
      connectedTo: observable,
      connectTo: action,
      disconnect: action,
      _disconnect: action,

      node: observable,
      setNode: action,
    }, { autoBind: true });
  }

  get isConnected() {
    return !!this.connectedTo;
  }

  connectTo(io: Output) {
    transaction(() => {
      this._connectTo(io);
      io._connectTo(this);
    });
  }

  _disconnect() {
    this.connectedTo = null;
  }

  disconnect() {
    if (this.connectedTo instanceof Output) this.connectedTo._disconnect(this);
    this._disconnect();
  }

  _connectTo(io: Output) {
    this.connectedTo = io;
  }
}

export class Output extends IO<Output> {
  id = `IO${generateUUID()}`;
  connectedTo: IO<Input>[] | null;

  constructor() {
    super();
    this.connectedTo = [];

    makeObservable(this, {
      connectedTo: observable,
      connectTo: action,
      disconnect: action,
      _disconnect: action,

      node: observable,
      setNode: action,
    }, { autoBind: true });
  }

  get isConnected() {
    return Array.isArray(this.connectedTo) ? !!this.connectedTo.length : false;
  }

  connectTo(io: Input) {
    transaction(() => {
      this._connectTo(io);
      io._connectTo(this);
    });
  }

  _disconnect(io: Input) {
    const index = this.connectedTo.indexOf(io);
    this.connectedTo.splice(index, 1);
  }

  disconnect(io: Input) {
    this._disconnect(io);
    io._disconnect();
  }

  _connectTo(io: IO<Input>) {
    this.connectedTo.push(io);
  }
}

