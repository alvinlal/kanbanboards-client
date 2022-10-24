import Search from '../../components/Search/Search';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      home page
      <Search />
    </div>
  );
};

export default Home;
