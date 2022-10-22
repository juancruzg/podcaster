export const addToLocalStorage = <T>(objectName: string, object: T, ttl: number) => {
  const now = new Date();
  const item = {
    object,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(objectName, JSON.stringify(item));
};

export const getFromLocalStorage = <T>(objectName: string): T | null => {
  const itemAsString = localStorage.getItem(objectName);

  if (!itemAsString) {
    return null;
  }

  const item = JSON.parse(itemAsString);
  const now = new Date();

  // Compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(objectName);

    return null;
  }

  return item.object;
};
