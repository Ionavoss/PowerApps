import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

export class iotdemo implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _accessToken: string = ''
    private _connection: HubConnection
    private negotiateUrl: string = 'https://resourcename.azurewebsites.net/api/negotiate?code=accesscode'
    private signalRurl: string = 'https://resourcename.service.signalr.net'
    private hubName: string = 'iot'
    
    
    constructor() {

    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        fetch(this.negotiateUrl, { method: "post" })
            .then((response) => {
                if (response.ok) {
                    console.log("Negotiated...");
                    return response.json();
                } else {
                    throw new Error("Failed to negotiate SignalR connection.");
                }
            })
            .then((data) => {
                this._accessToken = data.accessToken;
                this.connectToHub(data.accessToken);
            })
            .catch((error) => {
                console.error("Error during SignalR negotiation:", error);
            });
    }

    private connectToHub(token: string): void {
        const hubUrl = `${this.signalRurl}/client/?hub=${this.hubName}&access_token=${token}`;
        this._connection = new HubConnectionBuilder()
            .withUrl(hubUrl, { accessTokenFactory: () => token })
            .build();

        this._connection.start()
            .then(() => {
                console.log("SignalR connection started successfully!");
            })
            .catch((error) => {
                console.error("Error starting SignalR connection:", error);
            });

        this._connection.on("newTelemetry", (message) => {
           
            console.log(message)
            //
        });


    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Add code to update control view
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
