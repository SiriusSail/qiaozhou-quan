import * as React from 'react';
import Enums from '@/stores/enums';
import UserInfo from '@/stores/userInfo';
import { useEffect } from 'react';
import storage from '@/utils/storage';
import getCurrentPageUrl from '@/utils/getCurrentPageUrl';
import './app.css';
import 'annar/dist/annar.css';
import 'anna-remax-ui/dist/anna.css';
import './annar.css';

const App: React.FC = (props) => {
  useEffect(() => {
    const { options } = getCurrentPageUrl<{
      invitationCode: string;
      q: string;
    }>();
    const shareCode = decodeURIComponent(options?.q || '').split(
      'invitationCode='
    )[1];
    const oldInvitedCode = storage.get('invitedCode');
    if ((shareCode || options?.invitationCode) && !oldInvitedCode) {
      storage.set('invitedCode', shareCode || options?.invitationCode);
    }
  }, []);
  return (
    <UserInfo.Provider>
      <Enums.Provider>{props.children}</Enums.Provider>
    </UserInfo.Provider>
  );
};

export default App;
