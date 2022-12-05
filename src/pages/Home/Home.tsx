import LoginForm from '../../components/Forms/Login/LoginForm';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      home page
      <LoginForm />
    </div>
  );
};

export default Home;
