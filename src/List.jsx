import { createRef, useRef, useReducer, useEffect } from "react";
import useKeyPress from "./useKeyPress";

const List = ({ data = [] }) => {
  const arrowUpPressed = useKeyPress("ArrowUp");
  const arrowDownPressed = useKeyPress("ArrowDown");

  const listRefs = useRef([]);
  listRefs.current = data.map((_, i) => listRefs.current[i] ?? createRef());

  const reducer = (hlIndex, action) => {
    switch (action.type) {
      case "arrowUp":
        return hlIndex !== 0 ? hlIndex - 1 : data.length - 1;
      case "arrowDown":
        return hlIndex !== data.length - 1 ? hlIndex + 1 : 0;
      case "select":
        return action.payload;
      default:
        throw new Error();
    }
  };

  const [highlightedIndex, dispatch] = useReducer(reducer, 0);

  const scrollToIndex = (index) => {
    const listItem = listRefs.current[index];
    listItem.current?.scrollIntoView({
      behavior: "smooth",
      //   block: "start",
    });
  };

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp" });
      scrollToIndex(
        highlightedIndex !== 0 ? highlightedIndex - 1 : data.length - 1
      );
    }
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown" });
      scrollToIndex(
        highlightedIndex !== data.length - 1 ? highlightedIndex + 1 : 0
      );
    }
  }, [arrowUpPressed, arrowDownPressed]);

  return (
    <div className="list-container">
      <ul className="list">
        {data.length > 0 ? (
          data.map((item, i) => {
            return (
              <>
                <li
                  className="list-item"
                  key={item.id}
                  onMouseMove={() => {
                    dispatch({ type: "select", payload: i });
                    scrollToIndex(i);
                  }}
                  style={{
                    backgroundColor: i === highlightedIndex && "yellow",
                  }}
                  aria-pressed={i === highlightedIndex}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      dispatch({ type: "select", payload: i });
                      e.target.blur();
                    }
                  }}
                  ref={listRefs.current[i]}
                >
                  {item.id}
                  <br />
                  {item.name}
                  <br />
                  {item.found.items && (
                    <>
                      <br />
                      <hr className="hr" />
                      <ul className="list-row-items">
                        <li>{` "${item.found.items}" found in items!`}</li>
                      </ul>
                      <hr className="hr" />
                    </>
                  )}
                  {item.address}
                  <br />
                </li>
              </>
            );
          })
        ) : (
          <div className="not-found">
            <h3>No User Found</h3>
          </div>
        )}
      </ul>
    </div>
  );
};

export default List;
