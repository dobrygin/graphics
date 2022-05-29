import React from "react";
import { OutputPropElement } from "./styles";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../../store/provider/StoreProvider";
import IODot from "../IODot";

const OutputProperty = observer(({ id, title, isConnected, connectedColor, color, onMouseUp, onMouseDown, onDoubleClick }: any) => {
    const store = useStore();

    return (
        <OutputPropElement ioSelected={!!store.selectedIO} onDoubleClick={onDoubleClick} onMouseUp={onMouseUp} onMouseDown={onMouseDown} isConnected={isConnected} color={color} connectedColor={connectedColor} >
            <IODot isOutput={true} id={id} /> {title}
        </OutputPropElement>
    );
});

export default OutputProperty;