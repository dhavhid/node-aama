/**
 * Created by david on 4/25/16.
 */
module.exports.getLabs = getLabs
module.exports.displayLabs = displayLabs
module.exports.toggleLoadBar = toggleLoadBar
module.exports.searchLabs = searchLabs
module.exports.searchKeyUp = searchKeyUp
module.exports.getLabStandards = getLabStandards
module.exports.displayLabStandards = displayLabStandards

function getLabs()
{
    var state = $('#basedon').val();
    var keyword = $('#keyword').val().trim();
    var params = {
        state: state,
        keyword: keyword
    }
    toggleLoadBar();
    $.post('/ajax/accredited-labs', params, function(response){
        displayLabs(response);
    });
}

function displayLabs(data)
{
    if (!Array.isArray(data) || data.length == 0) {
        var table = $('<div>', {'class': 'col-lg-12'}).append('No Accredited Labs found.');
    } else {
        var table = $('<table>', {'class': 'table table-striped'});
        var header = $('<thead>').append('<th>AAMA Accredited Lab</th><th>Contact</th><th>Accredited Testing Standards</th>');
        var tbody = $('<tbody>');
        table.append(header);
        _.forEach(data, function(lab, index){
            var tr = $('<tr>');
            // append lab name, address and website.
            var acclab = $('<td>');
            acclab.append('<strong>' + lab.name + '</strong>').append('<br />' + lab.address1).append('<br />');
            if (lab.address2.trim().length > 0) acclab.append(lab.address2).append('<br />');
            acclab.append(lab.city).append(', ').append(lab.state).append(', ').append(window.Cubic.helpers.formatZip(lab.zip)).append('<br />');
            if (lab.website.trim().length > 0) acclab.append('<a href="http://' + lab.website + '" target="_blank">' + lab.website + '</a>');
            // append contact
            var contact = $('<td>');
            contact.append('<strong>' + lab.fname + '</strong>').append(' ').append('<strong>' + lab.lname + '</strong>').append('<br />');
            contact.append(window.Cubic.helpers.formatPhone(lab.phone)).append('<br />');
            if (lab.email.trim().length > 0) contact.append('<a href="mailto:' + lab.email + '">' + lab.email + '</a>');

            var standards = $('<td>').append('<a href="javascript:window.Cubic.labs.getLabStandards(\'' + lab.pclo_id + '\', \'ref' + index + '\');" id="ref' + index + '">View All Accredited Testing Standards</a>');

            tr.append(acclab).append(contact).append(standards);
            tbody.append(tr);
        });
        table.append(tbody);
    }
    $('#business-container').empty().append(table);
    $('#basedon, #keyword').removeAttr('disabled');
}

function searchLabs(keyword, e)
{
    keyword = keyword.trim().toLowerCase();
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        getLabs();
    }
}
function searchKeyUp(keyword, e)
{
    keyword = keyword.trim().toLowerCase();
    if (keyword.length == 0) {
        getLabs();
    }
}

function toggleLoadBar()
{
    $('html, body').animate({
        scrollTop: $(".help-block").offset().top
    }, 800, 'swing', function() {
        $('#business-container').empty().append('<div class="text-center"><i class="fa fa-2x fa-spinner fa-pulse"></i> <h4>Loading accredited labs</h4></div>');
    });
}

function getLabStandards(pclo_id, ref)
{
    if ($('#' + ref).html() == 'Hide All Accredited Testing Standards') {
        $('#table_' + ref).hide();
        $('#' + ref).html('View All Accredited Testing Standards');
    } else if($('#' + ref).html() == 'View All Accredited Testing Standards' && document.getElementById('table_' + ref) != undefined) {
        $('#table_' + ref).show();
        $('#' + ref).html('Hide All Accredited Testing Standards');
    } else {
        $('#' + ref).parent().append('<div class="text-center"><i class="fa fa-spinner fa-pulse"></i> <p>Loading lab standards</p></div>');
        $.get('/ajax/get-lab-standards/' + pclo_id, {}, function(response){
            displayLabStandards(response, ref);
        });
    }
}

function displayLabStandards(data, ref)
{
    if (!Array.isArray(data) || data.length == 0) {
        var table = $('<div>', {'id': 'table_' + ref}).append('No Lab Standards found.');
    } else {
        var table = $('<table>', {'id': 'table_' + ref});
        var thead = $('<thead>');
        var tbody = $('<tbody>');
        _.forEach(data, function(standard, index){
            var tr = $('<tr>');
            tr.append('<td>' + standard.descript + '</td>').append('<td>' + standard.cert_type + '</td>');
            tbody.append(tr);
        });
        table.append(thead).append(tbody);
    }
    $('#' + ref).parent().find('div.text-center').remove();
    $('#' + ref).html('Hide All Accredited Testing Standards');
    $('#' + ref).parent().append(table);
}