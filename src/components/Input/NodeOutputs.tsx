import { observer } from 'mobx-react-lite';
import { Output } from '../../classes/IO/IO';
import React from 'react';
import BitmapOutput from '../../classes/IO/Bitmap/BitmapOutput';
import { useStore } from '../../store/provider/StoreProvider';
import NumberOutput from "../../classes/IO/Number/NumberOutput";

export const NodeOutputs = observer(({ outputs }: { outputs: Output[] }) => {
  const store = useStore();
  return (
    <>
      {outputs.map((output, i) => {
        if (output instanceof BitmapOutput) {
          return <div key={i} onClick={() => {}}>
            {!!output.isConnected ? 'connected' : ''} bitmap ${output.name}
            <button onClick={() => store.selectIO(output)}>select</button>
            <button onClick={() => store.connectIO(output)}>connect</button>
          </div>
        }

        if (output instanceof NumberOutput) {
          return <div key={i} onClick={() => {}}>
            {!!output.isConnected ? 'connected' : ''} number ${output.name}
            <button onClick={() => store.selectIO(output)}>select</button>
            <button onClick={() => store.connectIO(output)}>connect</button>
          </div>
        }
      })}
    </>
  );
});
