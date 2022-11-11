import SignupForm from '../../components/Forms/Signup/SignupForm';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      home page
      <SignupForm />
    </div>
  );
};

export default Home;
