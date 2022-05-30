import { makeAutoObservable, reaction } from 'mobx';
import { Node, OutputNode } from '../classes/Node';
import {Input, Output } from '../classes/IO/IO';
import {AppRenderer} from "../classes/containers/Renderer";
import {generateShader, generateUniforms, sortTree} from "../modules/nodesSorting/sortTree";
import {Filter} from "pixi.js";
import {Image} from "../classes/nodes/input/Image";
import { PointerManager } from './modules/PointerManager';
import {TimeManager} from "./modules/TimeManager";

export default class Store {
  renders: number = 0;
  nodes: Node[] = [];
  selectedIO: Input | Output = null;
  outputNode: OutputNode = null;
  renderer: AppRenderer;
  boundInterval: any;
  uniforms: any;

  scale: number = 1.0;
  tx: number = 0.0;
  ty: number = 0.0;

  pointerManager: PointerManager = new PointerManager(this);
  timeManager: TimeManager = new TimeManager(this);

  setScale(scale) {
    this.scale = scale;
  }

  setTranslate(x, y) {
    this.tx = x;
    this.ty = y;
  }

  constructor() {
    const outputNode = new OutputNode();
    this.nodes.push(outputNode);
    this.setOutputNode(outputNode);

    this.renderer = new AppRenderer(2048, 2048);

    // @ts-ignore
    window.rend = this.renderer;

    this.boundInterval = this.render.bind(this);

    makeAutoObservable(this, {
      render: false
    }, { autoBind: true });

    window.requestAnimationFrame(this.boundInterval);

    this.renderer.canvas.style.width = '100%';
    this.renderer.canvas.style.objectFit = 'contain';
    this.renderer.canvas.style.top = '0';
    this.renderer.canvas.style.left = '0'
    this.renderer.canvas.style.transform = 'rotate(-180deg) scale(-1, 1)';
    this.renderer.canvas.style.maxHeight = '100%';
    this.renderer.canvas.style.maxWidth = '100%';
    setTimeout(() => {
      window.document.body.querySelector('#result').appendChild(this.renderer.canvas);
    }, 1000);

    window.addEventListener('mouseup', () => {
      if (this.selectedIO) {
        this.selectIO(null);
      }
    })

    reaction(() => this.nodes.reduce((prev, curr) => {
      const res = {
        inputs: [],
        images: [],
      };
      curr.inputs.forEach((input) => {
        // @ts-ignore
        res.inputs.push(input.connectedTo)
      })
      if (curr instanceof Image) {
        res.images.push(curr.bitmap.texture);
      }
      prev.push(res)
      return prev;
    }, []), () => {

      const sortedNodes = sortTree(this.outputNode)

      console.log(sortedNodes, '1');

      sortedNodes.splice(sortedNodes.length - 1, 1)

      console.log(sortedNodes, '2');

      const uniforms = generateUniforms(sortedNodes);
      const shader = generateShader(sortedNodes, this.outputNode)

      const filter = new Filter(
          null,
          shader,
          uniforms
      );

      this.renderer.container.filters = [filter];

      // this.nodes.forEach(node => {
      //   if (node instanceof Output) {
      //     node.requestProcessing().then(() => {
      //       runInAction(() => this.renders += 1)
      //       this.nodes.forEach(node => {
      //         // @ts-ignore
      //         node.rendered = false;
      //       })
      //     });
      //   }
      // })
    });
  }

  render() {
    this.renderer.renderer.render(this.renderer.container);
    this.timeManager.tick();
    window.requestAnimationFrame(this.boundInterval);
  }

  addNode(node: Node) {
    this.nodes.push(node);
  }

  selectIO(io: Input | Output) {
    this.selectedIO = io;
  }

  connectIO(io: any) {
    if (io instanceof Output && this.selectedIO instanceof Input) {
      this.selectedIO.disconnect();
      io.connectTo(this.selectedIO);
    }

    if (io instanceof Input && this.selectedIO instanceof Output) {
      io.disconnect();
      io.connectTo(this.selectedIO);
    }
  }

  setOutputNode(node: OutputNode) {
    this.outputNode = node;
  }

}
