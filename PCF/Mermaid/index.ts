import { Script } from "vm";
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import mermaid from 'mermaid'
import { resolve } from "path";

export class mermaids implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLPreElement
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

    
    public updateMermaidView( text:string ) {

        var _obj = document.getElementById("mermaid2")!
        mermaid.render('mermaid', text)
        .then( res => {
            _obj.innerHTML = res.svg
        })
        .catch( e => console.log("e: " + e))
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {

         this._container = document.createElement("pre")
         container.appendChild(this._container)
         container.setAttribute("width", "300px")
         container.setAttribute("heigth", "300px")
         container.setAttribute("viewBox", `0 0 400 400`)
         container.classList.add("mermaid")
         container.id = "mermaid2"  
        var mermaidText = context.parameters.mermaid_text.raw!
        this.updateMermaidView( mermaidText)

    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        var mermaidText = context.parameters.mermaid_text.raw!
        this.updateMermaidView( mermaidText )
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
