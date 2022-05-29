import { observer } from 'mobx-react-lite';
import { Output } from '../../classes/IO/IO';
import React, {useCallback} from 'react';
import BitmapOutput from '../../classes/IO/Bitmap/BitmapOutput';
import { useStore } from '../../store/provider/StoreProvider';
import NumberOutput from "../../classes/IO/Number/NumberOutput";
import OutputProperty from "../generic/view/OutputProperty";
import {Group} from "../generic/view/Group";
import {color} from "../../global/styles";

export const NodeOutputs = observer(({ outputs }: { outputs: Output[] }) => {
  const store = useStore();

  const onKeyDown = useCallback((e) => {
    store.selectIO(e);
  }, []);

  const onKeyUp = useCallback((e) => {
    store.connectIO(e);
  }, []);

  const unConnect = useCallback((isConnected, node) => {
    if (isConnected) {
      node.disconnect();
    }
  }, []);

  return (
    <Group>
      {outputs.map((output, i) => {
        if (output instanceof BitmapOutput) {
          return (
            <OutputProperty
              id={output.id}
              key={i}
              onDoubleClick={() => unConnect(output.isConnected, output)}
              onMouseUp={() => onKeyUp(output)}
              onMouseDown={() => onKeyDown(output)}
              isConnected={output.isConnected || output === store.selectedIO}
              color={color.types.bitmap.secondary}
              connectedColor={color.types.bitmap.accent}
              title={output.UIData.title} />
          );
        }

        if (output instanceof NumberOutput) {
          return <OutputProperty
            id={output.id}
            key={i}
            onMouseUp={() => onKeyUp(output)}
            onMouseDown={() => onKeyDown(output)}
            onDoubleClick={() => unConnect(output.isConnected, output)}
            isConnected={output.isConnected || output === store.selectedIO}
            color={color.number.secondary}
            connectedColor={color.number.accent}
            title={output.UIData.title} />
        }
      })}
    </Group>
  );
});
