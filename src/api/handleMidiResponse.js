// will be receiving a json body through messagename
const jsonString = messagename;
try {
  var midiData = JSON.parse(jsonString);
  var api = new LiveAPI(null, "live_set tracks 0 arrangement_clips 0");
  if (!api) {
    post("No API object for generated MIDI\n");
    return;
  }
} catch (e) {
  post(e);
}
