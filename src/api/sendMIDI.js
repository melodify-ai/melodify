function sendMIDI(data) {
  var jsonData = JSON.stringify(data);

  var url = "http://127.0.0.1:9999/midi";
  var httpRequest = new XMLHttpRequest();
  httpRequest.open("POST", url, true);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.send(jsonData);
}

function bang() {
  var midiNotes = {
    notes: [
      {
        note_number: 60, // Middle C
        velocity: 100, // Velocity of the note
        start_time: 0, // Start time in beats
        duration: 1.5, // Duration in beats
      },
      {
        note_number: 62, // D
        velocity: 80, // Velocity of the note
        start_time: 1.5, // Start time in beats
        duration: 1.0, // Duration in beats
      },
      {
        note_number: 64, // E
        velocity: 90, // Velocity of the note
        start_time: 2.5, // Start time in beats
        duration: 2.0, // Duration in beats
      },
    ],
  };

  sendMIDI(midiNotes);
}
