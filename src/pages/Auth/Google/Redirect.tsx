import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDetailsFromOauth } from '../../../api/auth';
import Spinner from '../../../components/Spinner/Spinner';
import useErrorHandlers from '../../../hooks/useErrorHandlers';
import useUser from '../../../hooks/useUser';
import style from './Redirect.module.scss';

const Redirect: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { handleRequestError } = useErrorHandlers();
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const oauthUrl = window.location.pathname + window.location.search;
      const { data } = await getUserDetailsFromOauth(oauthUrl);
      updateUser(data);
    } catch (err) {
      handleRequestError(err as AxiosError);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.redirect}>
      {loading && <Spinner width="100px" height="100px" />}
    </div>
  );
};

export default Redirect;
