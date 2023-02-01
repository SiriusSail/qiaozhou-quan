import * as React from 'react';
import Enums from '@/stores/enums';
import UserInfo from '@/stores/userInfo';
import './app.css';
import 'annar/dist/annar.css';
import 'anna-remax-ui/dist/anna.css';
import './annar.css';

const App: React.FC = (props) => {
  return (
    <UserInfo.Provider>
      <Enums.Provider>{props.children}</Enums.Provider>
    </UserInfo.Provider>
  );
};

export default App;
