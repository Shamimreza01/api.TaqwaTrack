import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { MongoClient, ServerApiVersion } from "mongodb";
import homePage from "./homePage.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
const firebaseConfig = {
  apiKey: "AIzaSyAaoaCk8cU4gEbZGgqfC33ImGdnCnodcIQ",
  authDomain: "taqwatrack-v01.firebaseapp.com",
  projectId: "taqwatrack-v01",
  storageBucket: "taqwatrack-v01.firebasestorage.app",
  messagingSenderId: "493027643937",
  appId: "1:493027643937:web:4820c99e3541a59ffd0960",
  measurementId: "G-0S6BMC143B",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const storage = getStorage(firebaseApp);

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@taqwatrack.iur9l.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
      console.log("Connected to MongoDB");
    }

    const DuaDB = client.db(process.env.MONGO_DB_DUA);
    const QuranDB = client.db(process.env.MONGO_DB_QURAN);
    const NamesOfAllah = client.db(process.env.MONGO_DB_NAMESOFALLAH);

    app.get("/FortyMotivationalAyah", async (req, res) => {
      try {
        const FortyMotivationalAyah = await DuaDB.collection(
          "FortyMotivationalAyah",
        )
          .find({}, { projection: { _id: 0 } })
          .toArray();
        res.json(FortyMotivationalAyah);
      } catch (error) {
        console.error("Error fetching FortyMotivationalAyah:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/FortyRabbanaDua", async (req, res) => {
      try {
        const FortyRabbanaDua = await DuaDB.collection("FortyRabbanaDua")
          .find({}, { projection: { _id: 0 } })
          .toArray();
        res.json(FortyRabbanaDua);
      } catch (error) {
        console.error("Error fetching FortyRabbanaDua:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
    app.get("/AfterSalahDua", async (req, res) => {
      try {
        const AfterSalah = await DuaDB.collection("AfterSalah")
          .find({}, { projection: { _id: 0, audio_link: 0 } })
          .toArray();
        res.json(AfterSalah);
      } catch (error) {
        console.error("Error fetching AfterSalah:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/QuranArBnEnAudio", async (req, res) => {
      try {
        const QuranArBnEnAudio = await QuranDB.collection("FullQuran")
          .find({}, { projection: { _id: 0 } })
          .toArray();
        res.json(QuranArBnEnAudio);
      } catch (error) {
        console.error("Error fetching Quran data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/namesofAllah", async (req, res) => {
      try {
        const NamesOfAllah = await NamesOfAllah.collection("NamesOfAllah")
          .find({}, { projection: { _id: 0 } })
          .toArray();
        res.json(NamesOfAllah);
      } catch (error) {
        console.error("Error fetching 99 names of Allah:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/", (req, res) => {
      res.send(homePage);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
