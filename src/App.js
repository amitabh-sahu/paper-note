import Header from './components/header';
import AllNotes from './components/allNotes';
import TextField from './components/textField';
import SignIn from './components/signIn';
import Loding from './components/Loding';
import NoMatch from './components/noMatch';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, onAuthStateChanged } from './firebase';
import { useStateValue } from './context';
import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setisLoading] = useState(true);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: 'SET_USER',
        user: user,
      });
      setisLoading(false);
    });
  }, []);

  return (
    <Box sx={{ p: 3, height: '100vh', display: 'grid', gridTemplateRows: 'max-content auto', gap: 3 }}>
      {isLoading ? (
        <Loding />
      ) : (
        user ? (
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <AllNotes />
              </Route>
              <Route path="/add">
                <TextField />
              </Route>
              <Route path="/edit/:noteId">
                <TextField />
              </Route>
              <Route path="/fallout">
                <NoMatch />
              </Route>
              <Route>
                <NoMatch />
              </Route>
            </Switch>
          </Router>
        ) : (
          <SignIn />
        )
      )}
    </Box>
  );
}

export default App;