import { setInterval } from "timers";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import haversine from 'haversine-distance'

export class LatLon implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private latitude_target: number = 0;
    private longitude_target: number = 0;
    private new_latitude: number | null = null;
    private new_longitude: number | null = null;
    private _container: HTMLDivElement;
    private distance: number;

    constructor() {}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        
        if ( typeof context.parameters.target_latitude.raw !== 'number' || typeof context.parameters.target_longitude.raw !== 'number' ) {
            this.latitude_target = 0;
            this.longitude_target = 0;
        } else {
            this.latitude_target = context.parameters.target_latitude.raw!
            this.longitude_target = context.parameters.target_longitude.raw!
        }
        this._container = document.createElement("div")
        this._container.id = "container1"
        container.appendChild(this._container)    
        var _intervalId = window.setInterval(() => {
                context.device.getCurrentPosition().then(
                    (position) => {
                        this.new_latitude = position.coords.latitude
                        this.new_longitude = position.coords.longitude,
                        console.log()
                        this.CalculateDistance( notifyOutputChanged )
                        this._container.innerText = `Rendering location and distance: ${this.distance}`
                    }
                )
            }, 1000); 
        }
    
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.latitude_target = context.parameters.target_latitude.raw!
        this.longitude_target = context.parameters.target_longitude.raw!
    }

    public getOutputs(): IOutputs {
        console.log( this.distance)
        return {
            latitude: this.new_latitude!,
            longitude: this.new_longitude!,
            distance: this.distance,
            distance_miles: this.distance * 0.621371192,
        };
    }

    public destroy(): void {

    }

    private CalculateDistance(notifyOutputChanged: () => void){

        if ( typeof this.new_latitude === 'number' || typeof this.new_longitude === 'number' ){
            var nla:number = this.new_latitude!
            var nlo:number = this.new_longitude!

            var a = { latitude: this.latitude_target, longitude: this.longitude_target }
            var b = { latitude: nla, longitude: nlo}
            this.distance = haversine( a, b) / 1000;
            console.log(haversine(a, b))
            notifyOutputChanged()
        }
        else {
            this.distance = 0
        }
        notifyOutputChanged()
    }
}