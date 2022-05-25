import {NodeElement, NodeElementContent, NodeElementHeader, NodeElementHeaderIcon, NodeElementHeaderTitle} from "./styles";
import {ArrowDown} from "../../../icons/ArrowDown";
import React, {useCallback, useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";

const NodeView = observer(({ title, children, width, UIData }: any) => {
    const startPosX = useRef(0);
    const startPosY = useRef(0);

    const initPosX = useRef(0);
    const initPosY = useRef(0);

    const onMouseUp = useRef(null);
    const onMouseDown = useRef(null);
    const onMouseMove = useRef(null);

    useEffect(() => {
        onMouseUp.current = () => {
            window.removeEventListener('mouseup', onMouseUp.current)
            window.removeEventListener('mousemove', onMouseMove.current)
        };

        onMouseMove.current = (e) => {
            let x = e.clientX - startPosX.current;
            let y = e.clientY - startPosY.current;

            UIData.update({
                x: initPosX.current + x,
                y: initPosY.current + y
            })

            console.log(x, y);
        }

        onMouseDown.current = (e) => {
            startPosX.current = e.clientX;
            startPosY.current = e.clientY;

            initPosX.current = UIData.x;
            initPosY.current = UIData.y;

            window.addEventListener('mouseup', onMouseUp.current);
            window.addEventListener('mousemove', onMouseMove.current);
        }
    }, [UIData]);

    return(
        <NodeElement x={UIData.x} y={UIData.y} width={width}>
            <NodeElementHeader onMouseDown={(e) => onMouseDown.current(e)}>
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
})

export default NodeView;