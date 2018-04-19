/**
 * Created by david on 2/17/16.
 */
module.exports.displayBusinesses = displayBusinesses
module.exports.onChangeKwyType = onChangeKwyType
module.exports.getBusinesses = getBusinesses
module.exports.searchBusiness = searchBusiness
module.exports.searchKeyUp = searchKeyUp
module.exports.setPagination = setPagination
module.exports.setPagesInfo = setPagesInfo
module.exports.toggleLoadBar = toggleLoadBar
module.exports.ajaxRequest = 0

function displayBusinesses(data)
{
    var container = $('#business-container');
    container.empty().removeClass('text-center');
    $.each(data, function(index, business){
        if (business.custom17 != 'PT') {
            var title = $('<h2>').append('<a href="/members/business/' + business.id + '">' + business.name + '</a>');
        } else {
            var title = $('<h2>').append('<a href="/members/business/' + business.id + '">' + business.name + ' &mdash; ' + business.MainRep + '</a>');
        }
        var busDate = $('<div>').append('<small>Member since ' + window.Cubic.moment(business.joined).format('MMM DD, YYYY') + '</small>');
        var busLocation = $('<div>').append('<em>' + business.mail_city + ', ' + business.mail_state + '</em>');
        var descript = $('<p>').html(business.busdescript).text();
        descript = descript.substr(0, 200);
        var busEntry = $('<div>', {'class': 'content-box'}).append(title).append(descript).append(busLocation).append(busDate);
        var business_container = $('<div>', {'class': 'col-sm-6 col-xs-6 col-xxs-12 item'}).append(busEntry);
        container.append(business_container);
    });
    if (Array.isArray(data) == false || data.length == 0) {
        container.append('<h3>No members found.</h3>');
        window.Cubic.committee.ajaxRequest = 0;
    }
    $('input[name="keyword"], select[name="basedon"]').attr('disabled', false);
}
function onChangeKwyType() {
    if ($('select[name="basedon"]').val().trim() == 'All') {
        $('input[name="keyword"]').val("");
        getBusinesses(1);
    }
}
function getBusinesses(page)
{
    var kwyType = $('select[name="basedon"]').val().trim();
    var kwy =  $('input[name="keyword"]').val().trim().toLowerCase();

    if (kwyType == 'NEW' || kwyType == "-1") return false;
    if ($('select[name="basedon"]').val().trim() == 'All') {
        kwyType = 'keyword';
        kwy = 'All';
    }

    // otherwise ask for data to the SBA API.
    if (page == undefined) { page = 1; }
    if (window.Cubic.committee.ajaxRequest == 0) {
        toggleLoadBar();
        window.Cubic.committee.ajaxRequest = 1;
        $.ajax({
            type: 'POST',
            url: '/ajax/get-businesses',
            data: {page: page, strKeywords: kwy, basedon: kwyType},
            success: function (data, textStatus, jqXHR) {
                //window.Cubic.ls('businesses',{data: data, exp: window.Cubic.moment().add(7, 'days')});
                if (data.data == null || data.length == 0) {
                    data = {
                        data: []
                    }
                }
                displayBusinesses(data.data);
                setPagination(data.pagination, page);
                setPagesInfo(data.pagination, data.data);
                var $masonry = new window.Cubic.Masonry('#business-container', {
                    columnWidth: '.item',
                    itemSelector: '.item'
                });
                window.Cubic.committee.ajaxRequest = 0;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                displayBusinesses([]);
            },
            dataType: 'JSON'
        });
    }
}

function searchBusiness(keyword, e)
{
    keyword = keyword.trim().toLowerCase();
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        getBusinesses(1);
    }
}
function searchKeyUp(keyword, e)
{
    keyword = keyword.trim().toLowerCase();
    if (keyword.length == 0) {
        getBusinesses(1);
    }
}
function setPagination(pagination, currentPage)
{
    var container = $('.pages');
    container.empty();
    if (pagination != undefined) {
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
            }).on("page", function (event, num) {
                getBusinesses(num);
            });
        }
    }
}
function setPagesInfo(pagination,data)
{
    var container = $('.pages-info');
    container.empty();
    if (pagination != undefined) {
        if (parseInt(pagination.NumRecordsFound) > 0) {
            var from = ((parseInt(pagination.PageNum) - 1) * 15) + 1;
            var to = ((parseInt(pagination.PageNum) - 1) * 15) + data.length;
            container.append('Showing results ' + from + ' to ' + to + ' of ' + pagination.NumRecordsFound);
        }
    }
}
function toggleLoadBar()
{
    $('html, body').animate({
        scrollTop: $(".help-block").offset().top
    }, 800, 'swing', function() {
        $('#business-container').empty().append('<div class="text-center"><i class="fa fa-2x fa-spinner fa-pulse"></i> <h4>Loading directory</h4></div>');
        $('.pages, .pages-info').empty();
    });
}