using System;
using Azure.Identity;
using Microsoft.PowerPlatform.Dataverse.Client;
using Azure.Core;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace ConsoleApp5
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var managedIdentity = new DefaultAzureCredential();
            var environment = "https://orgyourvalue.crm.dynamics.com";
            var client = new ServiceClient(tokenProviderFunction: async u =>
                (await managedIdentity.GetTokenAsync(
                    new TokenRequestContext(new[] { $"{environment}/.default" }))).Token,
                    instanceUrl: new Uri(environment)
                    );

            Console.WriteLine("Client is {0}", client.IsReady);
            var cols = new ColumnSet("name", "address1_city");
            Guid accountId = Guid.Parse("SOME GUID");
            Entity entity = client.Retrieve("account", accountId, cols);

            Console.WriteLine(entity.Id);
        }
    }
}
