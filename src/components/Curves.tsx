import React, {useEffect, useRef} from "react";
import {useState} from "react";
import {useStore} from "../store/provider/StoreProvider";
import {reaction} from "mobx";

const Curves = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const canvas = useRef<HTMLCanvasElement>();

    const store = useStore();

    useEffect(() => {
        if (!canvas.current) return;
        const ctx = canvas.current.getContext('2d');
        const reset = reaction(
            () => ({
                connectedOutputs: store.nodes.map(a => a.inputs).flat().map(e => (e.isConnected && e, e)).flat(),
                positions: store.nodes.map(node => node.UIData.y + node.UIData.x)
            }),
            ({ connectedOutputs }) => {
                ctx.clearRect(0,0,width, height)
                connectedOutputs.forEach(output => {
                    // @ts-ignore
                    console.log(output.id, output.connectedTo.id);
                    // @ts-ignore
                    const outputElement = document.querySelector(`#${output.connectedTo.id}`);
                    const bound = outputElement.getBoundingClientRect();
                    const left = bound.x + bound.width;
                    const top = bound.y;

                    const inputElement = document.querySelector(`#${output.id}`)
                    const bounds = inputElement.getBoundingClientRect();
                    const l = bounds.x;
                    const t = bounds.y;
                    ctx.beginPath();
                    ctx.moveTo(left, top);
                    // ctx.lineTo(l, t);

                    ctx.bezierCurveTo(left + 70, top + 70, l - 70, t - 70, l , t);

                    ctx.strokeStyle='rgba(255,255,255,255)';

                    ctx.stroke();
                    ctx.closePath();

                });
            },
            { fireImmediately: true }
        );

        return () => reset();
    }, [canvas]);

    return <canvas ref={canvas} width={width} height={height}/>;
};

export default Curves;