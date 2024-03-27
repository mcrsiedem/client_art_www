import style from "./BookMaker.module.css";
export default function CardProduct({ element, elements, setElements }) {
    const changeProductHandler = (element) => {
      setElements(
        elements.map((e) => {
          if (e.id === element.id) {
            return element;
          } else {
            return e;
          }
        })
      );
    };
    return (
      <div
        // onClick={() => clikBindingHandler({ bind, binding, setBinding })}
        className={style.cardProduct}
      >
        {element.nazwa}
        <input
          className={style.cardInput}
          defaultValue={element.strony}
          placeholder="..."
          type="text"
          onChange={(e) =>
            changeProductHandler({ ...element, strony: e.target.value })
          }
        ></input>{" "}
        str.
      </div>
    );
  };