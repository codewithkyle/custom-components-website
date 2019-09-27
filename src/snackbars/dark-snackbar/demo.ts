var demo1 = document.body.querySelector('.js-demo-1');
demo1.addEventListener('click', (e)=>{
    notificationManager.notify({
        message: 'This is a demo notification',
    });
});

var demo2 = document.body.querySelector('.js-demo-2');
demo2.addEventListener('click', (e)=>{
    notificationManager.notify({
        message: 'This is a closeable notification',
        closeable: true,
        duration: Infinity,
    });
});

class Button3
{
    private variable : string;
    private demo3 : HTMLButtonElement;
    
    constructor()
    {
        this.variable = 'Hello world!';
        this.demo3 = document.body.querySelector('.js-demo-3');
        this.demo3.addEventListener('click', (e)=>{
            notificationManager.notify({
                message: 'This notification has a callback',
                closeable: true,
                duration: Infinity,
                buttons: [
                    {
                        label: 'alert',
                        callback: this.alertUser.bind(this),
                    },
                    {
                        label: 'reload',
                        callback: this.reloadPage,
                    }
                ]
            });
        });
    }

    reloadPage()
    {
        window.location.reload();
    }

    alertUser()
    {
        window.alert(this.variable)
    }
}
new Button3();