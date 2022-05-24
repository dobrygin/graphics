import {NodeElement, NodeElementContent, NodeElementHeader, NodeElementHeaderIcon, NodeElementHeaderTitle} from "./styles";
import {ArrowDown} from "../../../icons/ArrowDown";
import React from "react";

const NodeView = ({ title, children }) => {
    return(
        <NodeElement>
            <NodeElementHeader>
                <NodeElementHeaderIcon>
                    <ArrowDown />
                </NodeElementHeaderIcon>
                <NodeElementHeaderTitle>
                    {title}
                </NodeElementHeaderTitle>
            </NodeElementHeader>
            <NodeElementContent>
                {children}
            </NodeElementContent>
        </NodeElement>
    )
}

export default NodeView;