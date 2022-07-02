import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBS-wVwOQmB-tpdSFzPYOtVcy598vaMHts",
	authDomain: "one-church-network.firebaseapp.com",
	projectId: "one-church-network",
	storageBucket: "one-church-network.appspot.com",
	messagingSenderId: "82451562930",
	appId: "1:82451562930:web:1ef30d378472e63e1ba4ab",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
