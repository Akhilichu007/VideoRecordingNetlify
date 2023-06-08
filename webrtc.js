var localVideo;
var localStream;
var myName;
var remoteVideo;
var remoteStream;
var yourConn;
var uuid;
var serverConnection;
var connectionState;
var streams = [];

var name;
var connectedUser;
let pendingCandidates = [];

var peerConnectionConfig = {
  iceServers: [
    // { urls: "stun:stun.stunprotocol.org:3478" },
    // { urls: "stun:stun.l.google.com:19302" },
    // {
    //   urls: "turn:192.158.29.39:3478?transport=udp",
    //   credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    //   username: "28224511:1379330808",
    // },
    // {
    //   urls: "turn:192.158.29.39:3478?transport=tcp",
    //   credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
    //   username: "28224511:1379330808",
    // },
    //   {
    //     urls: 'turn:numb.viagenie.ca',
    //     credential: 'muazkh',
    //     username: 'webrtc@live.com'
    // },
    // {
    //     urls: 'turn:192.158.29.39:3478?transport=udp',
    //     credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    //     username: '28224511:1379330808'
    // },
    // {
    //     urls: 'turn:192.158.29.39:3478?transport=tcp',
    //     credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    //     username: '28224511:1379330808'
    // },
    // {
    //     urls: 'turn:turn.bistri.com:80',
    //     credential: 'homeo',
    //     username: 'homeo'
    //  },
    //  {
    //     urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
    //     credential: 'webrtc',
    //     username: 'webrtc'
    // }
    {
      urls: "stun:a.relay.metered.ca:80",
    },
    {
      urls: "turn:a.relay.metered.ca:80",
      username: "8b30fa9c2e936c89f43af7f7",
      credential: "22i9kv5PXqf05qrb",
    },
    {
      urls: "turn:a.relay.metered.ca:80?transport=tcp",
      username: "8b30fa9c2e936c89f43af7f7",
      credential: "22i9kv5PXqf05qrb",
    },
    {
      urls: "turn:a.relay.metered.ca:443",
      username: "8b30fa9c2e936c89f43af7f7",
      credential: "22i9kv5PXqf05qrb",
    },
    {
      urls: "turn:a.relay.metered.ca:443?transport=tcp",
      username: "8b30fa9c2e936c89f43af7f7",
      credential: "22i9kv5PXqf05qrb",
    },
  ],
};

// serverConnection = new WebSocket("wss://" + window.location.hostname + ":9002");
// serverConnection = new WebSocket("wss://" + window.location.hostname);

// serverConnection.onopen = function () {
//   console.log("Connected to the signaling server");
// };

// serverConnection.onmessage = gotMessageFromServer;

document.getElementById("otherElements").hidden = true;
var usernameInput = document.querySelector("#usernameInput");
var usernameShow = document.querySelector("#showLocalUserName");
var showAllUsers = document.querySelector("#allUsers");
var remoteUsernameShow = document.querySelector("#showRemoteUserName");
var loginBtn = document.querySelector("#loginBtn");
var callToUsernameInput = document.querySelector("#callToUsernameInput");
var callBtn = document.querySelector("#callBtn");
var hangUpBtn = document.querySelector("#hangUpBtn");

// Login when the user clicks the button
loginBtn.addEventListener("click", function (event) {
  name = usernameInput.value;
  let accessToken = "";
  if (name == "ichu")
    accessToken =
      "eyJraWQiOiJ0Nm1POUJTR2pWVStiNXA2b3B6bHhsbVVaQkc0YnhGTkJreHNnNERDZGtNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxZGZlMWMyOC1jMmMxLTRhYTYtODcwNy1jYjkxOWRjODg3MjAiLCJldmVudF9pZCI6IjY4NzdkMDFjLTA5MjUtNGI4NS04N2RjLWYzZTZmNTNkNjc1ZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYxOTg3MDUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2kyTjlLWW1KZiIsImV4cCI6MTY4NjI4NTEwNSwiaWF0IjoxNjg2MTk4NzA1LCJqdGkiOiIxYWNkNjBhNS0wYWY1LTQxMDMtOWZlOC1jOGY2MTBhYzU1YzIiLCJjbGllbnRfaWQiOiI3ZWI0cm03ZmIxN21ha3J0ajBqMmtiZ3R1YiIsInVzZXJuYW1lIjoiaWNodSJ9.nh8mRbjQEiNhxqerQBQz1OnhjU7C1LSyJd7wKMXH8hIs-TPi2QaSlZbFTJPXEZMpIz-lE_LoBPtdJ3WYwUcHfbqLrVMOYU-SvWJVXZtiJpD6JCQPl_da4CbURjRoTArfWIDOBEzB_6G-YpSfq5yPtg6mg0Tl1TAqQKTNp8ruF0pE5qXLN7vVUkmXjvYttMCsiKXHUHzvL_e89yCHo_BvZmtqnZJigB-C01pcExUD67WU5aaYgqEXN-ZEr8CPrsRmgnPP-84g-WhU4uC12F9pL1FFsst-aDBbrXfeU-0hRFGRaaHBo7rMHzPPNOJr0AU-qTGEqeM4jGxWYK4dAz9B7A";
  else if (name == "akhil")
    accessToken =
      "eyJraWQiOiJ0Nm1POUJTR2pWVStiNXA2b3B6bHhsbVVaQkc0YnhGTkJreHNnNERDZGtNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NWU4MTFjMy1mMTFiLTQxZTYtYjA2YS03MDZiYTE5YTlkNTAiLCJldmVudF9pZCI6ImI4ZmRiZDdkLTBmMzEtNGQ2NS04MWExLWFmZTlhYzVhMTRkMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2ODYxOTg4MDYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2kyTjlLWW1KZiIsImV4cCI6MTY4NjI4NTIwNiwiaWF0IjoxNjg2MTk4ODA2LCJqdGkiOiI3NDE4YjJkNi1jMDJlLTQyMmUtYmY4OC02OThkYWU1NDNmOTEiLCJjbGllbnRfaWQiOiI3ZWI0cm03ZmIxN21ha3J0ajBqMmtiZ3R1YiIsInVzZXJuYW1lIjoiYWtoaWwifQ.dx2L9pTx2axwxABd9BwilxnE1OzvsBuuNpe91_T458824_je6wE2GfO9fVuHODvpe_M5bF6vpGSogcN_8rO73aFzw47Z_fqjCzp59SpgUG5Y3KGvEyLTSAMRmLkqmjn9JBITic0X9a_LNQaJ_ydI9CGAPnfnOfOMZV7s6WXuXXVP3lvFln1waJQvJ9Zpv06rX8Cqjy-xxFslYtJ3Yr_awtbTQkeArdrNpeGgL1fQLropVTUm2v-bC-FEKFO8sWKyLaumI4GXKDLZvOhaPOLmWvQ4VqZvZAWSJcjSQ_hfY8w5T_33MziPswgCPjryFPLy0Xn5Akg-IgO5Ca6hNDugdQ";

//   serverConnection = new WebSocket(
//     `wss://1keph39fl9.execute-api.us-east-1.amazonaws.com/dev?user=${accessToken}`
//   );
  serverConnection = new WebSocket("wss://f79e-103-141-55-210.ngrok-free.app");

  serverConnection.onmessage = gotMessageFromServer;
  usernameShow.innerHTML = "Hello, " + name;

  serverConnection.onopen = function () {
    console.log("Connected to the signaling server");
    if (name.length > 0) {
      // send({
      //   type: "login",
      //   name: name,
      // });
      send({
        TO: name,
        KIND: "LOGIN",
        BODY: {
          username: name,
        },
        route: "webrtc",
        CHAT_ID: "",
      });
    }
  };
});

/* START: Register user for first time i.e. Prepare ground for webrtc call to happen */
function handleLogin(success) {
  if (success === false) {
    alert("Ooops...try a different username");
  } else {
    // var allAvailableUsers = allUsers.join();
    // console.log("All available users", allAvailableUsers);
    // showAllUsers.innerHTML = "Available users: " + allAvailableUsers;
    localVideo = document.getElementById("localVideo");
    remoteVideo = document.getElementById("remoteVideo");
    document.getElementById("myName").hidden = true;
    document.getElementById("otherElements").hidden = false;

    var constraints = {
      video: true,
      audio: true,
    };

    /* START:The camera stream acquisition */
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        // .then(getUserMediaSuccess)
        .then(function (stream) {
          getUserMediaSuccess(stream);
        })
        .catch(errorHandler);
    } else {
      alert("Your browser does not support getUserMedia API");
    }
    /* END:The camera stream acquisition */
  }
}
/* END: Register user for first time i.e. Prepare ground for webrtc call to happen */

function getUserMediaSuccess(stream) {
  localStream = stream;
  localVideo.srcObject = stream;
  yourConn = new RTCPeerConnection(peerConnectionConfig);

  connectionState = yourConn.connectionState;
  console.log("connection state inside getusermedia", connectionState);

  yourConn.onicecandidate = function (event) {
    console.log("event ==> ", event);
    console.log("onicecandidate inside getusermedia success", event.candidate);
    if (event.candidate) {
      console.log("yourConn.localDescription ==> ", yourConn.localDescription);
      if (yourConn.localDescription) {
        // send({
        //   type: "candidate",
        //   candidate: event.candidate,
        // });
        send({
          TO: connectedUser,
          KIND: "CANDIDATE",
          BODY: { candidate: event.candidate },
          CHAT_ID: "",
          route: "webrtc",
        });
      } else {
        // Add the candidate to the pending candidates array
        pendingCandidates.push(event.candidate);
        console.log("pendingCandidates in else ==> ", pendingCandidates);
      }
    }
  };

  yourConn.onsignalingstatechange = () => {
    console.log("onsignalingstatechange");
    console.log("pendingCandidates ==> ", pendingCandidates);
    console.log("yourConn.signalingState ===> ", yourConn.signalingState);
    if (yourConn.signalingState === "stable" && pendingCandidates.length > 0) {
      // Add all the pending candidates to the peer connection
      console.log(
        "if (yourConn.signalingState === 'stable' && pendingCandidates.length > 0) {"
      );
      pendingCandidates.forEach((candidate) => {
        console.log("Pending candiates loop");
        yourConn.addIceCandidate(candidate);
      });
      // Clear the pending candidates array
      pendingCandidates = [];
    }
  };

  yourConn.addEventListener("connectionstatechange", (event) => {
    console.log("Connection state change:", yourConn.connectionState);
    // Handle the connection state change here
    yourConn.restartIce();
  });
  yourConn.ontrack = gotRemoteStream;
  // yourConn.addStream(localStream);
  localStream.getTracks().forEach(function (track) {
    yourConn.addTrack(track, localStream);
  });
}

/* START: Initiate call to any user i.e. send message to server */
callBtn.addEventListener("click", function () {
  console.log("inside call button");

  var callToUsername = document.getElementById("callToUsernameInput").value;

  if (callToUsername.length > 0) {
    connectedUser = callToUsername;
    console.log("nameToCall", connectedUser);
    console.log("create an offer to-", connectedUser);

    var connectionState2 = yourConn.connectionState;
    console.log("connection state before call beginning", connectionState2);
    var signallingState2 = yourConn.signalingState;
    //console.log('connection state after',connectionState1)
    console.log("signalling state after", signallingState2);
    yourConn.createOffer(
      function (offer) {
        // send({
        //   type: "offer",
        //   offer: offer,
        // });
        send({
          KIND: "OFFER",
          BODY: {
            offer: offer,
            from: name,
          },
          TO: connectedUser,
          route: "webrtc",
          CHAT_ID: "",
        });

        yourConn.setLocalDescription(offer);
      },
      function (error) {
        alert("Error when creating an offer", error);
        console.log("Error when creating an offer", error);
      }
    );
    document.getElementById("callOngoing").style.display = "block";
    document.getElementById("callInitiator").style.display = "none";
  } else alert("username can't be blank!");
});
/* END: Initiate call to any user i.e. send message to server */

/* START: Recieved call from server i.e. recieve messages from server  */
function gotMessageFromServer(message) {
  console.log("Got message", message.data);
  var data = JSON.parse(message.data);

  switch (data.KIND) {
    case "LOGIN":
      console.log("LOGIN Switch case", new Date().toLocaleString());
      handleLogin(data.BODY.success);
      break;
    //when somebody wants to call us
    case "OFFER_RECEIVED":
      console.log("OFFER Switch case", new Date().toLocaleString());
      handleOffer(data.BODY.offer, data.BODY.from);
      break;
    case "ANSWER_RECEIVED":
      console.log("ANSWER Switch case", new Date().toLocaleString());
      handleAnswer(data.BODY.answer);
      break;
    //when a remote peer sends an ice candidate to us
    case "CANDIDATE_RECEIVED":
      console.log("CANDIDATE Switch case", new Date().toLocaleString());
      handleCandidate(data.BODY.candidate);
      break;
    case "LEAVE":
      console.log("LEAVE Switch case", new Date().toLocaleString());
      handleLeave();
      break;
    default:
      break;
  }

  serverConnection.onerror = function (err) {
    console.log("Got error", err);
  };
}

function send(msg) {
  //attach the other peer username to our messages
  if (connectedUser) {
    msg.name = connectedUser;
  }
  console.log("msg before sending to server", msg);
  serverConnection.send(JSON.stringify(msg));
}

function sendRecord(msg) {
  //attach the other peer username to our messages
  if (connectedUser) {
    msg.name = connectedUser;
  }
  console.log("msg before sending to server", msg);
  serverConnection.binaryType = "blob";
  serverConnection.send(msg);
}

/* START: Create an answer for an offer i.e. send message to server */
function handleOffer(offer, name) {
  document.getElementById("callInitiator").style.display = "none";
  document.getElementById("callReceiver").style.display = "block";

  /* Call answer functionality starts */
  answerBtn.addEventListener("click", function () {
    connectedUser = name;
    yourConn.setRemoteDescription(new RTCSessionDescription(offer));
    console.log("remote description set");

    //create an answer to an offer
    yourConn.createAnswer(
      function (answer) {
        yourConn.setLocalDescription(answer);

        // send({
        //   type: "answer",
        //   answer: answer,
        // });
        send({
          KIND: "ANSWER",
          BODY: {
            answer: answer,
          },
          TO: connectedUser,
          route: "webrtc",
          CHAT_ID: "",
        });
      },
      function (error) {
        alert("Error when creating an answer");
      }
    );
    document.getElementById("callReceiver").style.display = "none";
    document.getElementById("callOngoing").style.display = "block";
  });
  /* Call answer functionality ends */
  /* Call decline functionality starts */
  declineBtn.addEventListener("click", function () {
    document.getElementById("callInitiator").style.display = "block";
    document.getElementById("callReceiver").style.display = "none";
  });

  /*Call decline functionality ends */
}

function gotRemoteStream(event) {
  console.log("got remote stream, event", event);
  remoteVideo.srcObject = event.streams[0];
  // remoteStream = event.streams[0];
  remoteStream = event.streams[0];

  streams = [...event.streams];

  const mediaBlob = new Blob([remoteStream], { type: "video/webm" });
  const blobURL = URL.createObjectURL(mediaBlob);
  console.log("blobURL ===> ", blobURL);
}

function errorHandler(error) {
  console.log(error);
}

//when we got an answer from a remote user
function handleAnswer(answer) {
  console.log("answer: ", answer);
  yourConn.setRemoteDescription(new RTCSessionDescription(answer));
}

//when we got an ice candidate from a remote user
function handleCandidate(candidate) {
  if (yourConn.remoteDescription) {
    console.log("candidate =>", candidate);
    yourConn.addIceCandidate(new RTCIceCandidate(candidate));
  } else {
    // Add the candidate to the pending candidates array
    pendingCandidates.push(candidate);
    console.log("pendingCandidates in else ==> ", pendingCandidates);
    yourConn.addIceCandidate(new RTCIceCandidate(candidate));
  }
}

//hang up
hangUpBtn.addEventListener("click", function () {
  // send({
  //   type: "leave",
  // });
  connectedUser = name;
  send({
    KIND: "LEAVE",
    BODY: {},
    TO: connectedUser,
    route: "webrtc",
    CHAT_ID: "",
  });

  handleLeave();

  document.getElementById("callOngoing").style.display = "none";
  document.getElementById("callInitiator").style.display = "block";
});

function handleLeave() {
  connectedUser = null;
  remoteVideo.src = null;
  var connectionState = yourConn.connectionState;
  var signallingState = yourConn.signalingState;
  console.log("connection state before", connectionState);
  console.log("signalling state before", signallingState);
  yourConn.close();
  yourConn.onicecandidate = null;
  yourConn.onaddstream = null;
  var connectionState1 = yourConn.connectionState;
  var signallingState1 = yourConn.signalingState;
  console.log("connection state after", connectionState1);
  console.log("signalling state after", signallingState1);
}

//record

var btnStartRecording = document.querySelector("#btn-start-recording");
var btnStopRecording = document.querySelector("#btn-stop-recording");

var recorder;
var mediaStream = null;
var recordedChunks = [];
var mediaRecorder;

btnStartRecording.onclick = function () {
  // btnStartRecording.disabled = true;

  captureUserMedia(function (screenStream) {
    console.log("Inside captureUserMedia");
    mediaStream = screenStream;

    //remoteStream
    // const mergedStream = new MediaStream([...screenStream.getTracks(), ...remoteStream.getTracks()]);
    const mixer = new MultiStreamsMixer([screenStream, ...streams]);

    // yourConn.addStream(mixer.getMixedStream());

    mixer.frameInterval = 0;
    mixer.startDrawingFrames();

    // yourConn.onaddstream = function(event) {
    //   const mixedStream = event.stream;
    //   // Use the mixedStream here, e.g. attach it to a video element to display it
    // };
    mediaRecorder = new MediaRecorder(mixer.getMixedStream(), {
      mimeType: "video/webm; codecs=vp9,opus",
      videoBitsPerSecond: 2000000, // Set the desired bitrate (e.g., 2 Mbps)
      frameRate: 30, // Set the desired framerate (e.g., 30 frames per second)
    });

    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    });
    mediaRecorder.start();

    // recorder = RecordRTC(mixer.getMixedStream(), {
    //   type: "video",
    //   mimeType: 'video/mp4; codecs=avc1.4D401E, mp4a.40.2'
    // });

    // recorder.startRecording();

    // enable stop-recording button
    // btnStopRecording.disabled = false;
  });
};

btnStopRecording.onclick = function () {
  mediaRecorder.addEventListener("stop", async() => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    // const metadata = {
    //   duration: 10
    // };

    // Convert the metadata object to JSON string
    // const metadataString = JSON.stringify(metadata);

    // Create a new Blob with the metadata
    // const blobWithMetadata = new Blob([metadataString, blob], { type: 'application/octet-stream' });

    //additional code for converting
    // const { createFFmpeg, fetchFile } = FFmpeg;
    // const ffmpeg = createFFmpeg({
    //   log: true,
    // });
    // await ffmpeg.load();
    // ffmpeg.FS('writeFile', 'input.webm', await fetchFile(blob));
    // await ffmpeg.run('-i', 'input.webm',  'output.mp4');
    // const data = ffmpeg.FS('readFile', 'output.mp4');
    // let videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));

    // let videoUrl = URL.createObjectURL(blob);

    // const newLink = document.createElement("a");
    // newLink.href = videoUrl;
    // newLink.download = `${new Date().getTime()}.mp4`;
    // document.body.appendChild(newLink);
    // newLink.click();

    // URL.revokeObjectURL(videoUrl);

    //s3 bucker storing
    // AWS.config.update({
    //   accessKeyId: 'AKIA22YRTRVLRO6EYC4A',
    //   secretAccessKey: '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',
    //   region: 'us-east-1',
    // });
    AWS.config.update({
      accessKeyId: 'AKIAX4TRBN7XKKRQVGOT',
      secretAccessKey: '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',
      region: 'eu-north-1',
    });

    const s3 = new AWS.S3();

    // const bucketName = 'akhilichu-video-recording';
    const bucketName = 'chat-video-recordings';
    const fileName = 'VideoRecord1.webm';
    const fileContent = blob;

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileContent,
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log('Error uploading file:', err);
      } else {
        console.log('File uploaded successfully:', data);
        // const s3Link = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        // const videoElement = document.createElement('video');
        // videoElement.src = s3Link;
        // videoElement.controls = true;
        // document.body.appendChild(videoElement);
      }
    });

    // await ffmpeg.remove('input.webm');
    // await ffmpeg.remove('output.mp4');
    // sendRecord(blob);
  });

  mediaRecorder.stop();

  // recorder.stopRecording(postFiles);
};

function captureUserMedia(success_callback) {
  console.log("Inside captureUserMedia 2");
  var session = {
    audio: true,
    video: true,
  };
  navigator.mediaDevices.getUserMedia(session).then(success_callback);
}

function postFiles() {
  var blob = recorder.getBlob();
  console.log("blob  ==> ", blob);

  // const ws = new WebSocket(`ws://${window.document.location.host}`);
  // ws.binaryType = "blob";
  // Log socket opening and closing
  // ws.addEventListener("open", (event) => {
  //   console.log("Websocket connection opened");
  //   ws.send(blob);
  // });

  sendRecord(blob);
  if (mediaStream) mediaStream.stop();
}
// sendWebsocketHeader();
// function sendWebsocketHeader(){
//   const headers = ['header1: value1', 'header2: value2'];
//   const testConnection = new WebSocket('wss://1keph39fl9.execute-api.us-east-1.amazonaws.com/dev?user=007007007', headers);
//   testConnection.send({message: "Testing headers in websocket"});
//   console.log("Test socket message sent");
// }
