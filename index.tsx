let React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag != "function") {
      const element = { tag, props: { ...props, children } };
      return element;
    }

    try {
      return tag(props);
    } catch ({ promise, key }) {
      promise.then((data) => {
        promiseCache.set(key, data);
        rerender();
      });
      return { tag: "h1", props: { children: ["Loading..."] } };
    }
  },
};
// use like clojure
const states = [];
let stateCursor = 0;

const useState = (initialState) => {
  const FROZEN_CURSOR = stateCursor;
  states[FROZEN_CURSOR] ||= initialState;

  let setState = (newState) => {
    console.log(states);
    states[FROZEN_CURSOR] = newState;
    rerender();
  };
  stateCursor++;
  return [states[FROZEN_CURSOR], setState];
};

const promiseCache = new Map();
const createResource = (dataFetchFunction, key) => {
  if (promiseCache.has(key)) {
    return promiseCache.get(key);
  }

  throw { promise: dataFetchFunction(), key };
};

const App = () => {
  const [name, setName] = useState("user");
  const [count, setCount] = useState(0);
  // simulate suspense behaviour
  const dogPhotoUrl = createResource(
    () =>
      fetch("https://dog.ceo/api/breeds/image/random")
        .then((r) => r.json())
        .then((payload) => payload.message),
    "dogphoto"
  );

  return (
    <div className="text-center small-container">
      <h1>Hello welcome {name} !!</h1>
      <input
        id="input-text"
        placeholder="Enter your name"
        type="text"
        onchange={(e) => setName(e.target.value)}
      />
      <img
        style="border-radius:.5rem;"
        className="responsive-image"
        src={dogPhotoUrl}
        alt="dog photo"
      />
      <div className="text-center">
        <code>Likes : {count}</code>
        <div>
          <button
            onclick={() => {
              setCount(count + 1);
            }}
          >
            Like
          </button>
          <button
            className="accent-button"
            onclick={() => {
              setCount(count - 1);
            }}
          >
            Dislike
          </button>
        </div>
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        rerum voluptatibus molestiae, accusantium nam animi alias dicta illo
        tempora, magni ipsa? Eaque necessitatibus dolores illum dicta facilis
        rem reiciendis ratione?
      </p>
      <footer>
        <a
          target="_blank"
          href="https://github.com/MartinEmanuelMaldonado93/reactFromScratch"
        >
          Take a look at the code
        </a>
      </footer>
    </div>
  );
};

const render = (reactElementOrStrOrNum, container) => {
  // if is not a React Element just text ...
  if (["string", "number"].includes(typeof reactElementOrStrOrNum)) {
    let strNode = document.createTextNode(String(reactElementOrStrOrNum));
    container.appendChild(strNode);
    return;
  }
  //create a div,span, whatever..
  const currDomElement = document.createElement(reactElementOrStrOrNum.tag);
  // apply the props
  if (reactElementOrStrOrNum.props) {
    const Props = Object.keys(reactElementOrStrOrNum.props);
    Props.filter((p) => p != "children").forEach(
      (p) => (currDomElement[p] = reactElementOrStrOrNum.props[p])
    );
  }
  // nested childrens...
  if (reactElementOrStrOrNum.props.children) {
    let { children } = reactElementOrStrOrNum.props;
    children.forEach((child) => render(child, currDomElement));
  }
  container.appendChild(currDomElement);
};

const rerender = () => {
  stateCursor = 0;
  document.getElementById("root").firstChild.remove();
  render(<App />, document.getElementById("root"));
};

render(<App />, document.getElementById("root"));
