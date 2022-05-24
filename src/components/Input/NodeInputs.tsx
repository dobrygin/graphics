import { observer } from 'mobx-react-lite';
import { Input } from '../../classes/IO/IO';
import { BitmapInput } from '../../classes/IO/Bitmap/BitmapInput';
import React from 'react';
import { useStore } from '../../store/provider/StoreProvider';
import {NumberInput} from "../../classes/IO/Number/NumberInput";

export const NodeInputs = observer(({ inputs }: { inputs: Input[] }) => {
  // useEffect(() => {
  //   console.log(inputs, inputs[0] instanceof BitmapInput);
  // }, [inputs]);
  const store = useStore();
  return (
    <>
      {inputs.map((input, i) => {
        if (input instanceof BitmapInput) {
          return <div key={i} onClick={() => {}}>
            {!!input.connectedTo ? 'connected' : ''} bitmap ${input.name}
            <button onClick={() => store.selectIO(input)}>select</button>
            <button onClick={() => store.connectIO(input)}>connect</button>
          </div>
        }

        if (input instanceof NumberInput) {
          return <div key={i} onClick={() => {}}>
            {!!input.connectedTo ? 'connected' : ''} number ${input.name}
            <button onClick={() => store.selectIO(input)}>select</button>
            <button onClick={() => store.connectIO(input)}>connect</button>
          </div>
        }
      })}
    </>
  );
});
