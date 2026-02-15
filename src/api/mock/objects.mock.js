import { delay } from "../../utils/delay";
import { simulateError } from "../../utils/simulateError";
import { load, save } from "../../storage/localStorage.service";
import { _internal as designersInternal } from "./designers.mock";

const OBJECTS_KEY = "objects";

let objects = load(OBJECTS_KEY, []);
save(OBJECTS_KEY, objects);

export const getObjects = async () => {
  await delay();
  simulateError(0.05);

  const designers = designersInternal.getDesignersState();

  return objects.map(obj => ({
    ...obj,
    designer:
      designers.find(d => d.id === (obj.designerId || obj.designer?.id)) ||
      obj.designer
  }));
};

export const addObject = async (objectData) => {
  await delay(500);
  simulateError(0.1);

  if (!objectData.name?.trim())
    throw new Error("Object name is required");

  const designers = designersInternal.getDesignersState();
  const designerId = objectData.designerId || objectData.designer?.id;

  if (!designerId)
    throw new Error("Designer must be selected");

  const designer = designers.find(d => d.id === designerId);

  if (!designer)
    throw new Error("Selected designer does not exist");

  const newObject = {
    id: Math.max(...objects.map(o => o.id), 0) + 1,
    name: objectData.name.trim(),
    designerId: designer.id,
    designer: { ...designer },
    color: objectData.color || "#3b82f6",
    size: objectData.size || "normal",
    position: objectData.position || [0, 0, 0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  objects.push(newObject);
  save(OBJECTS_KEY, objects);

  designersInternal.updateDesignerObjectsCount(designer.id, true);

  return { ...newObject };
};

export const updateObject = async (updatedData) => {
  await delay(300);

  const index = objects.findIndex(o => o.id === updatedData.id);

  if (index === -1)
    throw new Error(`Object with id ${updatedData.id} not found`);

  const designers = designersInternal.getDesignersState();

  const oldDesignerId =
    objects[index].designerId || objects[index].designer?.id;

  const newDesignerId =
    updatedData.designerId || updatedData.designer?.id;

  if (newDesignerId && newDesignerId !== oldDesignerId) {
    const newDesigner = designers.find(d => d.id === newDesignerId);

    if (!newDesigner)
      throw new Error("Selected designer does not exist");

    designersInternal.updateDesignerObjectsCount(oldDesignerId, false);
    designersInternal.updateDesignerObjectsCount(newDesignerId, true);

    updatedData.designer = { ...newDesigner };
  }

  const updatedObject = {
    ...objects[index],
    ...updatedData,
    updatedAt: new Date().toISOString(),
    name: updatedData.name?.trim() || objects[index].name
  };

  objects[index] = updatedObject;
  save(OBJECTS_KEY, objects);

  return { ...updatedObject };
};

export const deleteObject = async (id) => {
  await delay(400);

  const index = objects.findIndex(o => o.id === id);

  if (index === -1)
    throw new Error(`Object with id ${id} not found`);

  const designerId =
    objects[index].designerId || objects[index].designer?.id;

  objects = objects.filter(o => o.id !== id);
  save(OBJECTS_KEY, objects);

  if (designerId)
    designersInternal.updateDesignerObjectsCount(designerId, false);

  return { success: true, id };
};
