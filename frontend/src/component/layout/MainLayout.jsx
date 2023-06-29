import React from "react";
import Navbar from "../navbar/Navbar";
import RequireAuth from "../../utils/RequireAuth";
import Sheet from "@mui/joy/Sheet";
function MainLayout({ children }) {
  return (
    <RequireAuth>
      <Sheet
        sx={{
          minHeight: "100vh",
          height: "auto",
          paddingX: 2,
          overflow: "hidden",
        }}
      >
        <Navbar />
        {children}
      </Sheet>
    </RequireAuth>
  );
}

export default MainLayout;
