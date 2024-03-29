import {useState} from 'react'
import classes from "../app.module.css";
import Header from "../components/Header/header";
import Homepage from "../components/Home/homepage";
const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => {
    setShowModal(true)
  }
  return (
    <div className={classes.box}>
      <Header onShowModal = {handleShow}/>
      <main className={classes.main}>
        <Homepage showModal={showModal} setShowModal={setShowModal}/>
      </main>
    </div>
  );
};

export default Home;
