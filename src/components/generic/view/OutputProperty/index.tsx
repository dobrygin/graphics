import React from "react";
import { OutputPropElement } from "./styles";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../../store/provider/StoreProvider";

const OutputProperty = observer(({ id, title, isConnected, connectedColor, color, onMouseUp, onMouseDown }: any) => {
    const store = useStore();

    return (
        <OutputPropElement ioSelected={!!store.selectedIO} id={id} onMouseUp={onMouseUp} onMouseDown={onMouseDown} isConnected={isConnected} color={color} connectedColor={connectedColor} >
            {title}
        </OutputPropElement>
    );
});

export default OutputProperty;