import axios from 'axios';
import { storeData, getData } from './storage';

// Eine statische URL wird hier angenommen, aber sie könnte lokal angepasst werden
const api = axios.create({
    //baseURL: 'http://localhost:8080/api', // Beispiel-URL, für Offline-Modus irrelevant
    baseURL: 'https://healthappbackend-production.up.railway.app/api',
});

// API-Aufruf mit Fallback auf Offline-Daten
export const fetchData = async (endpoint, params) => {
    try {
        const response = await api.post(endpoint, params);
        // Daten im Speicher sichern für den Offline-Zugriff
        storeData(endpoint, response.data);
        return response.data;
    } catch (error) {
        console.error('API-Aufruf fehlgeschlagen, versuche Offline-Daten', error);
        // Offline-Fallback
        return getData(endpoint);
    }
};