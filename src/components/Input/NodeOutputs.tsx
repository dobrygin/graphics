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
  }, [outputs]);

  const onKeyUp = useCallback((e) => {
    store.connectIO(e);
  }, [outputs]);

  return (
    <Group>
      {outputs.map((output, i) => {
        if (output instanceof BitmapOutput) {
          // return <div key={i} onClick={() => {}}>
          //   {!!output.isConnected ? 'connected' : ''} bitmap ${output.name}
          //   <button onClick={() => store.selectIO(output)}>select</button>
          //   <button onClick={() => store.connectIO(output)}>connect</button>
          // </div>

          return (
            <OutputProperty
              id={output.id}
              key={i}
              onMouseUp={() => onKeyUp(output)}
              onMouseDown={() => onKeyDown(output)}
              isConnected={output.isConnected}
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
            isConnected={output.isConnected}
            color={color.number.secondary}
            connectedColor={color.number.accent}
            title={output.UIData.title} />
          // return <div key={i} onClick={() => {}}>
          //   {!!output.isConnected ? 'connected' : ''} number ${output.name}
          //   <button onClick={() => store.selectIO(output)}>select</button>
          //   <button onClick={() => store.connectIO(output)}>connect</button>
          // </div>
        }
      })}
    </Group>
  );
});
