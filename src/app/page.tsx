"use client"

import Image from "next/image";
import React from "react";
import STEP_01 from "./step01/step01";
import MAIN_DASH_PAGE from "./mainDashboard/page";
// import Login from "./login/login";
// import Loginpage from "./login/page";

export default function Home() {
  return(
    <div>
      <MAIN_DASH_PAGE/>
      {/* <Loginpage/> */}
    </div>
  );
}

