# Speech-to-text and actions in PowerApps

To act on speech in a Canvas App, only a 3-step process is needed

1. Capture audio
2. Convert audio
3. Detect text

## Capturing audio
To capture audio, under the media pane in PowerApps, a microphone function is provided.
The magic happens at the onStop action of the microphone properties.
The solution provided shows insights on how to use this functionality.

## The zip file solution
The solution contains a power automate flow and a canvas app.
The app is used as the recording interface and flow redirects the audio to azure functions and cognitive services.
Information can be found at: https://www.linkedin.com/pulse/powerapps-voice-commands-reality-iona-varga/


