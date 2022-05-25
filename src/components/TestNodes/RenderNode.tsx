import { Node } from '../../classes/Node';
import { NodeInputs } from '../Input/NodeInputs';
import { NodeOutputs } from '../Input/NodeOutputs';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { NodeControls } from '../controls/NodeControls';
import NodeView from "../generic/view/NodeView";
import { Group } from '../generic/view/Group';

export const RenderNode = observer(({ node }: { node: Node }) => {
  return (
      // @ts-ignore
      <NodeView UIData={node.UIData} width={node.UIData.width} title={node.UIData.title}>
        <Group>
          <NodeInputs inputs={node.inputs} />
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
