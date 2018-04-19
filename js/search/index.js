/**
 * Created by david on 2/4/16.
 */
module.exports.allReady = false;
module.exports.showOptions = function showOptions()
{
    $('#searchOptions').toggle();
}
module.exports.searchSBA = function searchSBA()
{
    var searchObj = {
        term           : $('input[name="search"]').val(),
        strSearchType  : $('select[name="strSearchType"]').val(),
        strAllAnyExact : $('select[name="strAllAnyExact"]').val(),
        strDivision    : $('input[name="strDivision"]').val(),
        strCategory    : $('input[name="strCategory"]').val(),
        strStartDate   : $('input[name="strStartDate"]').val(),
        strEndDate     : $('input[name="strEndDate"]').val(),
        search_items   : $('select[name="search_items"]').val()
    }
    // validate the search term(keyword).
    if (searchObj.term.length == 0 || searchObj.term.trim().length == 0) {
        return false;
    }
    // otherwise send an ajax request to the search endpoint.
    $('.progress').show();
    $('.site-title, .members-title').hide();
    $('.pages, .news, .faqs, .events, .messaging, .digital_media, .call_to_action, .people, .events, .business, .individuals, .site-result, .members-result').empty();
    $.ajax({
        method: 'POST',
        url: '/ajax/search',
        data: {searchObj: searchObj},
        success: function(response, status, jqXHR) {
            $('.site-title').show();
            window.Cubic.search.parseCMSResults(response);
            if (window.Cubic.allReady) {
                $('.progress').hide();
                window.Cubic.allReady = false;
            } else { window.Cubic.allReady = true; }
        },
        error: function(jqXHR, status, error) {
            $('.site-result').html('<h4>No results found.</h4>');
            if (window.Cubic.allReady) {
                $('.progress').hide();
                window.Cubic.allReady = false;
            } else { window.Cubic.allReady = true; }
        },
        dataType: 'JSON'
    });
    // this will have success only if the user is logged in.
    $.ajax({
        method: 'POST',
        url: '/ajax/search-sba',
        data: searchObj,
        success: function(response, status, jqXHR) {
            $('.members-title').show();
            window.Cubic.search.parseSBAResults(response);
            if (window.Cubic.allReady) {
                $('.progress').hide();
                window.Cubic.allReady = false;
            } else { window.Cubic.allReady = true; }
        },
        error: function(jqXHR, status, error) {
            $('.members-title').show();
            $('.members-result').html('<h4>You need to be logged in to see this content.</h4>');
            if (window.Cubic.allReady) {
                $('.progress').hide();
                window.Cubic.allReady = false;
            } else { window.Cubic.allReady = true; }
        },
        dataType: 'JSON'
    });
}
module.exports.parseCMSResults = function parseCMSResults(response)
{
    var search_items = $('select[name="search_items"]').val();
    var term = $('input[name="search"]').val();

    if (Array.isArray(response.static_page) == false &&
        Array.isArray(response.news) == false &&
        Array.isArray(response.faqs) == false &&
        Array.isArray(response.messaging) == false &&
        Array.isArray(response.digital_media) == false &&
        Array.isArray(response.call_to_action) == false &&
        Array.isArray(response.people) == false
    ) {
        $('.site-result').html('<h4>No results found.</h4>');
        return false;
    }

    $.each(search_items, function(index, item){
        if (item == 'pages') {
            var realitem = 'static_page'
        } else {
            var realitem = item;
        }

        var result_title = item.replace(/_/g," ").toUpperCase();
        if (result_title == 'NEWS') result_title = 'BLOG';
        if (result_title == 'PEOPLE') result_title = 'OUR TEAM';
        var _container = $('<div>',{'class': 'col-md-12 col-sm-12 col-xs-12'}).append('<h4>' + result_title + '</h4>');
        if (Array.isArray(response[realitem])) {
            var _ul = $('<ul>');
            $.each(response[realitem], function (_index, data) {
                if (data.content != undefined && data.content != null) {
                    data.content = $('<div>').html(data.content).text();
                    data.content = data.content.substring(0, 200) + ' ...';
                    // wrap the keyword in bold
                    //var regterm = new RegExp("/" + term + "/g");
                    //data.content = data.content.replace(regterm, "<strong>" + term + "</strong>");
                } else { data.content = '';}
                if (item == 'pages') {
                    var a_container = $('<a>', {'href': '/pages'}).append('Pages');
                    var _a = $('<a>', {'href': '/pages/' + data.slug}).append(data.title);
                    var p = $('<li>', {'class': 'result-item'}).append(a_container).append(' &raquo; ').append(_a).append('<br />').append('<small><em>Published on: ' + window.Cubic.moment(data.publishDate).format('MM/DD/YYYY') + '</em></small>');
                    if (data.content.length > 0) {
                        var readmore = $('<a>', {'href': '/pages/' + data.slug}).append('<small>Read more &rarr;</small>');
                        p.append('<br /><div>' + data.content + '</div>').append(readmore);
                    }
                } else if (item == 'news') {
                    var a_container = $('<a>', {'href': '/blog'}).append('Blog');
                    var _a = $('<a>', {'href': '/blog/' + data.id}).append(data.title);
                    var p = $('<li>', {'class': 'result-item'}).append(a_container).append(' &raquo; ').append(_a).append('<br />').append('<small><em>Published on: ' + window.Cubic.moment(data.publishDate).format('MM/DD/YYYY') + '</em></small>');
                    if (data.content.length > 0) {
                        var readmore = $('<a>', {'href': '/blog/' + data.id}).append('<small>Read more &rarr;</small>');
                        p.append('<br /><div>' + data.content + readmore + '</div>');
                    }
                } else if (item == 'faq') {
                    var a_container = $('<a>', {'href': '/faq'}).append('FAQs');
                    var category = data.categories[0]['name'];
                    var _a = $('<a>', {'href': '/faq/' + category}).append(data.title);
                    var p = $('<li>', {'class': 'result-item'}).append(a_container).append(' &raquo; ').append(_a);
                    if (data.content.length > 0) {
                        var readmore = $('<a>', {'href': '/faq/' + category}).append('<small>Read more &rarr;</small>');
                        p.append('<br /><div>' + data.content + readmore + '</div>');
                    }
                } else if (item == 'messaging') {
                    var _a = $('<a>', {'href': '/messaging/' + data.slug}).append(data.title);
                    var p = $('<li>', {'class': 'result-item'}).append(_a);
                    if (data.content.length > 0) {
                        var readmore = $('<a>', {'href': '/messaging/' + data.slug}).append('<small>Read more &rarr;</small>');
                        p.append('<br /><div>' + data.content + readmore + '</div>');
                    }
                } else if (item == 'digital_media') {
                    var _a = $('<a>', {'href': '/digital_media/' + data.slug}).append(data.title);
                    var p = $('<li>', {'class': 'result-item'}).append(_a);
                    if (data.content.length > 0) {
                         var readmore = $('<a>', {'href': '/digital_media/' + data.slug}).append('<small>Read more &rarr;</small>');
                        p.append('<br /><div>' + data.content + readmore + '</div>');
                    }
                } else if (item == 'call_to_action') {
                    var _a = $('<a>', {'href': '/call_to_action/' + data.slug}).append(data.title);
                    var p = $('<li>', {'class': 'result-item'}).append(_a);
                    if (data.content.length > 0) {
                        var readmore = $('<a>', {'href': '/call_to_action/' + data.slug}).append('<small>Read more &rarr;</small>');
                        p.append('<br /><div>' + data.content + readmore + '</div>');
                    }
                }
                if (p != undefined) {
                    _ul.append(p);
                }
                // for our team only
                if (item == 'people') {
                    if (data.displayProfile) {
                        var _a = $('<a>', {'href': '/people/' + data.slug}).append(data.firstName + ' ' + data.lastName);
                        var p = $('<li>', {'class': 'result-item'}).append(_a);
                    }
                    if (p != undefined) {
                        _ul.append(p);
                    }
                }
            });
            _container.append(_ul);
            $('.' + item).append(_container);
        } // end of if resultset is array.
    });
}
module.exports.parseSBAResults = function parseSBAResults(response)
{
    // events
    if (Array.isArray(response.events)) {
        var _container = $('<div>',{'class': 'col-md-12 col-sm-12 col-xs-12'}).append('<h4>EVENTS</h4>');
        var _ul = $('<ul>');
        $.each(response.events, function(index, event){
            var a_container = $('<a>', {'href': '/events'}).append('Events');
            var _a = $('<a>', {'href': '/events/' + event.id}).append(event.name);
            var li = $('<li>', {'class': 'result-item'})
                .append(a_container)
                .append(' &raquo; ')
                .append(_a)
                .append('<br />')
                .append('<small><em>' + window.Cubic.moment(event.startdate).format('MM/DD/YYYY') + ' &mdash; ' + window.Cubic.moment(event.enddate).format('MM/DD/YYYY') + '</em></small>')
                .append('<br />')
                .append('<small><em>Location: ' + event.location + '</em></small>')
                .append('<br />')
                .append('<small><em>Capacity: ' + event.capacity + '</em></small>');
            _ul.append(li);
        });
        _container.append(_ul);
        $('.events').append(_container);
    }
    // business
    if (Array.isArray(response.business)) {
        var _container = $('<div>',{'class': 'col-md-12 col-sm-12 col-xs-12'}).append('<h4>BUSINESSES</h4>');
        var _ul = $('<ul>');
        $.each(response.business, function(index, business){
            var li = $('<li>', {'class': 'result-item'})
                .append(business.name)
                .append('<br />')
                .append('<small>' + business.busdescript + '</small>')
                .append('<br />')
                .append('<small><em>Member since: ' + window.Cubic.moment(business.joined).format('MM/DD/YYYY') + '</em></small>')
                .append('<br />')
                .append('<small>Main Representative: ' + business.main_rep + '</small>')
                .append('<br />')
                .append('<small>Phone: ' + business.phone + ', Email: <a href="mailto:' + business.email + '" target="_blank">' + business.email + '</a></small>')
                .append('<br />')
                .append('<small><a href="http://' + business.url + '" target="_blank">' + business.url + '</a></small>')
                .append('<br />')
                .append('<small>' + business.address1 + ' ' + business.address2 + ', ' + business.city + ', ' + business.state + ', ' + business.zip + '</small>');
            _ul.append(li);
        });
        _container.append(_ul);
        $('.business').append(_container);
    }
    // individuals.
    if (Array.isArray(response.individuals)) {
        var _container = $('<div>',{'class': 'col-md-12 col-sm-12 col-xs-12'}).append('<h4>MEMBERS</h4>');
        var _ul = $('<ul>');
        $.each(response.individuals, function(index, individual){
            var li = $('<li>', {'class': 'result-item'})
                .append(individual.firstname + ' ' + individual.lastname)
                .append('<br />')
                .append('<small>' + individual.title + '</small>')
                .append('<br />')
                .append('<small>Phone: ' + individual.phone + ', Email: <a href="mailto:' + individual.email + '" target="_blank">' + individual.email + '</a></small>')
                .append('<br />')
                .append('<small>' + individual.address1 + ' ' + individual.address2 + ', ' + individual.city + ', ' + individual.state + ', ' + individual.zip + '</small>');
            _ul.append(li);
        });
        _container.append(_ul);
        $('.individuals').append(_container);
    }
}