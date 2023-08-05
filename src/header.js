import React from "react";

const Header = () => {
  return (
    <>
      <div className="flex bg-blue-800 space-between mx-auto">
        <h2 className="text-white py-4 px-4">UseReducer</h2>
        <div className="container flex justify-end pt-2">
          <img
            src="/images/shopping-cart.png"
            alt=""
            className="h-5 w-5 align-center"
          />
          <div className="flex ">
            <p className="bg-slate-400 rounded-full w-10- h-10 flex items-center justify-center">
              4
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
