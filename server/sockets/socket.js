const { io } = require('../server');
const {Usuarios} = require('../classes/usuario')
const { crearMensaje } = require('../utils/utilis')


const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat',(Usuario, callback)=>{
        
        //console.log('Usuario entrando' , Usuario)

        if(!Usuario.nombre ){
            callback({
                error: true,
                mensaje:"El nombre es necesario"
            })
        }

        if(!Usuario.sala ){
            callback({
                error: true,
                mensaje:"La sala es necesario"
            })
        }

        client.join(Usuario.sala);
        let personas = usuarios.agregarPersona(client.id,Usuario.nombre, Usuario.sala )

        client.broadcast.to(Usuario.sala)
                        .emit('ListaPersona',usuarios.getPersonasPorSala(Usuario.sala));

        callback(usuarios.getPersonasPorSala(Usuario.sala))
    });

    client.on('crearMensaje', (data) =>{
        let persona = usuarios.getPersona(client.id)
        
        let mensaje = crearMensaje(persona.Nombre, data.mensaje);

        client.to(persona.sala).broadcast.emit('crearMensaje', mensaje);
    })

    client.on('disconnect', ()=>{
        let PersonaBorrada = usuarios.borrarPersona(client.id)
        client.broadcast.to(PersonaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${PersonaBorrada.Nombre} abandono el chat`))
        // { usuario : 'Administrador', mensaje:`${PersonaBorrada.Nombre} abandono el chat`})        
        client.broadcast.to(PersonaBorrada.sala).emit('ListaPersona',usuarios.getPersonasPorSala(PersonaBorrada.sala));        
    })

    //Mensajes privados
    client.on('mensajePrivado', (data) =>{        
        console.log(data)
        let persona = usuarios.getPersona(client.id)
        client.to(data.para)
        .emit('mensajePrivado', crearMensaje(persona.Nombre,data.mensaje))
    })
});