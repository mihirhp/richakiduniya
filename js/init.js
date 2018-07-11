/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function () {


    /*----------------------------------------------------*/
    /*	Back To Top Button
    /*----------------------------------------------------*/
    var pxShow = 300; //height on which the button will show
    var fadeInTime = 400; //how slow/fast you want the button to show
    var fadeOutTime = 400; //how slow/fast you want the button to hide
    var scrollSpeed = 300; //how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

    // Show or hide the sticky footer button
    jQuery(window).scroll(function () {

        if (jQuery(window).scrollTop() >= pxShow) {
            jQuery("#go-top").fadeIn(fadeInTime);
        } else {
            jQuery("#go-top").fadeOut(fadeOutTime);
        }

    });

    // Animate the scroll to top
    jQuery("#go-top a").click(function () {
        jQuery("html, body").animate({ scrollTop: 0 }, scrollSpeed);
        return false;
    });
    //initSlideShow();
    /*----------------------------------------------------*/
    /*	Add Slide to slider
    /*----------------------------------------------------*/
    var HomePageSlider = $.getJSON('/Data/HomePageSlider.json', function (data) {
        var slides = data.slides;
        var ul = $('#intro-slider ul:nth-child(1)');
        $.each(slides, function (idx, obj) {
            var li = "<li><div class='row'><div class='twelve columns'><div class='slider-text'>" +
                "<h1>" + obj.slideHeader + "</h1>" +
                "<p>" + obj.slideText + "</p>" +
                "</div><div class='slider-image'>" +
                "<img src='" + obj.slideImage + "' alt='' /></div></div></div></li>";
            $(ul).append(li);
        });
    });
    all = $.when(HomePageSlider); // and $.when groups several Deferreds

    all.done(function () {
        initSlideShow();
    });
    all.fail(function () {
        alert("Some Error occured");
    });

    /*----------------------------------------------------*/
    /*	contact form
    ------------------------------------------------------*/

    $('form#contactForm button.submit').click(function () {

        $('#image-loader').fadeIn();

        var contactName = $('#contactForm #contactName').val();
        var contactEmail = $('#contactForm #contactEmail').val();
        var contactSubject = $('#contactForm #contactSubject').val();
        var contactMessage = $('#contactForm #contactMessage').val();

        var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
            '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

        $.ajax({

            type: "POST",
            url: "inc/sendEmail.php",
            data: data,
            success: function (msg) {

                // Message was sent
                if (msg == 'OK') {
                    $('#image-loader').fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }
                // There was an error
                else {
                    $('#image-loader').fadeOut();
                    $('#message-warning').html(msg);
                    $('#message-warning').fadeIn();
                }

            }

        });

        return false;

    });


});
function initSlideShow() {
    $('#intro-slider').flexslider({
        namespace: "flex-",
        controlsContainer: "",
        animation: 'fade',
        controlNav: false,
        directionNav: true,
        smoothHeight: true,
        slideshowSpeed: 7000,
        animationSpeed: 600,
        randomize: false,
    });
}







