function insertMIDI() {
  const jsonString = messagename;
  try {
    var midiData = JSON.parse(jsonString);
    var api = new LiveAPI(null, "live_set tracks 0 arrangement_clips 0");
    if (!api) {
      post("No API object for generated MIDI\n");
      return;
    }

    // api.call("remove_notes", 0, 0, 999, 127); // Clear existing notes before adding new ones

    // Add new generated notes
    for (var i = 0; i < midiData.notes.length; i++) {
      var note = midiData.notes[i];
      api.call(
        "add_new_note",
        note.pitch,
        note.start_time,
        note.duration,
        note.velocity,
      );
    }

    post("Generated MIDI notes added to clip\n");
  } catch (e) {
    post("Failed to parse MIDI JSON " + e);
  }
}
