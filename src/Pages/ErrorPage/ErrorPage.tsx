import { useRouteError } from 'react-router-dom';
import Nav from '../../Components/Navigation/Nav';
import './errorPage.css';

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <>
      <Nav />
      <div id='error-page'>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </>
  );
}
