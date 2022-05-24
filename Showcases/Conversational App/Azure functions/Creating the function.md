# How to create the Azure function:

- Create an Azure Functions App, for this example a .NET6 runtime on Windows.
- In the code pane, paste the run.csx content
- In the settings pane, click on Advanced Tools under Development Tools and click on Go.
- Via the debug console option in the top, go to CMD
- Navigate to site\wwwroot and create a folder named webm-to-wave.
- In this newly created folder, upload the ffmpeg.exe, ffprobe.exe and ffplay.exe
- In the folder of your function within site\wwwroot\{yourfunction}, create a file named function.proj and paste the contect of the function.proj file from this repo.
- You can now generate wave files from webm files. 
