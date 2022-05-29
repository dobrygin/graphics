import React, {useCallback, useEffect, useRef, useState} from "react";
import { color } from "../../../global/styles";
import {
    SliderElement, SliderElementBox,
    SliderFillElement,
    SliderInputNumber,
    SliderValues,
    SliderValuesTitle,
    SliderValuesValue
} from "./styles";
import {clamp} from "../../../utils/clamp";
import {useStore} from "../../../store/provider/StoreProvider";
import IODot from "../../generic/view/IODot";

const Slider = ({ isConnected, color: ioColor, connectedColor, input: nodeInput = null, title = "Title", step = 0.01, min = -2048, max = 2048, value = 0, onSliderChange = (e) => {} }) => {
    const store = useStore();
    const dontgo = useRef(false);
    const st = useRef(Math.sqrt(Math.pow(min - max, 2)));

    const input = useRef<HTMLInputElement>();

    const [isEditMode, setIsEditMode] = useState(false);

    const pointerStartedX = useRef(0);
    const onPointerMoveRef = useRef(null);
    const onPointerUpRef = useRef(null);
    const onPointerDownRef = useRef(null);

    const valueWhenStarted = useRef(null);

    const [currentValue, setCurrentValue] = useState(typeof value === 'number' ? value : 0);

    const curVal = useRef(value);

    const sliderElRef = useRef();

    useEffect(() => {
        onPointerMoveRef.current = (e) => {
            dontgo.current = true;
            const pxOff = e.clientX - pointerStartedX.current;
            const steps = pxOff * (st.current / 2);
            const addVal = (Math.floor(steps)) * 0.01;

            setCurrentValue(valueWhenStarted.current + addVal);
            curVal.current = valueWhenStarted.current + addVal;
        };

        onPointerUpRef.current = (e) => {
            setTimeout(() => {
                dontgo.current = false;
            });
            store.pointerManager.setIsPointerShown(true);
            pointerStartedX.current = 0;
            window.removeEventListener('mouseup', onPointerUpRef.current);
            window.removeEventListener('mousemove', onPointerMoveRef.current);
        };

        onPointerDownRef.current = (e) => {
            store.pointerManager.setIsPointerShown(false);
            valueWhenStarted.current = curVal.current;
            pointerStartedX.current = e.clientX;
            window.addEventListener('mouseup', onPointerUpRef.current);
            window.addEventListener('mousemove', onPointerMoveRef.current);
        };
    }, [setCurrentValue]);

    const goEditMode = useCallback(() => {
        if (!dontgo.current) {
            setIsEditMode(true);
            setTimeout(() => {
                input.current && input.current.focus();
                input.current && (input.current.type = "text");
                input.current && input.current.setSelectionRange(0, input.current.value.length);
                input.current && (input.current.type = "number");
            });
        }
    }, [setIsEditMode, isEditMode, input.current]);

    const [isActive, setIsActive] = useState(false);

    const goBlur = useCallback(() => {
        setIsEditMode(false);
        setIsActive(false);
    }, [setIsEditMode, setIsActive]);

    const onInputChange = useCallback((e) => {
        const a = parseFloat(e.target.value);
        curVal.current = a;
        setCurrentValue(a);
    }, [onSliderChange]);

    const goFocus = useCallback(() => {
        setIsActive(true);
    }, [setIsActive]);

    const onKeyUp = useCallback((e: KeyboardEvent) => {
        if (e.key == 'Enter') {
            goBlur();
        }
    }, []);

    useEffect(() => {
        onSliderChange(currentValue)
    }, [currentValue]);

    const onKeyDowns = useCallback((e) => {
        store.selectIO(e);
    }, []);

    const onKeyUps = useCallback((e) => {
        store.connectIO(e);
    }, []);

    const unConnect = useCallback(() => {
        if (isConnected) {
            nodeInput.disconnect();
        }
    }, [isConnected]);

    return (
        <SliderElementBox onDoubleClick={() => unConnect()} onMouseUp={() => onKeyUps(nodeInput )} color={ioColor} connectedColor={connectedColor} isConnected={isConnected}>
                <SliderElement ref={sliderElRef}>
                    { nodeInput && <IODot
                           onMouseDown={() => onKeyDowns(nodeInput)} id={nodeInput.id} /> }
                    { isConnected ?
                        <>
                            <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px' }}>
                                <SliderValues>
                                    <SliderValuesTitle>
                                        {title}
                                    </SliderValuesTitle>
                                    <SliderValuesValue>
                                    </SliderValuesValue>
                                </SliderValues>
                                <SliderFillElement width={1} color={color.number.accent} />
                            </div>
                        </> :
                        <>
                            {isEditMode ?
                                <SliderInputNumber
                                    onChange={(e) => onInputChange(e)}
                                    //@ts-ignore
                                    onKeyUp={(e: KeyboardEvent) => onKeyUp(e)}
                                    value={isActive ? undefined : parseFloat(`${currentValue}`).toFixed(3)}
                                    ref={input}
                                    onFocus={() => goFocus()}
                                    onBlur={() => goBlur()}
                                    type="number"
                                /> :
                                <div style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: '4px' }} onClick={() => goEditMode()}
                                     onPointerDown={(e) => onPointerDownRef.current(e)}>
                                    <SliderValues>
                                        <SliderValuesTitle>
                                            {title}
                                        </SliderValuesTitle>
                                        <SliderValuesValue>
                                            {currentValue.toFixed(3)}
                                        </SliderValuesValue>
                                    </SliderValues>
                                    <SliderFillElement width={clamp((currentValue - min) / st.current, 0, 1)} color={color.number.accent}>

                                    </SliderFillElement>
                                </div>
                            }
                        </>
                    }
                </SliderElement>
        </SliderElementBox>
    );
}

export default Slider;