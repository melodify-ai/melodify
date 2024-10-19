import socket
import json
import traceback
import sys

UDP_IP = "127.0.0.1"
UDP_PORT = 5000

# Create the socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((UDP_IP, UDP_PORT))

print(f"Listening on {UDP_IP}:{UDP_PORT}...")

all_midi_data = []
buffer = ""

def save_midi_data():
    # threading.Timer(5.0, save_midi_data).start()  # Schedule to run every 5 seconds
    try:
        if all_midi_data:
            with open('midi_data.json', 'w') as json_file:
                json.dump(json.loads(all_midi_data[0]), json_file, indent=4)
            print("MIDI data saved successfully.")
    except Exception as e:
        print(f"Failed to save MIDI data: {e}")
        traceback.print_exc()

try:
    while True:
        data, addr = sock.recvfrom(4096) # buffer size 4096

        try:
            # Decode the byte stream to a string and add it to the buffer
            buffer += data.decode('utf-8')

            # Check for the end marker "ENDOF" to determine if we have received the full data
            if "ENDOF" in buffer:
                complete_data = buffer.replace("ENDOF", "").strip()  # Remove the end marker
                
                # Check if the complete data is valid JSON
                try:
                    midi_data = json.loads(complete_data)
                    all_midi_data.append(midi_data)
                    print("Appended data, length:", len(all_midi_data[0]))
                    buffer = ""  # Clear the buffer after successful parsing
                    print("Cleared buffer")

                    # Save accumulated MIDI data and exit
                    save_midi_data()
                    print("Saved ... exiting.")
                    sys.exit()
                except json.JSONDecodeError as e:
                    print(f"Failed to decode JSON: {e}")
                    traceback.print_exc()

        except Exception as e:
            print(f"Error while processing data: {e}")
            traceback.print_exc()

except KeyboardInterrupt:
    # Handle script termination (e.g., Ctrl+C)
    print("\nInterrupted, saving remaining MIDI data...")
    try:
        # Attempt to save any remaining valid JSON data in the buffer
        if "ENDOF" in buffer:
            complete_data = buffer.replace("ENDOF", "").strip()
            try:
                all_midi_data.append(complete_data)
            except json.JSONDecodeError:
                pass  # Ignore if it still fails

        # Save all the accumulated MIDI data
        with open('midi_data.json', 'w') as json_file:
            json.dump(json.loads(all_midi_data[0]), json_file, indent=4)
        print("Remaining data saved successfully.")

    except Exception as e:
        print(f"Failed to save remaining MIDI data: {e}")
        traceback.print_exc()

    sys.exit()
