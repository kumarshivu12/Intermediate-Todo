import React from "react";
import ReactDOM from "react-dom/client";

//components
import "./index.css";
import App from "./App.jsx";
import TodoProvider from "./Context/TodoContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoProvider>
    <App />
  </TodoProvider>
);
