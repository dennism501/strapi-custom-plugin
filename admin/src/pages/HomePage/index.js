/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
import EmailForm from "../EmailForm/EmailForm";
import { ThemeProvider } from "@strapi/design-system/ThemeProvider";
import { lightTheme } from "@strapi/design-system/themes";

const HomePage = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <EmailForm />
      </ThemeProvider>
    </>
  );
};

export default memo(HomePage);