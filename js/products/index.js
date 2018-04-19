/**
 * Created by david on 2/23/16.
 */
module.exports.getManufacturer = getManufacturer
module.exports.displayManufacturer = displayManufacturer
module.exports.toggleLoadBar = toggleLoadBar
module.exports.getFilterCatalogs = getFilterCatalogs
module.exports.setProductFilters = setProductFilters
module.exports.addFilterOption = addFilterOption
module.exports.searchProducts = searchProducts
module.exports.filters = {
    manufacturers: {val: 'id', text: 'disp_name', name: 'strManuFact'},
    prodtype: {val: 'prodt_type', text: 'prodt_type', name: 'strProdType'},
    perfclass: {val: 'perfclass', text: 'perfclass', name: 'strPerfClass'},
    perfgrade: {val: 'perfgrade', text: 'perfgrade', name: 'strPerfGrade'},
    framemat: {val: 'value', text: 'descript', name: 'strFrameMat'}
}

function getManufacturer(e, id)
{
    if (id == null || id == undefined) {
        // get the selected manufacturer in the dropdown.
        id = $('#strManuFact').val();
        if (isNaN(id) || id == "-1") { return false; }
    } else {
        $('#strManuFact').val(id);
    }
    searchProducts(e, 1);
}
function displayManufacturer(data)
{
    var testSpecifications = {
        'A' : 'AAMA/NWWDA 101/I.S.2-97',
        'B': 'ANSI/AAMA/WDMA 101/I.S.2/NAFS-02',
        'C': 'AAMA/WDMA/CSA 101/I.S.2/A440-05',
        'D': 'AAMA/WDMA/CSA 101/I.S.2/A440-08',
        'E': 'AAMA/WDMA/CSA 101/I.S.2/A440-11',
        'F': 'AAMA 1701.2-12',
        'G': 'AAMA 1702.2-12',
        'H': 'AAMA 450',
        'I': 'AAMA 506',
        'J': 'TAS 201/203',
        'K': 'TAS 202',
        'L': 'AAMA 1701.2-02',
        'M': 'AAMA 1702.2-02',
        'N': 'AAMA 1704',
        'O': '1002-11',
        'P': '1102-11'
    }
    var container = $('.products-content');
    if (data.results.length == 0) {
        $('.manufacturer-name').empty().append('No results found.');
        container.empty();
        return false;
    }
    $('.manufacturer-name').empty().append(data.results[0].name);
    container.empty();
    var from = ((parseInt(data.facts.PageNum) - 1) * 25) + 1;
    var to = ((parseInt(data.facts.PageNum) - 1) * 25) + data.results.length;
    container.append('<h4>Showing results ' + from + ' to ' + to + ' of ' + data.facts.NumRecordsFound + '</h4>');

    $.each(data.results, function(index, item){
        var ul = $('<ul>');
        // CPD number
        ul.append('<li>CPD Number: <a href="/products/' + item.pcil_id + '"><strong>' + item.pcil_id + '</strong></a></li>');
        // model number
        if (item.manmodelno != null) {ul.append('<li>Manufacturer Code: <a href="/products/' + item.pcil_id + '"><strong>' + item.manmodelno + '</strong></a></li>');}
        // manufacturer name
        ul.append('<li>Manufacturer Name: <strong>' + item.name + '</strong></li>');
        // description
        if (item.mansrsdsc != null || item.mansrsdsc.trim().length != 0) {
            var mansrsdsc = item.mansrsdsc + ' ' + item.mansrsdsc2 + ' ' + item.mansrsdsc3;
            ul.append('<li>Manufacturer\'s Series Description: <strong>' + mansrsdsc + '</strong></li>');
        }
        var unitwidth = (item.unitwidth)? parseInt(item.unitwidth) : 0;
        var unitheight = (item.unitheight)? parseInt(item.unitheight) : 0;
        // frame size si
        ul.append('<li>Frame Size (SI): <strong>' + (unitwidth * unitheight) + '</strong></li>');

        var sashwidth = (item.sashwidth)? parseInt(item.sashwidth) : 0;
        var sashheight = (item.sashheight)? parseInt(item.sashheight) : 0;
        // frame size ip
        ul.append('<li>Frame Size (IP): <strong>' + (sashwidth * sashheight) + '</strong></li>');
        // operator type
        ul.append('<li>Operator Type: <strong>' + item.operators + '</strong></li>');

        if (item.framemat != null && item.framemat.length > 0) {ul.append('<li>Frame Material: <strong>' + item.framemat + '</strong></li>');} // frame material
        if (item.perfclass != null && item.perfclass.length > 0) {ul.append('<li>Performance Class: <strong>' + item.perfclass + '</strong></li>');} // performance class
        if (item.perfgrade != null && item.perfgrade.length > 0) {ul.append('<li>Performance Grade: <strong>' + item.perfgrade + '</strong></li>');} // performance grade
        // frame size si
        // frame size pi
        if (item.prodtype1 != null) {ul.append('<li>Operator Type: <strong>' + item.prodtype1 + '</strong></li>');} // operator type
        // configuration
        if (item.refteststd != null) {
            var testspec = item.refteststd.split('');
            var specs = [];
            _.forEach(testspec, function(charac, n){
                specs.push('<li>' + testSpecifications[charac] + '</li>');
            });
            ul.append('<li>Test Specifications: <strong><ul>' + specs.join('') + '</ul></strong></li>');
        } // test specifications
        var content = $('<div>', {'class': 'content-box'}).append(ul).append('<a href="/products/' + item.pcil_id + '"><strong>More info &rarr;</strong></a>');
        container.append(content);
    });
}
function setPagination(data, currentPage)
{
    var container = $('.pages');
    container.empty();
    if (parseInt(data.facts.TotalPages) > 1) {
        $('.pages').bootpag({
            total: data.facts.TotalPages,
            page: currentPage,
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
            window.Cubic.products.searchProducts(event, num);
        });
    }
}
function getFilterCatalogs()
{
    var isRequestSent = false;
    _.forIn(window.Cubic.products.filters, function(params, key){
        if (window.Cubic.ls(key) == null && !isRequestSent) {
            // get catalogs.
            $.ajax({
                type: 'GET',
                url: '/ajax/products/filters',
                success: function(data, textStatus, jqXHR) {
                    _.forIn(data, function(value, key){
                        window.Cubic.ls(key,{data: value, exp: window.Cubic.moment().add(7, 'days')});
                    })
                    setProductFilters();
                },
                error: function(jqXHR, textStatus, errorThrown) {},
                dataType: 'JSON'
            });
            isRequestSent = true;
        }
    })
    setProductFilters();
}
function setProductFilters()
{
    _.forIn(window.Cubic.products.filters, function(params, key){
        var filter = window.Cubic.ls(key);
        _.forEach(filter.data, function(item,index){
            addFilterOption(item[params.val], item[params.text], params.name);
        });
    });
    $('button[name="submitFrm"]').html('Search').removeAttr('disabled');
}
function addFilterOption(val, text, objectName) {
    $('select[name="' + objectName + '"]').append('<option value="' + val + '">' + text + '</option>');
}
function searchProducts(e, page)
{
    var params = {};
    var fields = $('select');
    $.each(fields, function(index, field){
        params[$(field).attr('name')] = $(field).val();
    });
    if ($('checkbox[name="mImpact_TAS"]').is(':checked')) {
        params['mImpact_TAS'] = '1';
    } else { params['mImpact_TAS'] = ''; }
    if ($('checkbox[name="mImpact_AAMA"]').is(':checked')) {
        params['mImpact_AAMA'] = '1';
    } else {params['mImpact_AAMA'] = ''; }
    if (!isNaN(page)) {
        params['intPageNum'] = page;
    } else { params['intPageNum'] = 1; }
    $('button[name="submitFrm"]').attr('disabled',true);
    toggleLoadBar('.products-content');
    $.ajax({
        type: 'POST',
        url: '/ajax/products/search',
        data: params,
        success: function(data, textStatus, jqXHR) {
            setPagination(data, params.intPageNum);
            displayManufacturer(data);
            if (document.getElementsByClassName('list-products').length == 0) {
                $('.manufacturer-name').empty().append('Search Results');
            }
            $('button[name="submitFrm"]').attr('disabled',false);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('button[name="submitFrm"]').attr('disabled',false);
        },
        dataType: 'JSON'
    });
    if (e) {
        e.preventDefault();
    }
    return false;
}
function toggleLoadBar(target)
{
    $('.products-content').empty().append('<div class="text-center"><i class="fa fa-2x fa-spinner fa-pulse"></i> <h4>Loading products</h4></div>');
    $('ul.pagination').empty();
    $('.manufacturer-name').empty();
    $(target).animate({scrollTop : 0},800);
}