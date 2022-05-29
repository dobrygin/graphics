import React from "react";
import {IODotElement, IODotElementOutput} from "./styles";

export const IODot = ({ id, isOutput }: { id: string; isOutput?: boolean }) => {
    return isOutput ? <IODotElementOutput id={id} className="io-dot" /> : <IODotElement id={id} className="io-dot" />;
};

export default IODot;