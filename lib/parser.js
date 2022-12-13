const walk = require("acorn-walk");
const acorn = require("acorn");

function loc2code(s, l) {
    s = s.split('\n');
    l = l.loc;

    const s2d = s.map(line => line.split(''));

    const {
        start: {
            line: startLine,
            column: startColumn
        },
        end: {
            line: endLine,
            column: endColumn
        }
    } = l;
    let ans = '';

    for (let i = startLine - 1; i <= endLine - 1; i++) {
        let j = 0;

        if (i === startLine - 1) {
            j = startColumn - 1;
        }

        while (j < s2d[i].length) {
            ans += s2d[i][j];
            j++;
            if (i === endLine - 1 && j > endColumn) break;
        }

        ans += "\n";
    }

    return ans.slice(9, -1);
}

let fix = (code) => {
    let locate = (code, node) => {
        let {
            start,
            end
        } = node;
        let str = [];
        ' '.repeat(end - start).split(' ').forEach(() => {
            str.push(code[start]);
            start++;
        })
        return str.join('')
    }
    let constr = eval('(' + code + ')');
    constr = new constr();
    let ast = acorn.parse(code, {
        ecmaVersion: 2020,
        locations: true
    });
    let clean = (s) => s.split('(')[1].slice(0, -2)
    walk.full(ast, node => {
        if (node.type == "CallExpression") {
            if (constr[node.callee.name]) {
                let located = locate(code, node);
                code = code.replace(located, `call_thread("${node.callee.name}"${node.arguments.length > 0 ? ', ' : ''}${clean(located)})${located.endsWith(';')?';':''}`);
            }
        }
    })
    return code;
};
module.exports = fix;
