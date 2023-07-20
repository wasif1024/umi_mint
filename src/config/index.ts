
process.env.NODE_ENV = process.env.NODE_ENV || 'DEVELOPMENT';
export default {

    port: parseInt(process.env.PORT, 10) || 8080,
    host: /*process.env.HOST ||*/ 'localhost',

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },


    api: {
        prefix: '/api',
    },


    ASSIGNHEROTOTERRITORYLIMIT: process.env.ASSIGNHEROTOTERRITORYLIMIT || 3,

    timeLeft: process.env.TIMELEFT || 5,

    maxSlot: process.env.MAXSLOT || 5
};