import { type } from "os";
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { resolve } from "path";

export class rdw implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLDivElement
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */

    public getCar( license:string ) {

        const base_url = "http://opendata.rdw.nl/api/id/m9d7-ebf2.json?$where=kenteken='";
        var url = base_url + license + "'"
        let data  = ''
        const div = document.getElementById("RDW-INFO")!

        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                
                var res = JSON.parse(this.responseText);
                data = res[0];
                let vhcl = JSON.parse( JSON.stringify(data, null, 2) );

                // setting car values:
                var car = vhcl.merk + ' ' + vhcl.handelsbenaming
                var soort = vhcl.inrichting
                var hoogte = vhcl.hoogte_voertuig
                var kleur = vhcl.eerste_kleur
                var kleur2 = vhcl.tweede_kleur
                var wok = vhcl.wacht_op_keuren
                var wam = vhcl.wam_verzekerd
                var cyls = vhcl.aantal_cilinders
                var volume = vhcl.cilinderinhoud
                var lege_massa = vhcl.massa_ledig_voertuig
                var massa_klaar = vhcl.massa_rijklaar
                var max_massa = vhcl.toegestane_maximum_massa_voertuig
                var lengte = vhcl.lengte
                var breedte =vhcl.breedte

                // Tenaamstelling
                var dateString1  = vhcl.datum_tenaamstelling;
                var year1        = dateString1.substring(0,4);
                var month1       = dateString1.substring(4,6);
                var day1         = dateString1.substring(6,8);
                var tenaamstelling = new Date(year1, month1-1, day1);
                
                // APK
                var dateString2  = vhcl.vervaldatum_apk;
                var year2        = dateString1.substring(0,4);
                var month2       = dateString1.substring(4,6);
                var day2         = dateString1.substring(6,8);
                var APK = new Date(year2, month2-1, day2);
                
                // Render
                div.innerText = "Auto: " + car + '\n'
                div.innerText += "Soort: " + soort + '\n'
                div.innerText += "Afmetingen (L x B x H): " + lengte + ' x ' + breedte + ' x ' + hoogte  + '\n'
                div.innerText += "WAM: " + wam + '\n'
                div.innerText += "WOK: " + wok + '\n'
                div.innerText += "APK Vervaldatum: " + APK +'\n'
                div.innerText += "Laatste tenaamstelling: " + tenaamstelling + '\n'
                div.innerText += "Massa ledig voertuig: " + lege_massa + ' kg' + '\n'
                div.innerText += "Massa Rijklaar: " + massa_klaar + ' kg' + '\n'
                div.innerText += "Totale maximum massa: " + max_massa + ' kg'+'\n'
                div.innerText += "Cylinders en Inhoud: " + cyls + " cylinders, " + volume + " cm3" +  '\n'
                div.innerText += "Primaire kleur: " + kleur + '\n'
                div.innerText += "Secundaire kleur: " + kleur2 + '\n'
                //div.innerText = JSON.stringify(data, null, 2)
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this._container = document.createElement("div")
        container.appendChild(this._container)
        container.id = "RDW-INFO"        
        var licenseplate = context.parameters.vehicle_registration.raw!;
        this.getCar(licenseplate);

        
        
        //const url = "http://opendata.rdw.nl/api/id/m9d7-ebf2.json?$where=kenteken='63BKP7'"
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        var licenseplate = context.parameters.vehicle_registration.raw!;
        this.getCar(licenseplate);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
