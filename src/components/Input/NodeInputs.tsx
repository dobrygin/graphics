import { observer } from 'mobx-react-lite';
import { Input } from '../../classes/IO/IO';
import { BitmapInput } from '../../classes/IO/Bitmap/BitmapInput';
import React, {useCallback} from 'react';
import { useStore } from '../../store/provider/StoreProvider';
import {NumberInput} from "../../classes/IO/Number/NumberInput";
import {color} from "../../global/styles";
import InputProperty from "../generic/view/InputProperty";

export const NodeInputs = observer(({ inputs }: { inputs: Input[] }) => {
  // useEffect(() => {
  //   console.log(inputs, inputs[0] instanceof BitmapInput);
  // }, [inputs]);
  const store = useStore();

  const onKeyDown = useCallback((e) => {
    console.log(e);
    store.selectIO(e);
  }, [inputs]);

  const onKeyUp = useCallback((e) => {
    console.log(e);
    store.connectIO(e);
  }, [inputs]);

  return (
    <>
      {inputs.map((input, i) => {
        if (input instanceof BitmapInput) {
          // return <div key={i} onClick={() => {}}>
          //   {!!input.connectedTo ? 'connected' : ''} {input.UIData.title}
          //   <button onClick={() => store.selectIO(input)}>select</button>
          //   <button onClick={() => store.connectIO(input)}>connect</button>
          // </div>

          return <InputProperty
            key={i}
            onMouseUp={() => onKeyUp(input)}
            onMouseDown={() => onKeyDown(input)}
            isConnected={input.isConnected}
            color={color.types.bitmap.secondary}
            connectedColor={color.types.bitmap.accent}
            title={input.UIData.title} />
        }

        if (input instanceof NumberInput) {
          // return <div key={i} onClick={() => {}}>
          //   {!!input.connectedTo ? 'connected' : ''} {input.UIData.title}
          //   <button onClick={() => store.selectIO(input)}>select</button>
          //   <button onClick={() => store.connectIO(input)}>connect</button>
          // </div>

          return <InputProperty
              key={i}
              onMouseUp={() => onKeyUp(input)}
              onMouseDown={() => onKeyDown(input)}
              isConnected={input.isConnected}
              color={color.number.secondary}
              connectedColor={color.number.accent}
              title={input.UIData.title} />
        }
      })}
    </>
  );
});
