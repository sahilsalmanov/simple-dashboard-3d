import { delay } from "../../utils/delay";
import { simulateError } from "../../utils/simulateError";
import { load, save } from "../../storage/localStorage.service";

const DESIGNERS_KEY = "designers";

const initialDesigners = [
  {
    id: 1,
    fullName: "Alice Smith",
    workingHours: "9:00-17:00",
    isEmployed: true,
    attachedObjectsCount: 0,
    createdAt: "2024-01-15T10:00:00.000Z",
    updatedAt: "2024-01-15T10:00:00.000Z"
  },
  {
    id: 2,
    fullName: "Bob Johnson",
    workingHours: "10:00-18:00",
    isEmployed: true,
    attachedObjectsCount: 0,
    createdAt: "2024-01-16T09:30:00.000Z",
    updatedAt: "2024-01-16T09:30:00.000Z"
  },
  {
    id: 3,
    fullName: "Carol Williams",
    workingHours: "11:00-19:00",
    isEmployed: true,
    attachedObjectsCount: 0,
    createdAt: "2024-01-17T14:20:00.000Z",
    updatedAt: "2024-01-17T14:20:00.000Z"
  }
];

let designers = load(DESIGNERS_KEY, initialDesigners);
save(DESIGNERS_KEY, designers);

const updateDesignerObjectsCount = (designerId, increment = true) => {
  designers = designers.map(d =>
    d.id === designerId
      ? {
          ...d,
          attachedObjectsCount:
            (d.attachedObjectsCount || 0) + (increment ? 1 : -1),
          updatedAt: new Date().toISOString()
        }
      : d
  );

  save(DESIGNERS_KEY, designers);
};

export const getDesigners = async () => {
  await delay();
  simulateError(0.05);
  return [...designers];
};

export const addDesigner = async (designerData) => {
  await delay(400);
  simulateError(0.1);

  if (!designerData.fullName?.trim())
    throw new Error("Full name is required");

  if (!designerData.workingHours?.trim())
    throw new Error("Working hours are required");

  const newDesigner = {
    id: Math.max(...designers.map(d => d.id), 0) + 1,
    attachedObjectsCount: 0,
    isEmployed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...designerData,
    fullName: designerData.fullName.trim(),
    workingHours: designerData.workingHours.trim()
  };

  designers.push(newDesigner);
  save(DESIGNERS_KEY, designers);

  return { ...newDesigner };
};

export const _internal = {
  updateDesignerObjectsCount,
  getDesignersState: () => designers
};
