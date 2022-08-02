'use strict';

window.onload = function () {
    const RATING_STROKE_LENGTH = 114,
        RATING_COLOR_GREEN = '#7eae3e',
        RATING_COLOR_YELLOW = '#efb428',
        RATING_COLOR_RED = '#e73e4e';

    const SCREEN_MAX_WIDTH = document.querySelector('.wrapper').clientWidth;
    const GUTTER_X2 = 30;
    const COL_WIDTH = SCREEN_MAX_WIDTH / 12 - GUTTER_X2;
    const COL_3_WIDTH = ( COL_WIDTH * 3 ) + ( GUTTER_X2 * 2 );
    const COL_4_WIDTH = ( COL_WIDTH * 4 ) + ( GUTTER_X2 * 3 );

    // common function ----------------
    stylesSelect();
    // ===============================

    initCustomScrollBar ();

    menuOpened ();

    showAllTopMenuItems ();

    showBrandRating ();

    showStarRating ();

    showReviewDiagram ();

    showAllCars ();

    showAllMagazineArticles ();

    showAllSEOText ();

    showAllFooterMenuItems ();

    toggleWidgetFilter ();

    // spare-parts function -------------------------------------
    scrollToReviewBlock();
    showRatingSpareParts();
    initFilter(); // JQ
    reviewShowMoreBtn(); // JQ
    // ==========================================================

    // rating page functions ----------------------------
    showAdditInfo ('.additInfo', '.headerBlockContent__item');
    tableHeaderClick ();
    showNonRatingsBrand ();
    scrollToSeoBlock ();
    // ==================================================

    // model-spareParts page function ----------------------------
    otherSparePartsToggle(); // otherSparePartsToggle JQ
    responceReplaceWidgetInterestingTheme(); // responceReplaceWidgetInterestingTheme JQ
    // ===========================================================

    // car-brand page function -----------------------------------
    toggleSparePartsList(); // toggleSparePartsList JQ
    // ===========================================================

    // comparison page -------------------------------------------
    ratingCircleDynamic(); // ratingCircleDynamic JQ
    // ===========================================================

    // userInfo page ---------------------------------------------
    showPopUpUserNotification (); // JQ showPopUpUserNotification
    // ===========================================================

    // mobile -----------------------------------------
    sparePartsToggle ();
    brandsToggle ();
    // -------------------------------------------------


    // common function ----------------
    function stylesSelect() {
        let select = $('select');
        if ( select.length ) {
            $(select).styler();
        }
    } //
    // ===============================

    function menuOpened () {
        const topToggleMenu = document.querySelector('.iconBtn-toggleMenu');
        const topMenu = document.querySelector('.topMenu');
        let menuOpenStatus = false;

        topToggleMenu.addEventListener('click', function(){
            console.log('click');
            if ( !menuOpenStatus ) {
                topMenu.setAttribute('style', 'display:flex;');
                setTimeout(function(){
                    topMenu.classList.add('topMenu-open');
                    topToggleMenu.classList.add('iconBtn-showMarker');
                    menuOpenStatus = true;
                },10);
            } else {
                menuOpenStatus = closeTopMenu(menuOpenStatus);
            }
            // clickPastWindow('topMenu', function(){
            //     menuOpenStatus = closeTopMenu(menuOpenStatus);
            // });
        });
    }

    function showAllTopMenuItems () {
        const toggleMenuBtn = document.querySelectorAll('.shevronIcon-headerMenu');
        let currentHiddenBlock,
            currentFooterMenu,
            currentHiddenElements;
        let hiddenElementsHeight;

        for ( let currentBtn of toggleMenuBtn ) {
            currentBtn.addEventListener('click', function() {
                currentFooterMenu = this.parentNode.parentNode;
                currentHiddenBlock = currentFooterMenu.querySelector('.headerMenu__hiddenBlock');
                currentHiddenElements = currentHiddenBlock.querySelector('.headerMenu__hiddenElements');

                console.log(currentHiddenBlock);
                if ( this.classList.contains('shevronIcon-headerMenuRotate')) {
                    // rotate shevron icon
                    this.classList.remove('shevronIcon-headerMenuRotate');
                    // hiding items
                    currentHiddenBlock.removeAttribute('style');
                    setTimeout(()=>{
                        currentHiddenElements.classList.add('displayNone');
                    }, 400);
                } else {
                    // rotate shevron icon
                    this.classList.add('shevronIcon-headerMenuRotate');
                    // show items
                    currentHiddenElements.classList.remove('displayNone');
                    hiddenElementsHeight = currentHiddenElements.clientHeight;
                    currentHiddenBlock.style.height = hiddenElementsHeight + 'px';
                }
            });
        } // for of
    } // showAllTopMenuItems

    function showBrandRating () {
        let sparePartsElements = document.querySelectorAll('.sparePartsElement');
        sparePartsElements = Array.prototype.slice.call(sparePartsElements);

        sparePartsElements.forEach(function(currentElem) {
            let currentRatingElem = currentElem.querySelector('.sparePartsElement__item-rating');
            let spanRatingElement = currentRatingElem.querySelector('span');
            let currentRating = parseInt( currentRatingElem.getAttribute('data-count') );
            let persentValue = parseInt( RATING_STROKE_LENGTH - RATING_STROKE_LENGTH * currentRating / 100 );
            let svg = currentRatingElem.querySelector('path:last-child');
            for ( let i = 0; i <= currentRating; i++ ) {
                setTimeout(()=>{
                    spanRatingElement.innerText = i;
                }, i * 7);
            }

            svg.style.strokeDashoffset = persentValue;
            switch ( true ) {
                case ( currentRating < 34 ) : {
                    svg.style.stroke = RATING_COLOR_RED;
                    break;
                }
                case ( currentRating >= 34 && currentRating < 67 ) : {
                    svg.style.stroke = RATING_COLOR_YELLOW;
                    break;
                }

                case ( currentRating >= 67 && currentRating <= 100 ) : {
                    svg.style.stroke = RATING_COLOR_GREEN;
                    break;
                }
            }
        });
    } // showBrandRating

    function showStarRating () {
        let averageRatingNumber = document.querySelectorAll('.averageRatingNumber');
        averageRatingNumber = Array.prototype.slice.call(averageRatingNumber);
        averageRatingNumber.forEach(function(currentElem) {
            let currentRating = parseFloat( currentElem.innerText );
            let svg = currentElem.parentNode.querySelector('path');
            switch ( true ) {
                case ( currentRating <= 3 ) : {
                    svg.style.fill = RATING_COLOR_RED;
                    break;
                }
                case ( currentRating > 3 && currentRating < 4 ) : {
                    svg.style.fill = RATING_COLOR_YELLOW;
                    break;
                }

                case ( currentRating > 4 ) : {
                    svg.style.fill = RATING_COLOR_GREEN;
                    break;
                }
            }
        });
    } // showStarRating

    function showReviewDiagram() {
        let reviewDiagramBlock = $('.reviewDiagramBlock');
        if ( reviewDiagramBlock.length) {
            reviewDiagramBlock.each(function () {
                let greenZone = $(this).find('.reviewDiagramBlock__item-green'),
                    yellowZone = $(this).find('.reviewDiagramBlock__item-yellow'),
                    redZone = $(this).find('.reviewDiagramBlock__item-red');
                let greenZoneValue = parseInt(greenZone.text()),
                    yellowZoneValue = parseInt(yellowZone.text()),
                    redZoneValue = parseInt(redZone.text());
                let maxValue = Math.max( greenZoneValue,
                    yellowZoneValue,
                    redZoneValue
                );

                let summValue = greenZoneValue + yellowZoneValue + redZoneValue;
                let greenZoneValuePercent,
                    yellowZoneValuePercent,
                    redZoneValuePercent;

                if ( reviewDiagramBlock.hasClass('reviewDiagramBlock-comparisonPage') ) {
                    greenZoneValuePercent = parseInt( greenZoneValue * 100 / maxValue );
                    yellowZoneValuePercent = parseInt( yellowZoneValue * 100 / maxValue );
                    redZoneValuePercent = parseInt( redZoneValue * 100 / maxValue );
                } else {
                    greenZoneValuePercent = parseInt(100 * greenZoneValue / summValue);
                    yellowZoneValuePercent = parseInt(100 * yellowZoneValue / summValue);
                    redZoneValuePercent = parseInt(100 * redZoneValue / summValue);
                }


                greenZone.css('width', greenZoneValuePercent + '%');
                yellowZone.css('width', yellowZoneValuePercent + '%');
                redZone.css('width', redZoneValuePercent + '%');
            });
        }
    } // showReviewDiagram JQ

    function showAllCars () {
        const carsListBlock = document.querySelector('.cars__listsBlock');
        if (carsListBlock) {
            const blockHeight = carsListBlock.clientHeight;
            const carItems = carsListBlock.querySelector('.carItems');
            const showAllBtn = document.querySelector('#carsShowAll');
            let showAllBtnStatus;
            const showAllBtnText = showAllBtn.innerText;
            let unvisibleItem = carsListBlock.querySelectorAll('.displayNone');
            let openBlockHeight = 0;

            carsListBlock.style.height = blockHeight + 'px';
            carsListBlock.style.overflow = 'hidden';
            carsListBlock.style.transition = 'height .3s';

            showAllBtn.addEventListener('click', ()=>{
                showAllBtnStatus = showAllBtn.getAttribute('data-status');
                if ( showAllBtnStatus === 'toshow' ) {
                    for ( let i = 0; i < unvisibleItem.length; i++) {
                        unvisibleItem[i].classList.remove('displayNone');
                        unvisibleItem[i].classList.add('displayShow');
                    }
                    openBlockHeight = carItems.clientHeight;
                    carsListBlock.style.height = openBlockHeight + 'px';

                    showAllBtn.setAttribute('data-status','hide');

                    // change show all btn on hide content
                    showAllBtn.innerText = 'Скрыть';

                } else {
                    unvisibleItem = carsListBlock.querySelectorAll('.displayShow');
                    carsListBlock.style.height = blockHeight + 'px';
                    showAllBtn.setAttribute('data-status','toshow');

                    // change show all btn on show more
                    showAllBtn.innerText = showAllBtnText;

                    // clear style
                    setTimeout(()=> {
                        for ( let i = 0; i < unvisibleItem.length; i++) {
                            unvisibleItem[i].classList.add('displayNone');
                            unvisibleItem[i].classList.remove('displayShow');
                        }
                        // carsListBlock.removeAttribute('style');
                    }, 1000)
                }

            });
        }
    } // showAllCars

    function showAllMagazineArticles () {
        const magazinArticlesBlock = document.querySelector('.magazine__articles');
        if ( magazinArticlesBlock ) {
            const blockHeight = magazinArticlesBlock.clientHeight;
            const magazinArticlesBlockItems = magazinArticlesBlock.querySelector('.articleTabs');
            const showAllBtn = document.querySelector('#magazineShowAll');
            const unvisibleItem = magazinArticlesBlockItems.querySelectorAll('.displayNone');
            let openBlockHeight = 0;

            magazinArticlesBlock.style.height = blockHeight + 'px';
            magazinArticlesBlock.style.overflow = 'hidden';
            magazinArticlesBlock.style.transition = 'height .3s';

            showAllBtn.addEventListener('click', ()=>{
                for ( let i = 0; i < unvisibleItem.length; i++) {
                    unvisibleItem[i].classList.remove('displayNone');
                }
                openBlockHeight = magazinArticlesBlockItems.clientHeight;
                magazinArticlesBlock.style.height = openBlockHeight + 'px';

                // disabled show all btn

                // disabled show all btn
                showAllBtn.style.display = 'none';

                // clear style
                setTimeout(()=> {
                    magazinArticlesBlock.removeAttribute('style');
                }, 1000)
            });
        }
    } // showAllMagazineArticles

    function showAllSEOText () {
        const seoContentBlock = document.querySelector('.seoTexts');
        if (seoContentBlock) {
            const seoBlockTxt = seoContentBlock.querySelector('.seoTexts__content');
            const blockHeight = seoContentBlock.clientHeight + 30;
            const showAllBtn = document.querySelector('#seoBlockShowMore');
            const showAllBtnText = showAllBtn.innerText;
            let showAllBtnStatus;
            const unvisibleItem = seoBlockTxt.querySelectorAll('.displayNone');
            let openBlockHeight = 0;

            seoContentBlock.style.height = blockHeight + 'px';
            seoContentBlock.style.overflow = 'hidden';
            seoContentBlock.style.transition = 'height .3s';

            showAllBtn.addEventListener('click', ()=>{
                showAllBtnStatus = showAllBtn.getAttribute('data-status');
                if ( showAllBtnStatus === 'toshow' ) {
                    for ( let i = 0; i < unvisibleItem.length; i++) {
                        unvisibleItem[i].classList.remove('displayNone');
                        unvisibleItem[i].classList.add('displayShow');
                    }
                    openBlockHeight = seoBlockTxt.clientHeight + 30;
                    seoContentBlock.style.height = openBlockHeight + 'px';

                    showAllBtn.setAttribute('data-status','hide');

                    // change show all btn on hide content
                    showAllBtn.innerText = 'Скрыть';

                } else {
                    seoContentBlock.style.height = blockHeight + 'px';
                    showAllBtn.setAttribute('data-status','toshow');

                    // change show all btn on show more
                    showAllBtn.innerText = showAllBtnText;

                    // clear style
                    setTimeout(()=> {
                        for ( let i = 0; i < unvisibleItem.length; i++) {
                            unvisibleItem[i].classList.add('displayNone');
                            unvisibleItem[i].classList.remove('displayShow');
                        }
                        // carsListBlock.removeAttribute('style');
                    }, 1000)
                }
            });
        }
    } // showAllSEOText

    function showAllFooterMenuItems () {
        const toggleMenuBtn = document.querySelectorAll('.shevronIcon-footerMenu');
        let currentHiddenBlock,
            currentFooterMenu,
            currentHiddenElements;
        let hiddenElementsHeight;

        for ( let currentBtn of toggleMenuBtn ) {
            currentBtn.addEventListener('click', function() {
                currentFooterMenu = this.parentNode.parentNode;
                currentHiddenBlock = currentFooterMenu.querySelector('.footerMenu__hiddenBlock');
                currentHiddenElements = currentHiddenBlock.querySelector('.footerMenu__hiddenElements');

                console.log(currentHiddenBlock);
                if ( this.classList.contains('shevronIcon-footerMenuRotate')) {
                    // rotate shevron icon
                    this.classList.remove('shevronIcon-footerMenuRotate');
                    // hiding items
                    currentHiddenBlock.removeAttribute('style');
                    setTimeout(()=>{
                        currentHiddenElements.classList.add('displayNone');
                    }, 400);
                } else {
                    // rotate shevron icon
                    this.classList.add('shevronIcon-footerMenuRotate');
                    // show items
                    currentHiddenElements.classList.remove('displayNone');
                    hiddenElementsHeight = currentHiddenElements.clientHeight;
                    currentHiddenBlock.style.height = hiddenElementsHeight + 'px';
                }
            });
        } // for of
    } // showAllFooterMenuItems

    function initCustomScrollBar () {
        const scrollContainer = document.querySelector('.activityTape');
        fleXenv.fleXcrollMain(scrollContainer);

        const ratingTableScroll = document.querySelector('.ratingTableBlock__content');
        if (ratingTableScroll) {
            // fleXenv.fleXcrollMain(ratingTableScroll);
        }
    } // initCustomScrollBar

    function toggleWidgetFilter () {
        let widgetFilter = $('.widget-filter');
        let isOpen = false;
        const ADDIT_HEIGHT = 114;
        const HEIGHT_BTN = 60;
        if ( widgetFilter.length ) {
            let filterHeader = widgetFilter.find('.widget__header');
            let shevronIcon = widgetFilter.find('.shevronIcon');
            let widgetContent = widgetFilter.find('.widgetContent');
            let widgetContentHeight = widgetContent.innerHeight();

            filterHeader.click(function(){
                if ( !isOpen ) {
                    widgetFilter.removeClass('widget-filterClosed');
                    shevronIcon.addClass('shevronIcon-top');
                    widgetFilter.innerHeight( widgetContentHeight + ADDIT_HEIGHT);
                    setTimeout(function(){
                        widgetFilter.innerHeight( 'initial');
                    }, 100);
                    isOpen = !isOpen;
                } else {
                    widgetFilter.addClass('widget-filterClosed');
                    shevronIcon.removeClass('shevronIcon-top');
                    widgetContentHeight = widgetContent.innerHeight();
                    widgetFilter.innerHeight( widgetContentHeight + ADDIT_HEIGHT);
                    widgetFilter.innerHeight( HEIGHT_BTN );
                    isOpen = !isOpen;
                }
            });
        }
    } // toggleWidgetFilter JQ

    // spare-parts function -------------------------------------
    function scrollToReviewBlock() {
        const link = document.querySelector('#scrollToReviewBlock');
        if (link) {
            link.onclick = function (e) {
                e.preventDefault();
                scrollTo('#sparePartsPageReviewBlock');
            };
        }
    } // scrollToReviewBlock
    function showRatingSpareParts() {
        let sparePartsElements = document.querySelectorAll('.ratingListElement');
        if (sparePartsElements) {
            sparePartsElements = Array.prototype.slice.call(sparePartsElements);

            sparePartsElements.forEach(function (currentElem) {
                let currentRatingElem = currentElem.querySelector('.ratingListElement__item-rating');
                let spanRatingElement = currentRatingElem.querySelector('span');
                let currentRating = parseInt(currentRatingElem.getAttribute('data-count'));
                let persentValue = parseInt(RATING_STROKE_LENGTH - RATING_STROKE_LENGTH * currentRating / 100);
                let svg = currentRatingElem.querySelector('path:last-child');
                for (let i = 0; i <= currentRating; i++) {
                    setTimeout(() => {
                        spanRatingElement.innerText = i;
                    }, i * 7);
                }

                svg.style.strokeDashoffset = persentValue;
                switch (true) {
                    case ( currentRating < 34 ) : {
                        svg.style.stroke = RATING_COLOR_RED;
                        break;
                    }
                    case ( currentRating >= 34 && currentRating < 67 ) : {
                        svg.style.stroke = RATING_COLOR_YELLOW;
                        break;
                    }

                    case ( currentRating >= 67 && currentRating <= 100 ) : {
                        svg.style.stroke = RATING_COLOR_GREEN;
                        break;
                    }
                }
            });
        }
    } // showRatingSpareParts
    function reviewShowMoreBtn() {
        const reviewBlock = $('.review');
        if (reviewBlock.length) {
            const userDescriptionBlock = reviewBlock.find('.infoBlock-userDescription');
            const showMoreBtn = userDescriptionBlock.find('.showMoreBtn-descrBlock');
            let currentDescrBlockHeight;
            let descriptionIsShow = false;

            showMoreBtn.click(function(){
                const currentReviewBlock = $(this).parent();
                const descriptionHeight = currentReviewBlock.find('.userDescription').height();

                if (descriptionIsShow) {
                    currentReviewBlock.css('height', currentDescrBlockHeight);
                    $(this).text('Подробнее');
                    setTimeout(function(){
                        currentReviewBlock.css('max-height','');
                        currentReviewBlock.css('height','');
                    }, 300);
                } else {
                    currentDescrBlockHeight = currentReviewBlock.height();
                    currentReviewBlock.height(currentDescrBlockHeight);
                    currentReviewBlock.height(descriptionHeight + 20);
                    currentReviewBlock.css('max-height','initial');
                    $(this).text('скрыть');
                }
                console.log(currentDescrBlockHeight);
                descriptionIsShow = !descriptionIsShow;
            });
        }
    } // reviewShowMoreBtn JQ
    function initFilter() {
        const widgetFilterSpareParts = new UserFilter('userFilterSpareParts', 'Все');
        widgetFilterSpareParts.init();
        const widgetFilterManufacturer = new UserFilter('userFilterManufacturer', 'Все');
        widgetFilterManufacturer.init();
        const widgetFilterCarBrandName = new UserFilter('userFilterCarBrandName', 'Выберите марку авто', 'userFilterCarModel');
        widgetFilterCarBrandName.init();
        const widgetFilterCarModel = new UserFilter('userFilterCarModel', 'Выберите модель авто', 'userFilterCarGeneration');
        widgetFilterCarModel.init();
        const widgetFilterCarGeneration = new UserFilter('userFilterCarGeneration', 'Выберите поколение авто');
        widgetFilterCarGeneration.init();
    } // initFilter JQ
    // ==========================================================

    // rating page functions ------------------------------------
    function showAdditInfo (additInfoBtnSelector, additInfoParentBlockSelector) {
        const additInfoBtn = document.querySelector(additInfoBtnSelector);
        if (additInfoBtn) {
            const parentBox = document.querySelector(additInfoParentBlockSelector);
            const showAdditInfo = parentBox.querySelector('.showAdditInfo');
            additInfoBtn.onmouseover = function() {
                DOMAnimation.slideDown(showAdditInfo, 200);
            };
            additInfoBtn.onmouseout = function() {
                DOMAnimation.slideUp(showAdditInfo, 200);
            };
        }
    } // showAdditInfo
    function tableHeaderClick () {
        const tableHeaderItem = document.querySelectorAll('.tableHeaderItem');
        const topDirectionClass = 'ratingDirection-top';
        const bottomDirectionClass = 'ratingDirection-bottom';

        Array.from(tableHeaderItem).forEach(function(currentHeaderItem){
            currentHeaderItem.addEventListener('click', function(){
                const ratingDirection = this.querySelector('.ratingDirection');
                if (ratingDirection.classList.contains(topDirectionClass)) {
                    ratingDirection.classList.remove(topDirectionClass);
                    ratingDirection.classList.add(bottomDirectionClass);
                } else {
                    ratingDirection.classList.add(topDirectionClass);
                    ratingDirection.classList.remove(bottomDirectionClass);
                }
            });
        });
    } // tableHeaderClick
    function showNonRatingsBrand () {
        const showNotRatedBtn = document.querySelector('.mainBtn-showNotRated');
        const notShowRatingsBlock = document.querySelector('.tableRating-loading');
        if (notShowRatingsBlock) {
            const showText = 'Показать производителей не участвующих в рейтинге';
            const hideText = 'Скрыть производителей не участвующих в рейтинге';
            let innerText;
            let showStatus = false;

            showNotRatedBtn.addEventListener('click', function(){
                DOMAnimation.slideToggle(notShowRatingsBlock);
                showStatus = !showStatus;
                innerText = showStatus ? hideText : showText;
                this.querySelector('.innerText').innerText = innerText;
            });
        }
    } // showNonRatingsBrand
    function scrollToSeoBlock(){
        const showMoreBtn = document.querySelector('.showMoreBtn-descrBlock');
        if ( showMoreBtn ) {
            showMoreBtn.onclick = function(e) {
                e.preventDefault();
                scrollTo('#seo');
            }
        }
    } // scrollToSeoBlock
    // ==========================================================

    // model-spareParts page function ----------------------------
    function otherSparePartsToggle() {
        let showMoreBtn = $('#otherSparePartsToggle');
        if ( showMoreBtn.length ) {
            const listWrap = showMoreBtn.parent().find('.listWrap');
            const listBlock = showMoreBtn.parent().find('.otherSpareParts__items');
            const listWrapHeight = listWrap.innerHeight();
            const listBlockHeight = listBlock.innerHeight();
            let isOpen = false;
            showMoreBtn.click(function () {
                if ( !isOpen ) {
                    isOpen = !isOpen;
                    listWrap.innerHeight(listBlockHeight);
                    $(this).text('Скрыть');
                } else {
                    isOpen = !isOpen;
                    listWrap.innerHeight(listWrapHeight);
                    $(this).text('Показать еще');
                }
            });
        }
    } // otherSparePartsToggle JQ
    function responceReplaceWidgetInterestingTheme() {
        const reviewBlock = $('#modelPartsPageReviewBlock');
        if (reviewBlock.length) {
            const otherSparePartsBlock = $('#otherSparePartsBlock');
            const reviewBlockWidgetsArea = reviewBlock.find('.widgetsArea');
            const widgetInterestingTopics = reviewBlockWidgetsArea.find('.widget-interestingTopics');
            const otherSparePartsBlockWidgetsArea = otherSparePartsBlock.find('.widgetsArea');

            if ( window.matchMedia('(max-width: 1000px)').matches ) {
                otherSparePartsBlockWidgetsArea.append(widgetInterestingTopics);
            }
            window.addEventListener('resize', function(){
                if (window.matchMedia('(max-width: 1000px)').matches) {
                    otherSparePartsBlockWidgetsArea.append(widgetInterestingTopics);
                } else {
                    reviewBlockWidgetsArea.append(widgetInterestingTopics);
                }
            });
        }
    } // responceReplaceWidgetInterestingTheme JQ
    // ===========================================================

    // car-brand page function -----------------------------------
    function toggleSparePartsList() {
        const popularModels = $('#popularModels');
        const sparePartsContainerHeight = 104;
        if ( popularModels.length ) {
            const showAllBtn = popularModels.find('.showMoreBtn');
            showAllBtn.click(function(){
                const currentBtn = $(this);
                let isShow = $(this).attr('data-show');
                isShow = ( isShow === 'true' );
                console.log(isShow);
                let currentList = $(this).parent();
                let currentListItems = currentList.find('.innerContent__item');
                const sparePartsContainer = currentList.find('.innerContent');
                const sparePartsList = sparePartsContainer.find('.innerContent__list');
                let sparePartsListHeight;

                if ( !isShow) {
                    isShow = !isShow;
                    currentBtn.attr('data-show', isShow);
                    if ( currentListItems.length > 3 ) {
                        for ( let i = 2; i < currentListItems.length; i++) {
                            currentListItems.eq(i).removeClass('innerContent__item-hide');
                        }
                        setTimeout(function() {
                            sparePartsListHeight = sparePartsList.innerHeight();
                            sparePartsContainer.css('max-height',sparePartsListHeight);
                        }, 100);
                    }
                } else {
                    isShow = !isShow;
                    currentBtn.attr('data-show', isShow);
                    sparePartsContainer.css('max-height',sparePartsContainerHeight);
                    if ( currentListItems.length > 3 ) {
                        setTimeout(function() {
                            for ( let i = 3; i < currentListItems.length; i++) {
                                currentListItems.eq(i).addClass('innerContent__item-hide');
                            }
                        }, 300);
                    }
                }
            });
        }
    } // toggleSparePartsList JQ
    // ===========================================================

    // comparison page -------------------------------------------
    function ratingCircleDynamic() {
        let sparePartsElements = $('.ratingCircleDynamic');
        if ( sparePartsElements.length ) {
            sparePartsElements.each(function () {
                let currentRatingElem = $(this);
                let spanRatingElement = currentRatingElem.find('span');
                let currentRating = parseInt(currentRatingElem.attr('data-count'));
                let persentValue = parseInt(RATING_STROKE_LENGTH - RATING_STROKE_LENGTH * currentRating / 100);
                let svg = currentRatingElem.find('path:last-child');
                for (let i = 0; i <= currentRating; i++) {
                    setTimeout(() => {
                        spanRatingElement.text(i);
                    }, i * 7);
                }

                svg.css('strokeDashoffset', persentValue);
                switch (true) {
                    case ( currentRating < 34 ) : {
                        svg.css('stroke', RATING_COLOR_RED);
                        break;
                    }
                    case ( currentRating >= 34 && currentRating < 67 ) : {
                        svg.css('stroke', RATING_COLOR_YELLOW);
                        break;
                    }

                    case ( currentRating >= 67 && currentRating <= 100 ) : {
                        svg.css('stroke', RATING_COLOR_GREEN);
                        break;
                    }
                }
            });
        }
    } // ratingCircleDynamic JQ
    // ===========================================================

    // userInfo page ---------------------------------------------
    function showPopUpUserNotification () {
        const notifBtn = $('#btnUserNotification');
        if ( notifBtn.length ) {
            const notifPopUp = $('.userInfo__notifPopUp');
            notifBtn.click(function() {
                notifPopUp.slideToggle();
                setTimeout(function(){
                    if ( !notifBtn.hasClass('userInfo__notificationBtn-noNew') ) {
                        notifBtn.addClass('userInfo__notificationBtn-noNew');
                    }
                }, 1000);
                clickPastWindow(notifPopUp, function(){
                    notifPopUp.slideUp();
                });
            });
        }
    } // JQ showPopUpUserNotification
    // ===========================================================

    // mobile ---------------------------------------------------
    function sparePartsToggle () {
        let sparePartsTitle = document.querySelectorAll('.sparePartsContentTitle');

        for ( let currentTitle of sparePartsTitle ) {
            currentTitle.addEventListener('click', function(e) {
                e.preventDefault();

                const sparePartsContent = this.parentNode;
                const sparePartsItem = this.parentNode.parentNode;

                if (sparePartsItem.classList.contains('sparePartsSlider__sliderItem-closed')) {
                    sparePartsItem.classList.remove('sparePartsSlider__sliderItem-closed');
                    sparePartsContent.classList.remove('sparePartsContent-closed');
                    currentTitle.classList.remove('sparePartsContentTitle-closed');
                } else {
                    sparePartsItem.classList.add('sparePartsSlider__sliderItem-closed');
                    sparePartsContent.classList.add('sparePartsContent-closed');
                    currentTitle.classList.add('sparePartsContentTitle-closed');
                }
            });
        }
    } // sparePartsToggle
    function brandsToggle () {
        const TITLE_HEIGHT = 50;
        const BLOCK_HEIGHT = 322;
        let brandsListTitle = document.querySelectorAll('.brandsList__title');

        for ( let currentTitle of brandsListTitle ) {
            currentTitle.addEventListener('click', function(e) {
                e.preventDefault();

                const brandsListItem = this.parentNode;

                if (brandsListItem.classList.contains('brandsList-closed')) {
                    brandsListItem.classList.remove('brandsList-closed');
                    currentTitle.classList.remove('brandsList__title-closed');
                } else {
                    brandsListItem.classList.add('brandsList-closed');
                    currentTitle.classList.add('brandsList__title-closed');
                }
            });
        }
    } // brandsToggle

    // secondary functions --------------------------------------
    // class UserFilter
    // To get the value of the selected field
    // You need to refer to the field - selectedValue
    // example: let myFilter = new UserFilter('carBrand');
    // myFilter.selectedValue;
    function UserFilter(filterId, defaultValue = '', dependenceElemId = '') {
        let that = this;
        this.filterId = filterId;
        this.selectedValue = defaultValue;
        this.dependeceElemId = dependenceElemId;
        this.filter = $('#' + this.filterId);
        this.filterHeader = this.filter.find('.userFilter__header');
        this.filterIsOpen = false;
        this.filterInput = this.filter.find('.inputFilter input');

        this.init = function () {
            this.filterHeader.find('.innerText').text(this.selectedValue);
            this.filterHeader.click(() => {
                if (!this.filterIsOpen) {
                    this.open();
                } else {
                    this.close();
                }
            });
            this.filtration();
            this.selected();
        };

        this.open = function () {
            this.filter.find('.userFilter__content').slideDown();
            this.filterIsOpen = true;
        };
        this.close = function () {
            this.filter.find('.userFilter__content').slideUp();
            this.filterIsOpen = false;
        };
        this.filtration = function () {
            let filterOptions = this.filter.find('.filterOptions');
            let itemList = this.filter.find('.filterOptions__item');
            this.filterInput.on('input', function () {
                itemList.hide();
                let inputValue = $(this).val().toUpperCase();
                if (!inputValue) {
                    itemList.show();
                } else {
                    itemList.each(function (index) {
                        let currentItemName = $(this).text().toUpperCase();
                        if (currentItemName.indexOf(inputValue) !== -1) {
                            $(this).show();
                        }
                    });
                }
            });
        };
        this.selected = function () {
            let filterOptionItem = this.filter.find('.filterOptions__item');
            filterOptionItem.click(function () {
                filterOptionItem.removeClass('filterOptions__item-selected');
                filterOptionItem.removeAttr('selected');
                let itemValue = $(this).text();
                $(this).addClass('filterOptions__item-selected');
                $(this).attr('selected', 'selected');
                $(this).parent().parent().parent().find('.userFilter__header .innerText').text(itemValue);
                $(this).parent().parent().parent().addClass('userFilter-selected');
                $(this).parent().parent().parent().attr('selected', 'selected');
                that.selectedValue = itemValue;
                if (that.dependeceElemId) {
                    $('#' + that.dependeceElemId).parent().show();
                }
                that.close();
            });
        }
    } // UserFilter JQ

    class DOMAnimation {
        /**
         * hide element
         * @param {HTMLElement} element
         * @param {Number} duration
         */
        static slideUp (element, duration = 500) {
            element.style.height = element.offsetHeight + 'px';
            element.style.transitionProperty = 'height, margin, padding';
            element.style.transitionDuration = duration + 'ms';
            element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            window.setTimeout(function(){
                element.style.display = 'none';
                element.style.removeProperty('height');
                element.style.removeProperty('padding-top');
                element.style.removeProperty('padding-bottom');
                element.style.removeProperty('margin-top');
                element.style.removeProperty('margin-bottom');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-property');
                element.style.removeProperty('transition-duration');
            }, duration);
        }
        /**
         * show element
         * @param {HTMLElement} element
         * @param {Number} duration
         */
        static slideDown (element, duration = 500) {
            element.style.removeProperty('display');
            let display = window.getComputedStyle(element).display;
            if ( display === 'none' ) display = 'block';
            element.style.display = display;
            let height = element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.paddingTop = 0;
            element.style.paddingBottom = 0;
            element.style.marginTop = 0;
            element.style.marginBottom = 0;
            element.offsetHeight;
            element.style.transitionProperty = 'height, margin, padding';
            element.style.transitionDuration = duration + 'ms';
            element.style.height = height + 'px';
            element.style.removeProperty('padding-top');
            element.style.removeProperty('padding-bottom');
            element.style.removeProperty('margin-top');
            element.style.removeProperty('margin-bottom');
            window.setTimeout(function(){
                element.style.removeProperty('height');
                element.style.removeProperty('overflow');
                element.style.removeProperty('transition-property');
                element.style.removeProperty('transition-duration');
            }, duration);
        }
        /**
         * toggle element
         * @param {HTMLElement} element
         * @param {Number} duration
         */
        static slideToggle (element, duration = 500) {
            let display = getComputedStyle(element).display;
            if (display === 'none') {
                this.slideDown(element, duration);
            } else {
                this.slideUp(element, duration);
            }
        }
    }

    function scrollTo (idElement, speed = 50) {
        const scrollElement = document.querySelector(idElement);
        let posElem = scrollElement.getBoundingClientRect().top + pageYOffset;
        let currentPos = pageYOffset;
        let scr = setInterval(function () {
            if ( currentPos > posElem ) {
                currentPos -= speed;
                if (currentPos < posElem) {
                    clearInterval(scr);
                }
            } else {
                currentPos += speed;
                if (currentPos > posElem - speed) {
                    clearInterval(scr);
                }
            }
            window.scrollTo(0, currentPos);
        }, 1);
    } // scrollTo

    function closeTopMenu (menuOpenStatus) {
        const topMenu = document.querySelector('.topMenu');
        const topToggleMenu = document.querySelector('.iconBtn-toggleMenu');
        if (menuOpenStatus) {
            topMenu.classList.remove('topMenu-open');
            topToggleMenu.classList.remove('iconBtn-showMarker');
            setTimeout(function(){
                topMenu.setAttribute('style', 'display:none;');
            },500);
        } else return true;
        return false;
    } // closeTopMenu

    function clickPastWindow(windowObj,callback) {
        $(document).mouseup(function (e){ // событие клика по веб-документу
            var isModalWindowImg = $('div').is('.imgFullScr');
            if (!windowObj.is(e.target) // если клик был не по нашему блоку
                && windowObj.has(e.target).length === 0) { // и не по его дочерним элементам
                if (!isModalWindowImg) {
                    callback(); // скрываем его
                }
            }
        });
    } // JQ clickPastWindow



};
