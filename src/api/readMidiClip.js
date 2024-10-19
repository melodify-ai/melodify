function getMIDINotes() {
  var api = new LiveAPI(null, "live_set tracks 0 arrangement_clips 0");
  if (!api) {
    post("no api object!\n");
    return;
  } else {
    post("api object found\n");
  }

  var notes = api.call("get_all_notes_extended");
  const notesJsonStr = JSON.stringify(notes);

  // Chunk the JSON string into manageable parts
  const chunkSize = 512;
  for (var i = 0; i < notesJsonStr.length; i += chunkSize) {
    var chunk = notesJsonStr.slice(i, i + chunkSize);
    var bytes = stringToBytes(chunk);
    outlet(0, bytes);
  }

  // Send an end marker to indicate all chunks are sent
  outlet(0, stringToBytes("ENDOF"));
}

function stringToBytes(str) {
  var bytes = [];
  for (var i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

function bang() {
  getMIDINotes();
}
