// https://stackoverflow.com/questions/9575790/how-to-get-time-in-milliseconds-since-the-unix-epoch-in-javascript#9575869
// https://stackoverflow.com/questions/10470825/how-to-make-javascript-time-automatically-update

function updateTime(){
    let time_epoch = Math.floor((new Date).getTime() / 1000);
    let time_epoch_str = time_epoch;
    document.getElementById('time-epoch').innerHTML = time_epoch_str;

    let time_us = (new Date(Date.now())).toLocaleTimeString('en-US');
    let time_us_str = time_us;
    document.getElementById('time-us').innerHTML = time_us_str;
}
setInterval(updateTime, 1000);
