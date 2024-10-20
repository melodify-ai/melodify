import requests
from listenMIDI import ListenMIDI

def main():
    midi_listener = ListenMIDI(port=5000)
    midi_data = midi_listener.listen_and_parse()

    try:
        res = requests.post("http://127.0.0.1:5001/midi", json=midi_data)
        if res.status_code == 200:
            print(f"Success: {res.text}")
        else:
            print(f"Failed to send data: {res.status_code}, {res.text}")
    except Exception as e:
        raise e

if __name__ == "__main__":
    main()
