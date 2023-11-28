import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import ValidationContext from '../../Context/ValidationContext';

const AccountTabs = () => {
  const location = useLocation();

  const [tabSelection, setTabSelection] = useState(
    location.pathname.split('/')[2]
  );
  const navigate = useNavigate();
  const data = useContext(ValidationContext);

  useEffect(() => {
    const path = location.pathname;
    const selectedLocation = path.split('/')[2];
    setTabSelection(selectedLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(location);
  }, []);
  return (
    <>
      {data.isValid ? (
        <Tabs
          className='mb-3'
          justify
          activeKey={tabSelection}
          onSelect={(key: any) => {
            if (key) {
              setTabSelection(key);
              navigate(`${key}`);
            }
          }}
        >
          <Tab eventKey='/account' title='Account'></Tab>
          <Tab eventKey='/account/logout' title='Logout'></Tab>
        </Tabs>
      ) : (
        <Tabs
          className='mb-3'
          justify
          activeKey={tabSelection}
          onSelect={(key: any) => {
            if (key) {
              setTabSelection(key);
              navigate(`${key}`);
            }
          }}
        >
          <Tab eventKey='register' title='Register'></Tab>
          <Tab eventKey='login' title='Login'></Tab>
        </Tabs>
      )}
      {/* <Outlet /> */}
    </>
  );
};

export default AccountTabs;
