import { OutputNode } from '../../classes/Node';
import React, { useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { NodeInputs } from '../Input/NodeInputs';
import BitmapOutput from '../../classes/IO/Bitmap/BitmapOutput';
import { Bitmap } from '../../classes/data/Bitmap';
import { encode } from 'fast-png';
import { useStore } from '../../store/provider/StoreProvider';
import { autorun } from 'mobx';
import {AppRenderer} from "../../classes/containers/Renderer";
import {generateShader, generateUniforms, sortTree} from "../../modules/nodesSorting/sortTree";
import {Filter} from "pixi.js";
import NodeView from "../generic/view/NodeView";
import { Group } from '../generic/view/Group';

function downloadBlob(blob, name = 'file.txt') {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = blobUrl;
  link.download = name;

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  );

  // Remove link from body
  document.body.removeChild(link);
}

export const OutputNodeView = observer(({ node }: { node: OutputNode }) => {
  const store = useStore();
  const requestRender = useCallback(async () => {


  // this.output.setBitmap(lol);

    // store.nodes.forEach((node) => {
    //   // @ts-ignore
    //   node.rendered = false;
    // })
    // const a = await node.requestProcessing();
    //
    // if (node.input.connectedTo instanceof BitmapOutput && node.input.connectedTo.bitmap) {
    //   if (node.input.connectedTo.bitmap instanceof Bitmap) {
    //     const aaa = encode({
    //       data: node.input.connectedTo.bitmap.data,
    //       width: node.input.connectedTo.bitmap.width,
    //       height: node.input.connectedTo.bitmap.height,
    //       channels: 4,
    //     })
    //     // console.log();
    //     downloadBlob(new Blob([aaa]), 'output.png')
    //   }
    // }


  }, [store]);

  const bitmapPreview = useRef(null);

  useEffect(() => {
    // autorun(() => {
    //   console.log(store.renders)
    //   // @ts-ignore
    //   if (!bitmapPreview.current || !node.input.connectedTo || !node.input.connectedTo.bitmap) return;
    //   const ctx = bitmapPreview.current.getContext('2d');
    //   // @ts-ignore
    //   bitmapPreview.current.width = node.input.connectedTo.bitmap.width;
    //   // @ts-ignore
    //   bitmapPreview.current.height = node.input.connectedTo.bitmap.height;
    //   // @ts-ignore
    //   const iData = new ImageData(new Uint8ClampedArray(node.input.connectedTo.bitmap.data.buffer), node.input.connectedTo.bitmap.width, node.input.connectedTo.bitmap.height)
    //   ctx.putImageData(iData, 0, 0)
    //   // @ts-ignore
    // });
    // autorun(() => {
    //   console.log('похуй')
    //   // @ts-ignore
    //   if (!bitmapPreview.current || !node.input.connectedTo || !node.input.connectedTo.bitmap) return;
    //   if (store.renders) return;
    //   const ctx = bitmapPreview.current.getContext('2d');
    //   // @ts-ignore
    //   bitmapPreview.current.width = node.input.connectedTo.bitmap.width;
    //   // @ts-ignore
    //   bitmapPreview.current.height = node.input.connectedTo.bitmap.height;
    //   // @ts-ignore
    //   const iData = new ImageData(new Uint8ClampedArray(node.input.connectedTo.bitmap.data.buffer), node.input.connectedTo.bitmap.width, node.input.connectedTo.bitmap.height)
    //   ctx.putImageData(iData, 0, 0)
    //   console.log('a4 blad vumaga')
    // })
    // @ts-ignore
  }, [bitmapPreview.current, node]);

  return (
    <NodeView title={"Output"}>
      <Group>
          <NodeInputs inputs={node.inputs} />
      </Group>
      {/*<canvas style={{ width: '256px' }} ref={bitmapPreview} />*/}
      {/*<button onClick={() => requestRender()}>output</button>*/}
    </NodeView>
  );
});
