import { useStore } from '../store/provider/StoreProvider';
import { OutputNode, RenderableNode } from '../classes/Node';
import { OutputNodeView } from './TestNodes/Output';
import { BCS } from '../classes/nodes/colorCorrection/BCS';
import { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RenderNode } from './TestNodes/RenderNode';
import React from 'react';
import { Image } from '../classes/nodes/input/Image';
import { decode as tiffDecode } from 'tiff';
import split16BitImageDataTo8BitChunks from '../utils/split16BitImageDataTo8BitChunks';
import { Bitmap } from '../classes/data/Bitmap';
import { InputNode } from './TestNodes/Input';
import {generateShader, sortTree} from "../modules/nodesSorting/sortTree";
import {BitmapChannelSplitter} from "../classes/nodes/imageUtils/BitmapChannelSplitter";
import { BitmapChannelCombiner } from '../classes/nodes/imageUtils/BitmapChannelCombiner';
import { NumberMath } from '../classes/math/NumberMath';
import {Blend} from "../classes/nodes/mix/Blend";
import '../global/styles/index.css';
import { Group } from './generic/view/Group';
import {
  NodeElement,
  NodeElementHeader,
  NodeElementHeaderIcon,
  NodeElementHeaderTitle
} from "./generic/view/NodeView/styles";
import { ArrowDown } from './icons/ArrowDown';
import NodeView from './generic/view/NodeView';
import Slider from './controls/slider';

export const NodesView = observer(() => {

  const store = useStore();

  const isPointerShown = store.isPointerShown;

  const addNode = useCallback((node: any) => {
    store.addNode(new node())
  }, [store]);

  useEffect(() => {
    // @ts-ignore
    window.sortTree = sortTree;
    // @ts-ignore
    window.generateShader = generateShader;
    fetch('./example_2.tif').then(res => res.arrayBuffer()).then(async (arrayBuf) => {
      const decodedTiff = (tiffDecode(arrayBuf, { onlyFirst: true }))[0];

      if (decodedTiff.data instanceof Uint16Array) {
        const [part, bytes_2] = split16BitImageDataTo8BitChunks(decodedTiff.data);

        let bytes_1 = part;

        if (!decodedTiff.alpha) {
          let newBytes = new Uint8Array(decodedTiff.width * decodedTiff.height * 4);
          for (let i = 0; i < bytes_1.length; i++) {
            newBytes[i + Math.floor(i / 3)] = bytes_1[i];
          }
          for (let i = 0; i < newBytes.length; i++) {
            if ((i + 1) % 4 === 0) {
              newBytes[i] = 255;
            }
          }
          bytes_1 = newBytes;
        }

        const inputImg = new Image();
        store.addNode(inputImg)
        // const outputNode = new Output();
        // store.addNode(outputNode);
        // store.setOutputNode(outputNode);

        inputImg.bitmap.setBitmap(new Bitmap(bytes_1, decodedTiff.width, decodedTiff.height))
      }
    });
  }, []);

  return (
    <div style={{ cursor: isPointerShown ? 'default' : 'none'}}>
      <button onClick={() => addNode(Image)}>add img</button>
      <button onClick={() => addNode(Blend)}>add blend</button>
      <button onClick={() => addNode(BCS)}>add bcs</button>
      <button onClick={() => addNode(BitmapChannelSplitter)}>add ch splitter</button>
      <button onClick={() => addNode(BitmapChannelCombiner)}>add ch combiner</button>
      <button onClick={() => addNode(NumberMath)}>add number math</button>
      <NodeView title={"Number"}>
        <Group>
          {/*<Slider />*/}
        </Group>
      </NodeView>
      {/*<Group>A</Group>*/}
      {/*<Group>B</Group>*/}
      {/*<Group>C</Group>*/}
      {/*<Group>*/}
      {/*  <Group>A</Group>*/}
      {/*  <Group>A</Group>*/}
      {/*  <Group>A</Group>*/}
      {/*</Group>*/}
      {
        store.nodes.map((node, i) => {
          if (node instanceof Image) {
            return <InputNode key={i} node={node} />
          }

          if (node instanceof RenderableNode) {
            return <RenderNode key={i} node={node} />;
          }
        })
      }

      {
        store.nodes.map((node, i) => {
          if (node instanceof OutputNode) {
            return <OutputNodeView key={i} node={node} />;
          }
        })
      }
    </div>
  );
});
