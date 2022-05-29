import { observer } from 'mobx-react-lite';
import React, {ChangeEvent, useState} from 'react';
import { Control } from '../../classes/controls/Control';
import { SliderControl } from '../../classes/controls/SliderControl';
import {SelectControl} from "../../classes/controls/SelectControl";
import Slider from "./slider";
import {Group} from "../generic/view/Group";
import {color} from "../../global/styles";
import {useStore} from "../../store/provider/StoreProvider";

export const NodeControls = observer(({ controls }: { controls: Control[] }) => {
  const [controlsActive, setControlsActive] = useState({});

  const store = useStore();

  const prepValue = (event: any, control: SliderControl, index: number) => {
    const float = parseFloat(event.target.value)
    if (controlsActive && controlsActive[index]) {
      if (!isNaN(float)) {
        control.setValue(float);
      }
    } else {
      if (!isNaN(float)) {
        control.setValue(float);
      } else {
        control.setValue(control.defaultValue);
      }
    }
  };

  const onSliderBlur = (event: any, control: SliderControl) => {
    /* if input is blurred and have no value, return it to default */
    const float = parseFloat(event.target.value);
    if (isNaN(float)) {
      control.setValue(control.defaultValue)
    }
    return true;
  }

  const onSliderDoubleClick = (control: SliderControl, event: any = false) => {
    control.setValue(control.defaultValue)
  }

  return <Group>
    {controls.map((control, i) => {
      if (control instanceof SliderControl) {
        return (
            <Slider
                key={i}
                input={control.UIData.input}
                isConnected={control.UIData.input === null ? false : control.UIData.input.isConnected || control.UIData.input === store.selectedIO}
                color={color.number.secondary}
                connectedColor={color.number.accent}
            //@ts-ignore
                title={control.UIData.title} onSliderChange={(value) => control.setValue(value)} value={control.value} min={control.min} max={control.max} step={control.step} />
            // {/*<p style={{ fontFamily: 'monospace', margin: 0 }}>*/}
            // {/*  {control.field}*/}
            // {/*  <input*/}
            // {/*      style={{ fontFamily: 'monospace' }}*/}
            // {/*      type="number"*/}
            // {/*      lang="en_EN"*/}
            // {/*      min={control.min}*/}
            // {/*      // value={parseFloat(`${control.value}`).toFixed(2)}*/}
            // {/*      value={controlsActive && controlsActive[i] ? undefined : parseFloat(`${control.value}`).toFixed(2)}*/}
            // {/*      step={control.step}*/}
            // {/*      onChange={event => prepValue(event, control, i)}*/}
            // {/*      onFocus={() => setControlsActive(() => setControlsActive(state => ({...state, [i]: true})))}*/}
            // {/*      onBlur={(event) => onSliderBlur(event, control) && setControlsActive(() => setControlsActive(state => ({...state, [i]: false})))}*/}
            // {/*  />*/}
            // {/*</p>*/}
            // {/*<input*/}
            // {/*  key={i}*/}
            // {/*  type="range"*/}
            // {/*  min={control.min}*/}
            // {/*  max={control.max}*/}
            // {/*  value={control.value}*/}
            // {/*  step={control.step}*/}
            // {/*  onDoubleClick={() => onSliderDoubleClick(control)}*/}
            // {/*  onChange={event => control.setValue(parseFloat(event.target.value))} />*/}
        )
      }

      if (control instanceof SelectControl) {
        return (
            <div key={i}>
              <p style={{ fontFamily: 'monospace', margin: 0 }}>
                {control.field}
              </p>
              <select value={control.value} onChange={(e) => control.setValue(parseInt(e.target.value))} name="" id="">
                ${Object.keys(control.map).map(key => <option key={key} value={control.map[key]}>{key}</option>)}
              </select>
            </div>
        )
      }
    })}
  </Group>;
});
