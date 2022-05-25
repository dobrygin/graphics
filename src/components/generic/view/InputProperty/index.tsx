import React from "react";
import {InputPropElement} from "./styles";

const InputProperty = ({ title, isConnected, connectedColor, color, onMouseDown, onMouseUp }: any) => {
    return (
        <InputPropElement onMouseUp={onMouseUp} onMouseDown={onMouseDown} isConnected={isConnected} color={color} connectedColor={connectedColor} >
            {title}
        </InputPropElement>
    );
}

export default InputProperty;