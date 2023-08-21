export class Horarios {
    horarios = {
        lunes: "00:00 AM - 00:00 PM",
        martes: "00:00 AM - 00:00 PM",
        miercoles: "00:00 AM - 00:00 PM",
        jueves: "00:00 AM - 00:00 PM",
        viernes: "00:00 AM - 00:00 PM",
        sabado: "00:00 AM - 00:00 PM",
        domingo: "00:00 AM - 00:00 PM",
    }
    getHorarios = function () {
        return this.horarios
    }
}
