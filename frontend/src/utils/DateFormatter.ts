export function formatDate(date: Date): string {
    
    let year = '' + date.getFullYear();
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let hour = '' + date.getHours();
    let minute = '' + date.getMinutes();
    let second = '' + date.getSeconds();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;
    if (second.length < 2) second = '0' + second;
    
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(":");    
}