/**
 * Created by david on 4/25/16.
 */
module.exports.formatPhone = formatPhone
module.exports.formatZip = formatZip

function formatPhone(phone)
{
    if (isNaN(phone)) {
        return phone;
    }
    var number = phone.split("");
    var newPhone = "";
    if (number.length >= 4) {
        newPhone = "-" + number.splice((number.length - 4),4).join("");
    } else { return phone;}
    if(number.length >= 3) {
        newPhone = number.splice((number.length - 3),3).join("") + newPhone;
    } else {return number.join("") + newPhone ;}

    return "(" + number.join("") + ") " + newPhone;
}
function formatZip(zip)
{
    if (isNaN(zip)) {
        return zip;
    }
    var number = zip.split("");
    var newZip = "";
    if (number.length >= 5) {
        newZip = number.splice(0,5).join("");
    } else { return zip;}
    if (number.length > 0) {
        newZip = newZip + "-" +number.join("");
    }
    return newZip;
}