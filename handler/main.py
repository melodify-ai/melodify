import requests
from listenMIDI import ListenMIDI, UDP_PORT

def main():
    midi_listener = ListenMIDI(port=UDP_PORT)
    midi_data = midi_listener.listen_and_parse()

    # post request to flask API
    if midi_data:
        try:
            headers = {'Content-Type': 'application/json'}
            res = requests.post("http://127.0.0.1:5001/midi", json=midi_data, headers=headers)
            if res.status_code == 200:
                # print(f"Success: {res.text}")
                print("success")
            else:
                print(f"Failed to send data: {res.status_code}, {res.text}")
        except Exception as e:
            print(e)

if __name__ == "__main__":
    main()
