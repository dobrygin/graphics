import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { NodeOutputs } from '../Input/NodeOutputs';
import { Image } from '../../classes/nodes/input/Image';
import { Bitmap } from '../../classes/data/Bitmap';
import { NodeControls } from '../controls/NodeControls';
import NodeView from "../generic/view/NodeView";
import {Group} from "../generic/view/Group";
import { decode } from "fast-png";

export const InputNode = observer(({ node }: { node: Image }) => {
  const setImage = useCallback((file: File) => {
    if (file.type === 'image/jpeg') {
      file.arrayBuffer().then(buf => {
        // @ts-ignore
        inkjet.decode(buf, (_, b) => {
          node.bitmap.setBitmap(new Bitmap(b.data, b.width, b.height))
        })
      });
    }
    if (file.type === 'image/tiff') {

    }

    if (file.type === 'image/png') {
        file.arrayBuffer().then(buf => {
            const b = decode(buf);
            if (b.data instanceof Uint8Array) {
                node.bitmap.setBitmap(new Bitmap(b.data, b.width, b.height))
            }
        });
    }
  }, [node]);
  return (
    <NodeView UIData={node.UIData} width={node.UIData.width} title={node.UIData.title}>
      <Group>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </Group>
      <Group>
          <NodeControls controls={node.controls} />
      </Group>
      <Group>
          <NodeOutputs outputs={node.outputs} />
      </Group>
    </NodeView>
  );
});
