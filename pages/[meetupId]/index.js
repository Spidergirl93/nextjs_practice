import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetailPage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        id={props.meetupData._id}
        title={props.meetupData.title}
        address={props.meetupData.address}
        image={props.meetupData.image}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://walkmary:SesameOpen@meetup.ltcqybe.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://walkmary:SesameOpen@meetup.ltcqybe.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const foundMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        ...foundMeetup,
        _id: foundMeetup._id.toString(),
      },
    },
  };
};

export default MeetupDetailPage;
