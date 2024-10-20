// function getMIDINotes() {
//   var api = new LiveAPI(null, "live_set tracks 0 arrangement_clips 0");
//   if (!api) {
//     post("no api object!\n");
//     return;
//   } else {
//     post("api object found\n");
//   }
//
//   var notes = api.call("get_all_notes_extended");
//   const notesJsonStr = JSON.stringify(notes);
//
//   // Chunk the JSON string into manageable parts
//   const chunkSize = 512;
//   for (var i = 0; i < notesJsonStr.length; i += chunkSize) {
//     var chunk = notesJsonStr.slice(i, i + chunkSize);
//     var bytes = stringToBytes(chunk);
//     outlet(0, bytes);
//   }
//
//   // Send an end marker to indicate all chunks are sent
//   outlet(0, stringToBytes("ENDOF"));
// }
//
// function stringToBytes(str) {
//   var bytes = [];
//   for (var i = 0; i < str.length; i++) {
//     bytes.push(str.charCodeAt(i));
//   }
//   return bytes;
// }
//
// function bang() {
//   getMIDINotes();
// }
//

function getMIDINotes() {
  // Create LiveAPI object to get notes from track 0, arrangement clip 0
  var api = new LiveAPI(null, "live_set tracks 0 arrangement_clips 0");
  // var api = new LiveAPI(null, "live_set view highlighted_clip_slot");
  if (!api) {
    post("no api object!\n");
    return;
  } else {
    post("api object found\n");
  }

  // Retrieve all notes
  var notes = api.call("get_all_notes_extended");

  // Create another LiveAPI object to get the project tempo
  var tempoApi = new LiveAPI(null, "live_set");
  if (!tempoApi) {
    post("no tempo api object!\n");
    return;
  } else {
    post("tempo api object found\n");
  }

  // Retrieve the tempo value
  var tempo = tempoApi.get("tempo");

  // Construct the combined data object
  var combinedData = {
    tempo: tempo[0],
    notes: notes,
  };

  // Convert the combined data to JSON string
  const notesJsonStr = JSON.stringify(combinedData);

  // Chunk the JSON string into manageable parts
  const chunkSize = 512;
  for (var i = 0; i < notesJsonStr.length; i += chunkSize) {
    var chunk = notesJsonStr.slice(i, i + chunkSize);
    var bytes = stringToBytes(chunk);
    outlet(0, bytes);
  }

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
