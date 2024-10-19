from listenMIDI import ListenMIDI

def main():
    midi_listener = ListenMIDI(port=5000)
    midi_listener.listen_and_write()

if __name__ == "__main__":
    main()
