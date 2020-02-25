import $ from 'jquery'
export default class Preloader{

    private static instance:Preloader = null;
    private PRELOADER_ID = 'preloader'
    private preloader: JQuery<HTMLElement>
    
    private constructor() {
        const element = $(`<div id=${this.PRELOADER_ID}></div>`)
        this.preloader = element;
        $(document.body).append(element)
     }

    public static getInstance():Preloader{
        if(this.instance ===null){
            this.instance = new Preloader();
        }
        return this.instance
    }

    public show(){
        this.preloader.addClass('active')
    }

    public hide(){  
        this.preloader.removeClass('active')
    }
}