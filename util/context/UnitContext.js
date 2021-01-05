import React from "react";
import UNITS from "../UNITS";

const UnitContext = React.createContext({ unit: UNITS.USD, setUnit: () => {} });
export default UnitContext;
