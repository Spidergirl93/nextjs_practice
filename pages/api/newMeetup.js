import { MongoClient } from "mongodb";

const NewMeetup = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://walkmary:SesameOpen@meetup.ltcqybe.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");
    
    const result = await meetupCollection.insertOne(data);

    console.log(result);

    res.status(201).json({ message: "Data has been saved successfully!" });
  }
};

export default NewMeetup;
