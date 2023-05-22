import React, {PropsWithoutRef} from "react";
import {IODotElement, IODotElementOutput} from "./styles";

export const IODot = (props: { id: string; isOutput?: boolean } & PropsWithoutRef<any>) => {
    // debugger;
    return props.isOutput ? <IODotElementOutput {...props} className="io-dot" /> : <IODotElement {...props} className="io-dot" />;
};

export default IODot;