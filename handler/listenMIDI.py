import socket
import json
import traceback
import sys

UDP_IP = "127.0.0.1"
UDP_PORT = 5000

class ListenMIDI:
    def __init__(self, port) -> None:
        # Create the socket
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.socket.bind((UDP_IP, port))
        print(f"Listening on {UDP_IP}:{port}...")

        # Buffer and storage for MIDI data
        self.all_midi_data = []
        self.buffer = ""

    def save_midi_data(self, remaining = False):
        try:
            if self.all_midi_data:
                deserialized = self.all_midi_data[0] # Deserialize JSON bytearray into Python object
                # json.dump(deserialized, json_file, indent=4)
                if remaining:
                    print("Remaining data saved successfully.")
                else:
                    print("MIDI data saved successfully.")
                
                # return deserialized midi JSON data as object
                return deserialized
        except Exception as e:
            print(f"Failed to save MIDI data: {e}")
            traceback.print_exc()

    def listen_and_parse(self):
        try:
            while True:
                data, addr = self.socket.recvfrom(4096) # buffer size 4096
        
                try:
                    # Decode the byte stream to a string and add it to the buffer
                    self.buffer += data.decode('utf-8')
        
                    # Check for the end marker "ENDOF" to determine if we have received the full data
                    if "ENDOF" in self.buffer:
                        complete_data = self.buffer.replace("ENDOF", "").strip()  # Remove the end marker
                        
                        # Check if the complete data is valid JSON
                        try:
                            midi_data = json.loads(complete_data)
                            self.all_midi_data.append(midi_data)
                            print("Appended data, length:", len(self.all_midi_data))
                            self.buffer = ""  # Clear the buffer after successful parsing
                            print("Cleared buffer")
        
                            # Save accumulated MIDI data and exit
                            # print("Wrote to midi_data.json!")
                            return self.save_midi_data()

                        except json.JSONDecodeError as e:
                            print(f"Failed to decode JSON: {e}")
                            traceback.print_exc()
        
                except Exception as e:
                    print(f"Error while processing data: {e}")
                    traceback.print_exc()
        
        except KeyboardInterrupt:
            # Handle script termination (e.g., Ctrl+C)
            print("\nInterrupted, saving remaining MIDI data...")
            self.save_midi_data(remaining=False)
            sys.exit()
        
        finally:
            self.socket.close()
