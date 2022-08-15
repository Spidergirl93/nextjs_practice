
import styles from './MeetupDetail.module.css';

const MeetupDetail = (props) => {
  return (
    <section className={styles.detail}>
      <img src={props.image} />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <address>{props.address}</address>
    </section>
  );
};

export default MeetupDetail;
