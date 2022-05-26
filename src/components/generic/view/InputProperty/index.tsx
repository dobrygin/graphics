import React from "react";
import {InputPropElement} from "./styles";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../../store/provider/StoreProvider";

const InputProperty = observer(({ id, title, isConnected, connectedColor, color, onMouseDown, onMouseUp }: any) => {
    const store = useStore();

    return (
        <InputPropElement ioSelected={!!store.selectedIO} id={id} onMouseUp={onMouseUp} onMouseDown={onMouseDown} isConnected={isConnected} color={color} connectedColor={connectedColor} >
            {title}
        </InputPropElement>
    );
});

export default InputProperty;