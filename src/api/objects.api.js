import { useMock } from "./config";
import * as mock from "./mock/objects.mock";
import * as real from "./real/objects.real";

export const getObjects = useMock
  ? mock.getObjects
  : real.getObjects;

export const addObject = useMock
  ? mock.addObject
  : real.addObject;

export const updateObject = useMock
  ? mock.updateObject
  : real.updateObject;

export const deleteObject = useMock
  ? mock.deleteObject
  : real.deleteObject;
