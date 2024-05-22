

import {JitsiMeeting} from '@jitsi/react-sdk';


const Meeting = () => {
    return (
      <JitsiMeeting
        domain={'meet.jit.si'}
        roomName="PleaseUseAGoodRoomName-yas"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: 'yasmine',
        }}
        onAPILoad={(JitsiMeetAPI) => {
          console.log('Good to go!');
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100vh';
        }}
      />
    );
  };
  
  export default Meeting;