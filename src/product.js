import React from "react";
import { datas } from "./data";
import { useReducer } from "react";
import Header from "./header";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        datas: state.datas.map((data) =>
          data.id === action.payload.id
            ? { ...data, count: data.count + 1 }
            : data
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        datas: state.datas.map((data) =>
          data.id === action.payload.id && data.count > 0
            ? { ...data, count: data.count - 1 }
            : data
        ),
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        datas: state.datas.filter((data) => data.id !== action.payload.id),
      };
    case "REMOVE_ALL_PRODUCT":
      return {
        ...state,
        datas: [],
      };
    default:
      return state;
  }
};

const defaultState = { datas: datas };

const Product = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const getTotalPrice = () => {
    return state.datas.reduce((total, data) => {
      return total + data.price * data.count;
    }, 0);
  };

  // const header =(total,count) => {
  //   return {...state, Sum (data.count)}
  // }

  return (
    <>
      <Header />
      <div className="flex text-2xl mt-10 mb-4 justify-center items-center ">
        <h1>Your Bag</h1>
      </div>

      <div className="container divide-y text-2xl capitalize py-4 border border-spacing-10 w-4/5 mx-auto my-auto">
        {state.datas.length === 0 ? (
          <p>No products available</p>
        ) : (
          state.datas.map((data) => {
            const { id, name, img, price, count } = data;
            return (
              <div key={id} className=" flex flex-cols-2 justify-evenly py-6  ">
                <div className="flex ">
                  <img src={img} alt="" className="h-10 w-10" />

                  <div className="ml-3 overflow-hidden justify-start items-start">
                    <div className="text-sm font-medium text-slate-900">
                      {name}
                    </div>
                    <span className="text-sm text-slate-500 truncate">
                      ${price}
                    </span>
                    <div>
                      <p
                        className="text-sm font-medium text-purple-700"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_PRODUCT",
                            payload: { id },
                          })
                        }
                      >
                        remove
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" justify-center items-center">
                  <MdOutlineKeyboardArrowUp
                    className="text-purple-700 text-2xl"
                    onClick={() =>
                      dispatch({ type: "INCREMENT", payload: { id } })
                    }
                  />
                  <div className="text-sm ml-2"> {count}</div>

                  <MdOutlineKeyboardArrowDown
                    className="text-purple-700 text-2xl"
                    onClick={() =>
                      dispatch({ type: "DECREMENT", payload: { id } })
                    }
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <footer className="divide-y-2">
        <div className="pt-2 ">
          {state.datas.length > 0 && (
            <div className="flex flex-cols-2 text-2xl mt-4 capitalize justify-evenly">
              <p className="text-md text-slate-500 truncate">Total: </p>
              <button className="text-md truncate bg-purple-500 hover:bg-purple-300 hover:text-slate-500  text-white px-3 rounded-md">
                $ {getTotalPrice().toFixed(2)}
              </button>
            </div>
          )}

          <div className="flex justify-center text-md pt-4 capitalize">
            <button
              className="bg-purple-500 hover:bg-purple-300   text-white pl-3 pr-3 mt-10 rounded-md"
              onClick={() => dispatch({ type: "REMOVE_ALL_PRODUCT" })}
            >
              Remove All
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Product;
