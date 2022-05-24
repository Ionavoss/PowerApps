// referencing added packages via portal.
#r "Newtonsoft.Json" 
#r "Microsoft.AspNetCore.Mvc"
#r "Microsoft.AspNetCore.Http"
#r "Microsoft.AspNetCore.Http.Extensions"
#r "Microsoft.Azure.WebJobs"
#r "Microsoft.Azure.WebJobs.Extensions"
#r "Microsoft.Azure.WebJobs.Extensions.Http"

// using packages
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http; 
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;

// Start function
        public static async Task<IActionResult> Run(
            HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            // Generate temporary input file and output file
            var temp = Path.GetTempPath() + Path.GetRandomFileName() + ".webm";
            var tempOut = Path.GetTempPath() + Path.GetRandomFileName() + ".wav";

            try
            {
                // Get body and read byte information from it.
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                int commaStart = requestBody.IndexOf(",") + 1;          // remove "data:audio/webm;base64," and similar 
                string webmstrdata = requestBody.Substring(commaStart, requestBody.Length - commaStart);    
                byte[] webmbytesdata = Convert.FromBase64String(webmstrdata);
                File.WriteAllBytes(temp, webmbytesdata);
                log.LogInformation( "Try 1 succeeded");
            }
            catch (Exception e)
            {
                log.LogInformation(e.Message);
                return new BadRequestObjectResult(new ProblemDetails
                {
                    Status = 400,
                    Title = "Exception: " + e.Message
                });
            }

            try
            {
                // Start new process
                var psi = new ProcessStartInfo();
                psi.FileName = @"D:\home\site\wwwroot\webm-to-wave\ffmpeg.exe";
                psi.Arguments = $"-i \"{temp}\" \"{tempOut}\"";
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                psi.UseShellExecute = false;
                log.LogInformation($"Args: {psi.Arguments}");

                var process = Process.Start(psi);
                process.WaitForExit((int)TimeSpan.FromSeconds(60).TotalMilliseconds);

                string stdoutput = process.StandardOutput.ReadToEnd();
                string stderror = process.StandardError.ReadToEnd();

                log.LogInformation("FFMPEG: exitcode: " + process.ExitCode + "\r\n" + stdoutput + "\r\n" + stderror);
                log.LogInformation("FFMPEG: stdoutput: " + stdoutput);
                log.LogInformation("FFMPEG: stderror: " + stderror);

                if (process.ExitCode != 0)
                {
                    return new BadRequestObjectResult(new ProblemDetails
                    {
                        Status = 400,
                        Title = stderror
                    }
                    );
                }
            }
            catch (Exception e)
            {
                log.LogInformation(e.Message);
                return new BadRequestObjectResult(new ProblemDetails
                {
                    Status = 400,
                    Title = "Exception2: " + e.Message
                });
            }

            var bytes = File.ReadAllBytes(tempOut);

            // Delete temp files
            File.Delete(tempOut);
            File.Delete(temp);

            await Task.Run(() => { });

            return new FileContentResult(bytes, "audio/wav");

        }
