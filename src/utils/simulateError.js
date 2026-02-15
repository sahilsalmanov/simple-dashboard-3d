export const simulateError = (probability = 0.1) => {
  if (Math.random() < probability) {
    throw new Error("Simulated network error");
  }
};
