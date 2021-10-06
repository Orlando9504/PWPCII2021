const path=require('path');
module.exports={
    // 1.-Establecer el modo
    mode:'development',
    // 2.-Archivo de entrada
    entry:'./client/index.js',
    //3.-Especificando la saldia
    output:{
        //4.-Ruta absoluta de salida
        path:path.join(__dirname,'public'),
        //5.-Nombre del archivo de salida
        filename:'js/bundle.js',
        //6.-Ruta del path publico
        publicPath:'/'
    },
    devServer:{
        static:path.join(__dirname,'public'),
        port:8080,
        host:'localhost'
    }
}