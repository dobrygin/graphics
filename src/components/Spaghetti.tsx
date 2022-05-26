import React, {useEffect, useRef, useState} from "react";
import {useStore} from "../store/provider/StoreProvider";
import {reaction, transaction} from "mobx";
import {IOType} from "../types/IO";
import {color} from "../global/styles";
import {IOGetPos} from "../utils/IOGetPos";
import {generateCubicBezierSpaghetti} from "../utils/generateCubicBezierSpaghetti";

const Spaghetti = () => {
    const [width, setWidth] = useState(window.innerWidth * window.devicePixelRatio);
    const [height, setHeight] = useState(window.innerHeight * window.devicePixelRatio);

    const [paths, setPaths] = useState([]);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth * window.devicePixelRatio);
            setHeight(window.innerHeight * window.devicePixelRatio)
        })
    }, []);

    useEffect(() => {
        const react = reaction(() => store.pointerManager.mousePos, (mousePos) => {
            setMousePos(mousePos);
        });

        return () => {
            react();
        }
    }, []);

    const  canvas = useRef<HTMLCanvasElement>();

    const store = useStore();

    useEffect(() => {
        const reset = reaction(
            () => ({
                connectedInputs: store.nodes.map(a => a.inputs).flat().map(e => (e.isConnected && e, e)).flat(),
                positions: store.nodes.map(node => node.UIData.y + node.UIData.x),
            }),
            ({ connectedInputs }) => {
                const _paths = [];
                connectedInputs.forEach(input => {
                    if(!input.isConnected) {return;}

                    const [l1, t1] = IOGetPos(input.connectedTo);
                    const [l2, t2] = IOGetPos(input);

                    const path = generateCubicBezierSpaghetti(l1, t1, l2, t2);

                    _paths.push({path, input});
                });

                setPaths(() => _paths);
            },
            { fireImmediately: true }
        );

        return () => { reset(); };
    }, [width, height]);

    useEffect(() => {
        if (!canvas.current) return;
        const ctx = canvas.current.getContext('2d');

        let selectedOne = false;

        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        let path__ = [...paths];

        if (store.selectedIO) {
            const [l1, t1] = IOGetPos(store.selectedIO);
            path__.push({ generated: true, path: generateCubicBezierSpaghetti(l1, t1, mousePos.x, mousePos.y), input: store.selectedIO});
        }

        path__.forEach(({path, input, generated}) => {
            let strokeStyle = '';

            if (input.ioType === IOType.Bitmap) {
                strokeStyle = color.types.bitmap.accent;
            }

            if (input.ioType === IOType.Number) {
                strokeStyle = color.number.accent;
            }

            if (input.ioType === IOType.Vector) {
                strokeStyle = color.types.bitmap.accent;
            }

            let selected = false;

            ctx.lineWidth = 15;

            if (!selectedOne && !generated) {
                ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio)
                if (ctx.isPointInStroke(path, mousePos.x, mousePos.y)) {
                    selected = true;
                    selectedOne = true;
                }
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
            }

            ctx.lineWidth = selected ? 3 : 3;

            ctx.shadowBlur = 0;

            // ctx.strokeStyle = strokeStyle + (selected ? "99" : "");

            ctx.strokeStyle = selected ? '#9999ff' : strokeStyle;

            // transaction(() => {
            //     store.pointerManager.setIsSpaghettiHovered(false);
            //
            //     if (selected) {
            //         store.pointerManager.setIsSpaghettiHovered(true);
            //         // ctx.shadowBlur = 15;
            //         // ctx.shadowColor = "rgba(0,0,0,0.3)";
            //     }
            // })

            ctx.stroke(path);
        });

        transaction(() => {
            store.pointerManager.setIsSpaghettiHovered(false);

            if (selectedOne) {
                store.pointerManager.setIsSpaghettiHovered(true);
                // ctx.shadowBlur = 15;
                // ctx.shadowColor = "rgba(0,0,0,0.3)";
            }
        })

        return () => {
            ctx.clearRect(0, 0, width, height);
            ctx.resetTransform();
        }
    }, [paths, canvas, mousePos, width, height, store.selectedIO]);

    return <canvas style={{ pointerEvents:'none', width: '100%', height: '100%', position: 'absolute', zIndex: 0, top: 0, left: 0, }} ref={canvas} width={width} height={height}/>;
};

export default Spaghetti;
