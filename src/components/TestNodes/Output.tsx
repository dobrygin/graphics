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

export const OutputNodeView = observer(({ node }: { node: OutputNode }) => {
  const store = useStore();

  return (
    <NodeView UIData={node.UIData} width={node.UIData.width} title={node.UIData.title}>
      <Group>
          <NodeInputs inputs={node.inputs} />
      </Group>
    </NodeView>
  );
});
