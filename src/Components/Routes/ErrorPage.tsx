import { useRouteError } from 'react-router-dom';
import Nav from '../../Nav';
import '../style/errorPage.css';

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
