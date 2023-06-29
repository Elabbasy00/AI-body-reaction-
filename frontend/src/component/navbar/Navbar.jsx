import Box from "@mui/joy/Box/Box";
import Typography from "@mui/joy/Typography/Typography";
import React from "react";
import ToggleColor from "../toggle-color/ToggleColor";

function Navbar() {
  return (
    <Box
      component="header"
      sx={{
        py: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        fontWeight="lg"
        startDecorator={
          <Box
            component="span"
            sx={{
              width: 24,
              height: 24,
              background: (theme) =>
                `linear-gradient(45deg, ${theme.vars.palette.primary.solidBg}, ${theme.vars.palette.primary.solidBg} 30%, ${theme.vars.palette.primary.softBg})`,
              borderRadius: "50%",
              boxShadow: (theme) => theme.shadow.md,
              "--joy-shadowChannel": (theme) =>
                theme.vars.palette.primary.mainChannel,
            }}
          />
        }
      >
        Logo
      </Typography>
      <ToggleColor />
    </Box>
  );
}

export default Navbar;
