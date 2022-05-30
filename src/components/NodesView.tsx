import { useStore } from '../store/provider/StoreProvider';
import { OutputNode, RenderableNode } from '../classes/Node';
import { OutputNodeView } from './TestNodes/Output';
import { BCS } from '../classes/nodes/colorCorrection/BCS';
import {useCallback, useEffect, useRef} from 'react';
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
import {clamp} from "../utils/clamp";
import {Number} from "../classes/nodes/input/Number";
import {Time} from "../classes/nodes/input/Time";
import {UVNode} from "../classes/nodes/input/UV";


export const NodesView = observer(() => {

  const store = useStore();

  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) return;
    let scale = 1;
    let tx = 0;
    let ty = 0;
    window.addEventListener('wheel', (evt) => {

        evt.preventDefault();

        if (evt.ctrlKey) {
            const center = [store.pointerManager.x, store.pointerManager.y];
            let newTx, newTy, newScale;

            newScale = clamp(scale - evt.deltaY * 0.01, 0.2, 2);

            // calculate new translate position
            // [current mouse position] - ([current mouse position] - [current translate]) * magnification
            newTx = center[0] - (center[0] - tx) * newScale / scale;
            newTy = center[1] - (center[1] - ty) * newScale / scale;

            // set new scale and translate position
            scale = newScale;
            tx = newTx;
            ty = newTy;
        } else {
            // Your trackpad X and Y positions
            tx -= evt.deltaX * clamp(scale, 0, 1);
            ty -= evt.deltaY * clamp(scale, 0, 1);
        }

        store.setScale(scale);
        store.setTranslate(tx, ty);

        ref.current.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
        ref.current.style.transformOrigin = 'left top';
    }, { passive: false });
  }, [ref]);

  const addNode = useCallback((node: any) => {
    store.addNode(new node())
  }, [store]);

  useEffect(() => {
    document.body.style.cursor = store.pointerManager.cursor;
  }, [store.pointerManager.cursor])

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
    <>
        <div id="result" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', background: 'black', overflow: 'hidden', top: 0,
            left: '50vw', width: '50vw', height: '100vh', zIndex: '1', position: 'absolute' }}>

        </div>
        <div style={{ overflow: 'hidden', top: 0,
            left: 0, width: '50vw', height: '100vh', zIndex: '1', position: 'relative' }}>
            <button onClick={() => addNode(Time)}>add time</button>
            <button onClick={() => addNode(UVNode)}>add UV</button>
            <button onClick={() => addNode(Number)}>add number input</button>
            <button onClick={() => addNode(Image)}>add img</button>
            <button onClick={() => addNode(Blend)}>add blend</button>
            <button onClick={() => addNode(BCS)}>add bcs</button>
            <button onClick={() => addNode(BitmapChannelSplitter)}>add ch splitter</button>
            <button onClick={() => addNode(BitmapChannelCombiner)}>add ch combiner</button>
            <button onClick={() => addNode(NumberMath)}>add number math</button>
            <div ref={ref} style={{ top: 0,
                left: 0, width: '100vw', height: '100vh', zIndex: '1', position: 'relative' }}>
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
        </div>
    </>
  );
});
