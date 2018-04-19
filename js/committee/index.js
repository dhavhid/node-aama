/**
 * Created by david on 1/7/16.
 */
module.exports.getAllCommittees = getAllCommittees
module.exports.getCommitteesByHierarchy = getCommitteesByHierarchy
module.exports.buildCommitteeBox = buildCommitteeBox
module.exports.setPagination = setPagination
module.exports.toggleLoadBar = toggleLoadBar
module.exports.ajaxRequest = 0

exports.showCommittee = function showCommittee(id,comCode)
{
    $('#meetings').addClass('text-center').prepend('<div class="content-loader"><i class="fa fa-2x fa-spinner fa-pulse"></i> <h4>Loading meetings</h4></div>');
    $('div.divMeeting').hide();

    $('div.overview-content').hide();
    $('#' + id).fadeIn();
    $('.all-committees a').removeClass('active');
    $('a#com' + id).addClass('active');
    // get the meetings and members if not already added.
    comCode = comCode.trim();
    var divCurrentMeeting = document.getElementById(comCode);

    if (divCurrentMeeting != null) {
        $('#meetings').removeClass('text-center');
        divCurrentMeeting = $(divCurrentMeeting);
        divCurrentMeeting.fadeIn();
        $('.content-loader').remove();
    } else {
        $.ajax({
            type: 'GET',
            url: '/ajax/get-committee-meetings/' + comCode,
            success: function(data, textStatus, jqXHR) {
                buildMeetingsTable(data, comCode);
            },
            error: function(jqXHR, textStatus, errorThrown) {},
            dataType: 'JSON'
        });
    }
    // show up the members of the committee.
    $('.ulMembers').hide();
    $('#mbm' + comCode).fadeIn();
}
exports.showCurrentMeetings = function showCurrentMeetings()
{
    $('.divMeeting').hide();
    $('#meetings').addClass('text-center').prepend('<div class="content-loader"><i class="fa fa-2x fa-spinner fa-pulse"></i> <h4>Loading meetings</h4></div>');
    $('.all-committees a:first-child').addClass('active');
    var comCode = $('.all-committees a:first-child').attr('code');
    if (comCode == undefined) {return false;}
    comCode = comCode.trim();
    $.ajax({
        type: 'GET',
        url: '/ajax/get-committee-meetings/' + comCode,
        success: function(data, textStatus, jqXHR) {
            loadCommitteeMembers();
            buildMeetingsTable(data, comCode);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var divList = $('<div>',{'class':'divMeeting','id':comCode,'style':'display: none;'}).append('The meetings could not be loaded at this time. Please try again later.');
            $('#meetings').removeClass('text-center').append(divList);
            $('div#' + comCode).fadeIn();
            $('.content-loader').remove();
        },
        dataType: 'JSON'
    });
}
exports.showCommitteeMembers = function showCommitteeMembers()
{
    var activeCommittee = $('.all-committees a.active').attr('code').trim();
    $('.ulMembers').hide();
    $('#' + activeCommittee).fadeIn();
}
exports.addToCommittee = function addToCommittee(obj)
{
    var objEmitter = $(obj);
    objEmitter.html('<i class="fa fa-spinner fa-pulse"></i> Please wait ...').prop('disabled',true);
    var activeCommittee = $('input[name="committeecode"]').val();
    $.ajax({
        type: 'POST',
        url: '/ajax/add-to-committee',
        data: {strComCode: activeCommittee},
        success: function (data, textStatus, jqXHR) {
            if (data.response.AddIndividualToCommitteeResult == 'true') {
                $('button[name="btnjoin"]').remove();
                $('.text-right').append('<button name="btnleave" class="btn btn-primary" onclick="window.Cubic.committee.dropToCommittee(this);">Leave Committee</button>').append('<button name="btnbevoter" class="btn btn-primary" onclick="window.Cubic.committee.updateVoter(this, 1);">Become a voter member</button>');
            } else {
                $('.error').append('<div style="width:100%;" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> You could not join the committee at this time. Please try again later.</div>');
                objEmitter.html('Join Committee').prop('disabled',false);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('.error').append('<div style="width:100%;" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> You could not join the committee at this time. Please try again later.</div>');
            objEmitter.html('Join Committee').prop('disabled',false);
        },
        dataType: 'JSON'
    });
}
exports.dropToCommittee = function dropToCommittee(obj)
{
    var objEmitter = $(obj);
    objEmitter.html('<i class="fa fa-spinner fa-pulse"></i> Please wait ...').prop('disabled',true);
    var activeCommittee = $('input[name="committeecode"]').val();
    $.ajax({
        type: 'POST',
        url: '/ajax/drop-to-committee',
        data: {strComCode: activeCommittee},
        success: function (data, textStatus, jqXHR) {
            if (data.response.DropIndividualCommitteeResult == 'true') {
                $('button[name="btnleave"], button[name="btnleavevoter"], button[name="btnbevoter"]').remove();
                $('.text-right').append('<button name="btnjoin" class="btn btn-primary" onclick="window.Cubic.committee.addToCommittee(this)">Join Committee</button>');
            } else {
                $('.error').empty().append('<div style="width:100%;" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> You could not join the committee at this time. Please try again later.</div>');
                objEmitter.html('Leave Committee').prop('disabled',false);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('.error').empty().append('<div style="width:100%;" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Error!</strong> You could not join the committee at this time. Please try again later.</div>');
            objEmitter.html('Leave Committee').prop('disabled',false);
        },
        dataType: 'JSON'
    });
}
exports.updateVoter = function updateVoter(obj, action)
{
    var voter = 'false';
    var custom10 = 'Y';
    if (parseInt(action) == 1) {
        voter = 'true';
        custom10 = 'N';
    }
    var objEmitter = $(obj);
    var currentContent = objEmitter.html();
    objEmitter.html('<i class="fa fa-spinner fa-pulse"></i> Please wait ...').prop('disabled',true);
    $.ajax({
        type: 'POST',
        url: '/ajax/update-voter-status',
        data: {intMcom_Id: $('input[name="intMcom_Id"]').val(), Custom10_YorN: custom10, Vote_TorF: voter},
        success: function(data, textStatus, jqXHR) {
            $('button[name="btnleavevoter"], button[name="btnbevoter"]').remove();
            if (data) {
                if (voter == 'false') {
                    $('.text-right').append('<button name="btnbevoter" class="btn btn-primary" onclick="window.Cubic.committee.updateVoter(this, 1);">Become a voter member</button>');
                } else {
                    $('.text-right').append('<button name="btnleavevoter" class="btn btn-primary" onclick="window.Cubic.committee.updateVoter(this, 0);">Quit voting status</button>');
                }
            } else {
                objEmitter.html(currentContent).prop('disabled',false);
            }
        },
        error: function(jqHHR, textStatus, errorThrown){
            objEmitter.html(currentContent).prop('disabled',false);
        },
        dataType: 'JSON'
    });
}
function buildMeetingsTable(data, comCode)
{
    data = data.meetings;
    var list = $('<table>',{'class':'table table-striped committees'});
    $.each(data,function(index,item){
        var li = $('<tr>');
        var meetingDate = window.Cubic.moment(item.Record[8].meetdate);
        li.append('<td><strong>' + item.Record[5].descript + '</strong><br />' + item.Record[9].meetpl + '<br />' + meetingDate.format('MMM Do, YYYY') + '<br />Total Attendace: ' + item.Record[13].totl_att + '</td>');
        list.append(li);
    });
    var divList = $('<div>',{'class':'divMeeting','id':comCode,'style':'display: none;'}).append(list);
    $('#meetings').removeClass('text-center').append(divList);
    $('div#' + comCode).fadeIn();
    $('.content-loader').remove();
}
function loadCommitteeMembers()
{
    var activeCommittee = $('.all-committees a.active').attr('code').trim();
    $.ajax({
        type: 'GET',
        url: '/ajax/get-committee-members',
        success: function(data, textStatus, jqXHR) {
            var committees = data.committees;
            $.each(committees, function(index,committe){
                var divCommittee = $('<table>',{'id':'mbm' + committe.code, 'class':'ulMembers table table-striped','style':'display: none;'});
                $.each(committe.members, function(i, member){
                    divCommittee.append($('<tr>').append('<td><strong>' + member[11].fname + ' ' + member[12].lname + ' ' + member[13].annotation + '</strong><br />' + member[15].title + '<br />' + member[16].companyname + '</td>'));
                });
                $('#members').append(divCommittee);
            });
            $('.content-members-loader').remove();
            $('#members').removeClass('text-center');
            $('#mbm' + activeCommittee).fadeIn();
        },
        error: function(jqXHR, textStatus, errorThrown) {},
        dataType: 'JSON'
    });
}

function getAllCommittees(page)
{
    if (window.Cubic.committee.ajaxRequest == 0) {
        toggleLoadBar();
        window.Cubic.committee.ajaxRequest = 1;
        $.ajax({
            type: 'GET',
            url: '/ajax/committees/' + page,
            success: function(data, textStatus, jqXHR) {
                setPagination(data.pagination, page);
                var main_container = $('<div>');
                $.each(data.data, function(index, committee){
                    main_container.append(buildCommitteeBox(committee));
                });
                $('#all-committees').animate({scrollTop : 0},800).empty().append(main_container);
                var $masonry = new window.Cubic.Masonry('#all-committees', {
                    columnWidth  : '.item',
                    itemSelector : '.item'
                });
                $('#label-all-committees').empty().append('All Committees (' + data.pagination.NumRecordsFound + ')');
                window.Cubic.committee.ajaxRequest = 0;
            }
        });
    }
}
function getCommitteesByHierarchy(type,container,parent)
{
    var query = "";
    if (parent != undefined) {
        query = "?parent=" + encodeURI(parent);
    }
    $.ajax({
        type: 'GET',
        url: '/committees/hierarchy/' + type + query,
        success: function(data, textStatus, jqXHR) {
            var main_container = $('<div>');
            if (data.data == undefined) {
                return false;
            }
            $.each(data.data, function(index, committee){
                main_container.append(buildCommitteeBox(committee));
            });
            $('#' + container).animate({scrollTop : 0},800).empty().append(main_container);
            var $masonry = new window.Cubic.Masonry('#' + container, {
                columnWidth  : '.item',
                itemSelector : '.item'
            });
        }
    });
}
function buildCommitteeBox(committee)
{
    if (committee.name != null) {
        var container = $('<div>', {'class': 'col-sm-6 col-xs-6 col-xxs-12 item'});
        var box = $('<div>',{'class': 'content-box'});
        var title = $('<h4>').append('<a href="/committees/' + committee.comcode + '">' + committee.name + '</a>');
        container.append(box);
        box.append(title);
        box.append('<p>' + committee.custom11.substr(0,90) + '...</p>');
        if (committee.custom01.length > 0) {
            box.append('<span><p>' + committee.custom01 + '</p></span>');
        }
        if (window.Cubic.moment(committee.comm_strt).isAfter('1899-12-30','year')) {
            box.append('<p><small>Date stablished <strong>' + window.Cubic.moment(committee.comm_strt).format("MMM DD, YYYY") + '</strong></small></p>');
        }
        return container;
    }
}
function setPagination(pagination, currentPage)
{
    var container = $('.pages');
    container.empty();
    if (parseInt(pagination.TotalPages) > 1) {
        $('.pages').bootpag({
            total: parseInt(pagination.TotalPages),
            page: parseInt(currentPage),
            maxVisible: 5,
            leaps: false,
            firstLastUse: true,
            first: '<i class="fa fa-angle-double-left"></i>',
            last: '<i class="fa fa-angle-double-right"></i>',
            next: '<i class="fa fa-angle-right"></i>',
            prev: '<i class="fa fa-angle-left"></i>',
            wrapClass: 'pagination pagination-sm',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        }).on("page", function(event, num){
            getAllCommittees(num);
        });
    }
}
function toggleLoadBar()
{
    $('html, body').animate({
        scrollTop: $(".nav-tabs").offset().top
    }, 800, 'swing', function() {
        $('#all-committees').empty().append('<div class="text-center"><i class="fa fa-2x fa-spinner fa-pulse"></i> <h4>Loading committees</h4></div>');
        $('.pages').empty();
    });
}