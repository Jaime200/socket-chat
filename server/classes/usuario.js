
class Usuarios {


    constructor (){
        this.personas= []  
    }

    agregarPersona(id, Nombre, sala){
        
        let Persona = { id, Nombre, sala }
        
        this.personas.push(Persona);
        

        return this.personas;
    }

    getPersona(id ){
        let Persona = this.personas.filter(persona=> persona.id ===id)[0]

        return Persona        
    }

    getPersonas(){

        return this.personas
    }

    getPersonasPorSala(sala ){
       let personasEnSala = this.personas.filter(persona =>{
           return persona.sala ===sala;
       });

       return personasEnSala;
    }

    borrarPersona( id ){
        
        let PersonaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona=>  persona.id !=id  )

        return PersonaBorrada
    }
}

module.exports = {
    Usuarios
}
