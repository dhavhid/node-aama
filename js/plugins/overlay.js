/**
 * Created by david on 3/8/16.
 */
module.exports.openOverlay = function openOverlay(olEl) {
    $oLay = $(olEl);

    if ($('#overlay-shade').length == 0)
        $($oLay).prepend('<div id="overlay-shade"></div>');

    $('#overlay-shade').fadeTo(300, 0.6, function() {});
}

module.exports.closeOverlay = function closeOverlay() {
    $('#overlay-shade').fadeOut(300);
}