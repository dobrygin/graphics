import React, {useEffect, useRef} from "react";
import {useState} from "react";
import {useStore} from "../store/provider/StoreProvider";
import {reaction} from "mobx";
import {clamp} from "../utils/clamp";

const Curves = () => {
    const [width, setWidth] = useState(window.innerWidth * window.devicePixelRatio);
    const [height, setHeight] = useState(window.innerHeight * window.devicePixelRatio);

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
                console.log(connectedOutputs)
                ctx.clearRect(0,0,width, height)
                connectedOutputs.forEach(output => {
                    if(!output.isConnected) {return;}
                    //@ts-ignore
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

                    const e = clamp(Math.sqrt(Math.pow(left - l, 2) + Math.pow(top - t, 2)) / 300, 0, 1) * 120;

                    ctx.bezierCurveTo(left + e, top + 0, l - e, t - 0, l , t);

                    ctx.strokeStyle='rgba(120,120,120,255)';
                    ctx.lineWidth = 2;

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