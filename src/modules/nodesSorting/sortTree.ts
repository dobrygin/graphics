import {Node} from "../../classes/Node";
import ImageContainer from "../../classes/containers/ImageContainer";
import {FORMATS, Texture} from "pixi.js";
import {BCS} from "../../classes/nodes/colorCorrection/BCS";
import {Image} from "../../classes/nodes/input/Image";
import {BitmapInput} from "../../classes/IO/Bitmap/BitmapInput";
import {NumberInput} from "../../classes/IO/Number/NumberInput";
import BitmapOutput from "../../classes/IO/Bitmap/BitmapOutput";
import NumberOutput from "../../classes/IO/Number/NumberOutput";

const count = (node: Node, first = true, sortingObj = {}, index = 0) => {
    if (!node.inputs || !node.inputs.length) return

    if (!sortingObj[index]) sortingObj[index] = []

    if (first) {
        sortingObj[index].push(node)
        count(node, false, sortingObj, index + 1)
    } else {
        node.inputs.forEach(input => {
            if (input.isConnected) {
                if (!Array.isArray(input.connectedTo)) {
                    sortingObj[index].push(input.connectedTo.node)
                    count(input.connectedTo.node, false, sortingObj, index + 1)
                }
            }
        })
    }

    return sortingObj
}

export const sortTree = (firstNode) => {
    const levels = count(firstNode)

    let keys = Object.keys(levels)

    const sortedLevels = {}
    const used = []

    keys.reverse()
    keys.forEach(key => {
        if (!sortedLevels[key]) sortedLevels[key] = []
        levels[key].forEach(value => {
            if (sortedLevels[key].indexOf(value) === -1 && used.indexOf(value) === -1) {
                sortedLevels[key].push(value)
                used.push(value)
            }
        })
    })



    const ccc = Object.values(sortedLevels)
    let xxx = []

    ccc.forEach(a => {
        // @ts-ignore
        xxx = [...a, ...xxx]
    })

    return xxx;

}

export const generateShader = (nodes, outputNode) => {
    const used = [];
    return `
uniform int width;
uniform int height;

${nodes.map(node => node.generateShaderUniforms()).join('\n\n')}

${nodes.map(node => {
    if (used.indexOf(node.title) === -1) {
        used.push(node.title);
        return node.generateShaderCustoms()
    }
}).join('\n')}

void main() {
    ${nodes.map(node => node.generateShaderCode()).join('\n ')}
    
    ${(function(){
        if (outputNode.input.connectedTo instanceof BitmapOutput) {
            return `gl_FragColor = ${outputNode.input.connectedTo.shaderResultName};`
        } else if (outputNode.input.connectedTo instanceof NumberOutput) {
            return `gl_FragColor = vec4(
                ${outputNode.input.connectedTo.shaderResultName},
                ${outputNode.input.connectedTo.shaderResultName},
                ${outputNode.input.connectedTo.shaderResultName},
                1.0
            );`
        }
        return 'gl_FragColor = vec4(0.0,0.0,0.0,1.0);';
    })()}
}
`
}

export const generateUniforms = (nodes) => {
    // const outputContainer = new ImageContainer(
    //     bitmap.width,
    //     bitmap.height
    // );
    //
    //
    // this.uniforms.width = bitmap.width;
    // this.uniforms.height = bitmap.height;
    // this.uniforms.tex1 = tex1;

    const uniforms = {};

    nodes.forEach((node, i) => {
        const curUniforms = {};
        node.controls.forEach(control => {
            control.object = uniforms;
            curUniforms[control.field] = control.value;
        })

        Object.assign(uniforms, curUniforms);

        if (node instanceof Image) {
            uniforms[`tex_${node.id}`] = node.bitmap.texture
            // @ts-ignore
            uniforms[`width_tex_${node.id}`] = node.bitmap.bitmap.width
            // @ts-ignore
            uniforms[`height_tex_${node.id}`] = node.bitmap.bitmap.height
        }
    });

    return uniforms;
}