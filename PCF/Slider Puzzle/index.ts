import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class slidepuzzle implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLDivElement;
    private _progressbar: HTMLDivElement;
    
    constructor() {

    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {


        this._container = document.createElement("div")
        this._progressbar = document.createElement("div")
        this._progressbar.id = "progressdiv"
        this._progressbar.innerText = "In Progress"
        container.appendChild(this._container)
        container.appendChild(this._progressbar)

        var arr1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,'']
        arr1.sort(() => Math.random() - 0.25)
        arr1.sort(() => Math.random() - 0.53)
        arr1.sort(() => Math.random() - 0.84)

        let grid = `
        <table>
        <tr>
          <td id="1">${arr1[0]}</td>
          <td id="2">${arr1[1]}</td>
          <td id="3">${arr1[2]}</td>
          <td id="4">${arr1[3]}</td>
          <td id="5">${arr1[4]}</td>
        </tr>
        <tr>
          <td id="6">${arr1[5]}</td>
          <td id="7">${arr1[6]}</td>
          <td id="8">${arr1[7]}</td>
          <td id="9">${arr1[8]}</td>
          <td id="10">${arr1[9]}</td>
        </tr>
        <tr>
          <td id="11">${arr1[10]}</td>
          <td id="12">${arr1[11]}</td>
          <td id="13">${arr1[12]}</td>
          <td id="14">${arr1[13]}</td>
          <td id="15">${arr1[14]}</td>
        </tr>
        <tr>
          <td id="16">${arr1[15]}</td>
          <td id="17">${arr1[16]}</td>
          <td id="18">${arr1[17]}</td>
          <td id="19">${arr1[18]}</td>
          <td id="20">${arr1[19]}</td>
        </tr>
        <tr>
        <td id="21">${arr1[20]}</td>
        <td id="22">${arr1[21]}</td>
        <td id="23">${arr1[22]}</td>
        <td id="24">${arr1[23]}</td>
        <td id="25">${arr1[24]}</td>
      </tr>
      </table> `
      this._container.innerHTML = grid

        var nullFound = false
        var i = 1
        var index = 0;

        while(!nullFound){

            const textElement = document.getElementById(`${i}`)?.innerText
            //console.log(textElement)
            if( textElement == '' ){
                index = i;
                nullFound = true
            }
            i++;
            //console.log(i)
        }

        //console.log(index)
        document.getElementById(`${index}`)?.setAttribute('class', 'empty')
        //console.log( document.getElementById(`${i}`) )

        for( i = 1; i <= 25; i++ ) {
            document.getElementById(`${i}`)?.addEventListener("click", this.onButtonClick)
        }

    }

    private onButtonClick = (event: Event): void => {
        var idElement = event.target as HTMLElement
        var id = idElement.getAttribute("id")
        var row, column
        // convert to row column
        if (id !== null ) {
            if( parseInt(id, 10) % 5 == 0 ){
                row = parseInt(id, 10) / 5
                column = 5
            } else {
                row = Math.floor( parseInt(id, 10) / 5 ) + 1
                column = parseInt(id, 10) % 5
            }
        //console.log( row + ' ' + column )
        this.canMove( row, column, parseInt(id,10))
        }
    }

    private canMove(row:number, column:number, id:number) : void  {

        var r = row;
        var c = column;
        var currentvalue = document.getElementById(`${id}`)?.innerText

        var c1, c2, c3, c4, t1, t2, t3, t4

        if ( r == 1 || r == 5 || c == 1 || c == 5) {
            // edge case
            if ( r == 1 && c == 1) { 
                c2 = id + 5             // dowm
                c4 = id + 1             // right
                t2 = document.getElementById(`${c2}`)?.innerText
                t4 = document.getElementById(`${c4}`)?.innerText
                t2 == '' ? this.move(id, c2) : 0
                t4 == '' ? this.move(id, c4) : 0
            } else 
            if ( r == 1 && c == 5) { 
                c2 = id + 5             // dowm
                c3 = id - 1             // left
                t2 = document.getElementById(`${c2}`)?.innerText
                t3 = document.getElementById(`${c3}`)?.innerText
                t2 == '' ? this.move(id, c2) : 0
                t3 == '' ? this.move(id, c3) : 0
            } else
            if ( r == 5 && c == 1) { 
                c1 = id - 5              // up
                c4 = id + 1             // right
                t1 = document.getElementById(`${c1}`)?.innerText
                t4 = document.getElementById(`${c4}`)?.innerText
                t1 == '' ? this.move(id, c1) : 0
                t4 == '' ? this.move(id, c4) : 0
            }
            if ( r == 5 && c == 5) { 
                c1 = id - 5              // up
                c3 = id - 1             // left
                t1 = document.getElementById(`${c1}`)?.innerText
                t3 = document.getElementById(`${c3}`)?.innerText
                t1 == '' ? this.move(id, c1) : 0
                t3 == '' ? this.move(id, c3) : 0
            }
        } 
        if( r == 1 && ( c == 2 || c == 3 || c == 4)){
            // row up
            c2 = id + 5             // dowm
            c3 = id - 1             // left
            c4 = id + 1             // right
            t2 = document.getElementById(`${c2}`)?.innerText
            t3 = document.getElementById(`${c3}`)?.innerText
            t4 = document.getElementById(`${c4}`)?.innerText
            t2 == '' ? this.move(id, c2) : 0
            t3 == '' ? this.move(id, c3) : 0
            t4 == '' ? this.move(id, c4) : 0

        } else if( r == 5 && ( c == 2 || c == 3 || c == 4)){
            // row down
            c1 = id - 5             // dowm
            c3 = id - 1             // left
            c4 = id + 1             // right
            t1 = document.getElementById(`${c1}`)?.innerText
            t3 = document.getElementById(`${c3}`)?.innerText
            t4 = document.getElementById(`${c4}`)?.innerText
            t1 == '' ? this.move(id, c1) : 0
            t3 == '' ? this.move(id, c3) : 0
            t4 == '' ? this.move(id, c4) : 0
        } else if( c == 1 && ( r == 2 || r == 3 || r == 4)){
            // col1
            c1 = id - 5              // up 
            c2 = id + 5             // dowm
            c4 = id + 1             // right
            t1 = document.getElementById(`${c1}`)?.innerText
            t2 = document.getElementById(`${c2}`)?.innerText
            t4 = document.getElementById(`${c4}`)?.innerText
            t1 == '' ? this.move(id, c1) : 0
            t2 == '' ? this.move(id, c2) : 0
            t4 == '' ? this.move(id, c4) : 0
        } else if( c == 5 && ( r == 2 || r == 3 || r == 4)){
            // col4
            c1 = id - 5              // up 
            c2 = id + 5             // dowm
            c3 = id - 1             // left
            t1 = document.getElementById(`${c1}`)?.innerText
            t2 = document.getElementById(`${c2}`)?.innerText
            t3 = document.getElementById(`${c3}`)?.innerText
            t1 == '' ? this.move(id, c1) : 0
            t2 == '' ? this.move(id, c2) : 0
            t3 == '' ? this.move(id, c3) : 0
        } else if( column == 2 || column == 3 || column == 4 ) {
            if( row == 2 || row == 3 || row == 4){

                c1 = id - 5              // up 
                c2 = id + 5             // dowm
                c3 = id - 1             // left
                c4 = id + 1             // right
                
                t1 = document.getElementById(`${c1}`)?.innerText
                t2 = document.getElementById(`${c2}`)?.innerText
                t3 = document.getElementById(`${c3}`)?.innerText
                t4 = document.getElementById(`${c4}`)?.innerText
               
                if( t1 == '' || t2 == '' || t3 == '' || t4 == '' ) {
                    t1 == '' ? this.move(id, c1) : 0
                    t2 == '' ? this.move(id, c2) : 0
                    t3 == '' ? this.move(id, c3) : 0
                    t4 == '' ? this.move(id, c4) : 0
                }

                }
            }
        }

        private move(oldCell:number, newCell:number) : void {

            const oldValue =  document.getElementById(`${oldCell}`)?.innerText
            document.getElementById(`${newCell}`)?.setAttribute('class', '')
            document.getElementById(`${oldCell}`)?.setAttribute('class', 'empty')
            let element = document.getElementById(`${newCell}`);
            if (element) {
                element.innerText = oldValue as string;
            }
            element = document.getElementById(`${oldCell}`);
            if (element) {
                element.innerText = '';
            }

            this.checkdone()
        }

        private checkdone() : void {

            let correct = 0;
            console.log( "correct: " + correct)

            for( let i = 1; i < 25; i++ ) {

                var element = document.getElementById(`${i}`)?.innerText
                if ( element ) {
                    console.log( "element: " + element + "i " + i.toString() + 'equal: ' + i.toString == element)
                    //console.log( "i: " + i)
                    if( element == i.toString() ) {correct++ }
                }

            }

            var bar
            /*   change to div with percentage...  */
            console.log( "correct: " + correct )
            if ( correct == 24 ){
                bar = document.getElementById("progressdiv");
                if( bar ){
                bar.setAttribute('class', 'winner')
                bar.innerText = "You won!"
                }
            } else {
                bar = document.getElementById("progressdiv");
                if( bar ){
                bar.setAttribute('class', 'progressdiv')
                bar.innerText = "Progress!"
            }
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {

    }

    public getOutputs(): IOutputs {
        const output: IOutputs = {
        };
        return output;
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}