import {clamp} from "./clamp";

export const generateCubicBezierSpaghetti = (l1, t1, l2, t2) => {
    const path = new Path2D();
    path.moveTo(l1, t1);
    const e = clamp(Math.sqrt(Math.pow(l1 - l2, 2) + Math.pow(t1 - t2, 2)) / 300, 0, 1) * 120;
    path.bezierCurveTo(l1 + e, t1 + 0, l2 - e, t2 - 0, l2 , t2);
    return path;
};
