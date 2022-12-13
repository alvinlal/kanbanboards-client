import { Helmet } from 'react-helmet';
import styles from './SignupPage.module.scss';
import { ReactComponent as PeopleUsingKanbanBoard } from '../../../assets/images/people_using_kanbanboard.svg';
import SignupForm from '../../../components/Forms/Signup/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Signup</title>
        <meta name="description" content="Create an account on kanbanboards" />
      </Helmet>
      <main className={styles.container}>
        <PeopleUsingKanbanBoard className={styles.people__using__kanbanboards} />
        <div className={styles.form__container}>
          <SignupForm />
        </div>
      </main>
    </>
  );
};

export default SignupPage;
