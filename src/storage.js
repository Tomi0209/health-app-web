// Daten speichern
export const storeData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Fehler beim Speichern der Daten", e);
  }
};

// Daten abrufen
export const getData = (key) => {
  try {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.error("Fehler beim Abrufen der Daten", e);
  }
};