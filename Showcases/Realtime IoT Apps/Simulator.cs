using System;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Devices.Client;


class Program
{
    private static DeviceClient deviceClient;
    private static readonly string connectionString = "HostName=d365-iot-demo.azure-devices.net;DeviceId=dht11;SharedAccessKey=DoyB4N+JxjL3qo2ZCdAMyk1+MAb66XtA+V/bjYjPGi0=";

    static async Task Main(string[] args)
    {
        Console.WriteLine("Simulated device\n");
        deviceClient = DeviceClient.CreateFromConnectionString(connectionString, TransportType.Mqtt);

        await deviceClient.OpenAsync();

        Console.WriteLine("Device connected to IoT Hub");

        await deviceClient.SetReceiveMessageHandlerAsync(HandleReceivedMessageAsync, deviceClient);

        await SendDeviceToCloudMessagesAsync();

        Console.WriteLine("Press any key to exit.");
        Console.ReadLine();

        await deviceClient.CloseAsync();
    }

    private static async Task<MessageResponse> HandleReceivedMessageAsync(Message message, object userContext)
    {
        string messageData = Encoding.UTF8.GetString(message.GetBytes());
        Console.WriteLine($"Received message: {messageData}");

        // Complete the message (mark it as processed) so that it is not received again
        await deviceClient.CompleteAsync(message);

        return MessageResponse.Completed;
    }

    private static async Task SendDeviceToCloudMessagesAsync()
    {
        Random rand = new Random();

        while (true)
        {
            int temperature = rand.Next(20, 30);
            int humidity = rand.Next(60, 80);
            string deviceId = "dht11";

            string messageString = $"{{\"temperature\":{temperature},\"humidity\":{humidity},\"deviceId\":\"{deviceId}\"}}";
            byte[] messageBytes = Encoding.UTF8.GetBytes(messageString);
            Message message = new Message(messageBytes);

            Console.WriteLine($"Sending message: {messageString}");

            await deviceClient.SendEventAsync(message);

            await Task.Delay(200);
        }
    }
}
