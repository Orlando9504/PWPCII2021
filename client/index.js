console.log("Webpack esta trabajando!!");
//Default parameters ES6/2015
let show =(m="hola") => {
    alert(m)
};

show();

function resolveafter25seconds(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('resolved')
        },2000);
    });
}

async function asyncCall(){
    console.log("Calling an async function");
    const result = await resolveafter25seconds();
    console.log(result);
}

asyncCall();