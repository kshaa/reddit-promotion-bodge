/**
 * Soft marking - transparent promotions w/ red border
 */
function setPromotionCss() {
    // Set promotion css only once
    if (window.__PromotionMarkerCssSet) {
        return;
    }

    $markerStyleSheet = `
        .promotion {
            box-shadow: 0 0 0 2px red;
            opacity: 0.2;
        }
    `;

    jQuery('<style>' + $markerStyleSheet + '</style>').appendTo('body');

    window.__PromotionMarkerCssSet = true;
}

function softMarkPromotion($promotion) {
    setPromotionCss();
    $promotion.addClass('promotion');
}

/**
 * Hard marking - remove promotions
 */
function hardMarkPromotion($promotion) {
    $promotion.remove();
}

/**
 * Mark promotions
 */
function markPromotion(unmarkedPromotion) {
    if (window.__PromotionRemove) {
        hardMarkPromotion($unmarkedPromotion);
    } else {
        softMarkPromotion($unmarkedPromotion);
    }
}

function markPromotions($unmarkedPromotions) {
    $.each($unmarkedPromotions, function(index, element) {
        $unmarkedPromotion = $(element);
        markPromotion($unmarkedPromotion);
    })
}

/**
 * Find unmarked promotions
 */
function getUnmarkedPromotions() {
    $promotionTexts = jQuery(":contains('promoted'):not(.marked)");
    $promotions = [];

	jQuery.each($promotionTexts, function(index, element) {
        $promotionText = jQuery(element);

        if ($promotionText.text() === 'promoted') {
            $promotion = $promotionText.closest(".scrollerItem");
            $promotions.push($promotion);
            // Mark the promotion, so it gets "processed" only once
            $promotionText.addClass('marked');
        }
    });

    return $promotions;
}

/**
 * When you scroll lower, find and mark new promotions
 */
function bindAdvancesInDistanceFromTopOfWindow(callback) {
    jQuery(window).scroll(function() {
        pixelsFromTop	    = $(this).scrollTop();
        scrollFrame	        = Math.round(pixelsFromTop / 100);

        if (window.__PromotionOldScrollFrame === undefined) {
            window.__PromotionOldScrollFrame = 0;
        }

        isFrameLarger 		= scrollFrame > window.__PromotionOldScrollFrame;
        if (isFrameLarger) {
            window.__PromotionOldScrollFrame = scrollFrame;

            callback();
        }
    });    
}

function main() {
    markPromotions(getUnmarkedPromotions());

    bindAdvancesInDistanceFromTopOfWindow(function() {
        markPromotions(getUnmarkedPromotions());
    });
}

/**
 * Asynchronous script loader w/ callback
 */
function asyncLoadScript(u, c) {
    var d = document, t = 'script',
        o = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    o.src = '//' + u;
    if (c) { o.addEventListener('load', function (e) { c(null, e); }, false); }
    s.parentNode.insertBefore(o, s);
}

/**
 * Load jQuery and start processing promotions!
 */
if (!window.__PromotionBodgeInitialised) {
    window.__PromotionBodgeInitialised = true;
    console.log('Reddit promotion bodge is enabled');
    asyncLoadScript('code.jquery.com/jquery-1.10.2.js', function() {
        // If set to false, promotions will be set transparent and marked with red border
        // If set to true, promotions will be completely removed
        window.__PromotionRemove = false;
    
        // Start marking promotions
        main();
    })
}
  