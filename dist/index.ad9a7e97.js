let React = {
    createElement: (tag, props, ...children)=>{
        // if is not a react component i.e: 
        if (typeof tag != "function") {
            const element = {
                tag,
                props: {
                    ...props,
                    children
                }
            };
            return element;
        }
        try {
            return tag(props);
        } catch ({ promise , key  }) {
            promise.then((data)=>{
                promiseCache.set(key, data);
                rerender();
            });
            return {
                tag: "h1",
                props: {
                    children: [
                        "Loading..."
                    ]
                }
            };
        }
    }
};
const states = [];
let stateCursor = 0;
const useState = (initialState)=>{
    const FROZEN_CURSOR = stateCursor;
    states[FROZEN_CURSOR] ||= initialState;
    let setState = (newState)=>{
        console.log(states);
        states[FROZEN_CURSOR] = newState;
        rerender();
    };
    stateCursor++;
    return [
        states[FROZEN_CURSOR],
        setState
    ];
};
const promiseCache = new Map();
const createResource = (dataFetchFunction, key)=>{
    if (promiseCache.has(key)) return promiseCache.get(key);
    throw {
        promise: dataFetchFunction(),
        key
    };
};
const App = ()=>{
    const [name, setName] = useState("user");
    const [count, setCount] = useState(0);
    // simulate suspense behaviour
    const dogPhotoUrl = createResource(()=>fetch("https://dog.ceo/api/breeds/image/random").then((r)=>r.json()).then((payload)=>payload.message), "dogphoto");
    return /*#__PURE__*/ React.createElement("div", {
        className: "text-center small-container",
        __source: {
            fileName: "index.tsx",
            lineNumber: 59,
            columnNumber: 5
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("h1", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 60,
            columnNumber: 7
        },
        __self: this
    }, "Hello welcome ", name, " !!"), /*#__PURE__*/ React.createElement("input", {
        id: "input-text",
        placeholder: "Enter your name",
        type: "text",
        onchange: (e)=>setName(e.target.value),
        __source: {
            fileName: "index.tsx",
            lineNumber: 61,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("img", {
        style: "border-radius:.5rem;",
        className: "responsive-image",
        src: dogPhotoUrl,
        alt: "dog photo",
        __source: {
            fileName: "index.tsx",
            lineNumber: 67,
            columnNumber: 7
        },
        __self: this
    }), /*#__PURE__*/ React.createElement("div", {
        className: "text-center",
        __source: {
            fileName: "index.tsx",
            lineNumber: 73,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("code", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 74,
            columnNumber: 9
        },
        __self: this
    }, "Likes : ", count), /*#__PURE__*/ React.createElement("div", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 75,
            columnNumber: 9
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("button", {
        onclick: ()=>{
            setCount(count + 1);
        },
        __source: {
            fileName: "index.tsx",
            lineNumber: 76,
            columnNumber: 11
        },
        __self: this
    }, "Like"), /*#__PURE__*/ React.createElement("button", {
        className: "accent-button",
        onclick: ()=>{
            setCount(count - 1);
        },
        __source: {
            fileName: "index.tsx",
            lineNumber: 83,
            columnNumber: 11
        },
        __self: this
    }, "Dislike"))), /*#__PURE__*/ React.createElement("p", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 93,
            columnNumber: 7
        },
        __self: this
    }, "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur rerum voluptatibus molestiae, accusantium nam animi alias dicta illo tempora, magni ipsa? Eaque necessitatibus dolores illum dicta facilis rem reiciendis ratione?"), /*#__PURE__*/ React.createElement("footer", {
        __source: {
            fileName: "index.tsx",
            lineNumber: 99,
            columnNumber: 7
        },
        __self: this
    }, /*#__PURE__*/ React.createElement("a", {
        target: "_blank",
        href: "https://github.com/MartinEmanuelMaldonado93/reactFromScratch",
        __source: {
            fileName: "index.tsx",
            lineNumber: 100,
            columnNumber: 9
        },
        __self: this
    }, "Take a look at the code")));
};
const render = (reactElementOrStrOrNum, container)=>{
    // if is not a React Element just text ...
    if ([
        "string",
        "number"
    ].includes(typeof reactElementOrStrOrNum)) {
        let strNode = document.createTextNode(String(reactElementOrStrOrNum));
        container.appendChild(strNode);
        return;
    }
    //create a div,span, wherever..
    const currDomElement = document.createElement(reactElementOrStrOrNum.tag);
    // apply the props
    if (reactElementOrStrOrNum.props) {
        const Props = Object.keys(reactElementOrStrOrNum.props);
        Props.filter((p)=>p != "children").forEach((p)=>currDomElement[p] = reactElementOrStrOrNum.props[p]);
    }
    // nested childrens...
    if (reactElementOrStrOrNum.props.children) {
        let { children  } = reactElementOrStrOrNum.props;
        children.forEach((child)=>render(child, currDomElement));
    }
    container.appendChild(currDomElement);
};
const rerender = ()=>{
    stateCursor = 0;
    document.getElementById("root").firstChild.remove();
    render(/*#__PURE__*/ React.createElement(App, {
        __source: {
            fileName: "index.tsx",
            lineNumber: 132,
            columnNumber: 10
        },
        __self: this
    }), document.getElementById("root"));
};
render(/*#__PURE__*/ React.createElement(App, {
    __source: {
        fileName: "index.tsx",
        lineNumber: 135,
        columnNumber: 8
    },
    __self: this
}), document.getElementById("root"));

//# sourceMappingURL=index.ad9a7e97.js.map
