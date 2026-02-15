import { useMock } from "./config";
import * as mock from "./mock/designers.mock";
import * as real from "./real/designers.real";


export const getDesigners = useMock
  ? mock.getDesigners
  : real.getDesigners;

export const addDesigner = useMock
  ? mock.addDesigner
  : real.addDesigner;
