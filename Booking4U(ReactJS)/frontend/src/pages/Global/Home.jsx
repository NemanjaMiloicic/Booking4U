import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/PrijavaForm/PrijavaForm';
import { jwtDecode } from 'jwt-decode';
import Hotels from '../../components/Hotels/Hotels';

export const Home = ({loginDialogOpen,setLoginDialogOpen,filterOpen}) => {

  const navigate = useNavigate();

  useEffect(() => {

    const redirectToCorrectPage = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const { TypeOfUser, exp } = decoded;

        if (exp * 1000 < Date.now()) {
          localStorage.removeItem('token'); 
          return;
        }

        switch (TypeOfUser) {
          case 'user':
            navigate('/user');
            break;
          case 'admin':
            navigate('/admin');
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    };

    redirectToCorrectPage();
  }, [navigate]);

  return (
    <>
        {loginDialogOpen && (
            <div className='prijava-container'>
                <LoginForm loginDialogOpen={loginDialogOpen} setLoginDialogOpen={setLoginDialogOpen}/>
            </div>
        )}
        <Hotels filterOpen={filterOpen}/>
    </> 
  );
}
