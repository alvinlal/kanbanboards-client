import { Helmet } from 'react-helmet';
import LoginForm from '../../../components/Forms/Login/LoginForm';
import styles from './LoginPage.module.scss';
import { ReactComponent as PeopleUsingKanbanBoard } from '../../../assets/images/people_using_kanbanboard.svg';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login to kanbanboards</title>
        <meta name="description" content="Login to kanbanboards" />
      </Helmet>
      <main className={styles.container}>
        <PeopleUsingKanbanBoard className={styles.people__using__kanbanboards} />
        <div className={styles.form__container}>
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
