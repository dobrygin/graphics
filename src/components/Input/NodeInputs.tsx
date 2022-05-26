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
    store.selectIO(e);
  }, [inputs]);

  const onKeyUp = useCallback((e) => {
    store.connectIO(e);
  }, [inputs]);

  return (
    <>
      {inputs.map((input, i) => {
        if (input instanceof BitmapInput) {
          return <InputProperty
            id={input.id}
            key={i}
            onMouseUp={() => onKeyUp(input)}
            onMouseDown={() => onKeyDown(input)}
            isConnected={input.isConnected || input === store.selectedIO}
            color={color.types.bitmap.secondary}
            connectedColor={color.types.bitmap.accent}
            title={input.UIData.title} />
        }

        if (input instanceof NumberInput) {
          return <InputProperty
              id={input.id}
              key={i}
              onMouseUp={() => onKeyUp(input)}
              onMouseDown={() => onKeyDown(input)}
              isConnected={input.isConnected || input === store.selectedIO}
              color={color.number.secondary}
              connectedColor={color.number.accent}
              title={input.UIData.title} />
        }
      })}
    </>
  );
});
