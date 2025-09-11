import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Content from "./Components/Content";
import Description from "./Components/Description";
import Email from "./Components/Email";
import { OrderListView } from "./Components/ListViewInfiniti/ListView";

function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Navbar setPage={setPage} />
      {page === "home" && (
        <>
          <Content /> <Description /> <Email />
        </>
      )}

      {page === "items" && <OrderListView />}
    </>
  );
}

export default App;
