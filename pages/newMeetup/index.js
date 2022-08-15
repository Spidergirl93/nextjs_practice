import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (newMeetup) => {
    const response = await fetch("/api/newMeetup", {
      method: "POST",
      body: JSON.stringify(newMeetup),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta name="description" content="Add a new location dude..." />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
