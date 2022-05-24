class TreeNode {
    childrens = [];
    name = null;
    constructor(name){
        this.name = name;
    }
    addChildrens(...nodes) {
        this.childrens = [...this.childrens, ...nodes];
    }
}

class ImageNode extends TreeNode {
    constructor(name) {
        super(name);
    }
}

let count = (node, first = true, sortingObj = {}, index = 0) => {
    if (!node.childrens.length) return

    if (!sortingObj[index]) sortingObj[index] = []

    if (first) {
        sortingObj[index].push(node)
        count(node, false, sortingObj, index + 1)
    } else {
        node.childrens.forEach(children => {
            sortingObj[index].push(children)
            count(children, false, sortingObj, index + 1)
        })
    }

    return sortingObj
}

const img1 = new ImageNode('img1')
const img2 = new ImageNode('img2')

const A = new TreeNode('A')
const B = new TreeNode('B')
const C = new TreeNode('C')
const D = new TreeNode('D')
const E = new TreeNode('E')
const F = new TreeNode('F')
const G = new TreeNode('G')
const H = new TreeNode('H')

A.addChildrens(B,C)
B.addChildrens(E,D)
E.addChildrens(F, D)
D.addChildrens(H,G)
G.addChildrens(H)
C.addChildrens(E)
F.addChildrens(img2)
H.addChildrens(img1)
G.addChildrens(img2)

const sortNodes = (firstNode) => {
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
        xxx = [...a, ...xxx]
    })

    return xxx;

}

const nodes = sortNodes(A)

const generateUniforms = (nodes) => {
    let uniform = ``
    nodes.forEach(node => {
        if (node instanceof ImageNode) {
            uniform += `uniform sampler2D tex_randId;\n`
        }
        else if (node instanceof TreeNode) {
            uniform += `uniform kakoi-to dlya nodi ${node.name};\n`
        }
    });
    return uniform;
}
//
// const generateShader = (nodes) => {
//     return `${generateUniforms(nodes)}
// void main() {
// ${nodes.map(node => `   funcs for node ${node.name}`).join('\n')}
// }
//     `
// }
//
// console.log(generateShader(nodes));
