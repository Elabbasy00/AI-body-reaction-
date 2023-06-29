import IconButton from "@mui/joy/IconButton/IconButton";
import { useColorScheme } from "@mui/joy/styles";
import React from "react";

import { MdDarkMode, MdLightMode } from "react-icons/md";

function ToggleColor({ onClick, ...props }) {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="plain" color="neutral" disabled />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="plain"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
        onClick?.(event);
      }}
    >
      {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
    </IconButton>
  );
}

export default ToggleColor;
