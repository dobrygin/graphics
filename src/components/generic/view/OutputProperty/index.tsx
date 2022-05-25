import React from "react";
import { OutputPropElement } from "./styles";

const OutputProperty = ({ title, isConnected, connectedColor, color, onMouseUp, onMouseDown }: any) => {
    return (
        <OutputPropElement onMouseUp={onMouseUp} onMouseDown={onMouseDown} isConnected={isConnected} color={color} connectedColor={connectedColor} >
            {title}
        </OutputPropElement>
    );
}

export default OutputProperty;