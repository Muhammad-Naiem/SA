(function ($) {
    $(function () {


        //        $('.menu-scroller ul li').each(function () {
        //            var $this = $(this);
        //            var dynamicWidth = $this.find('span').width()
        //
        //            console.log(dynamicWidth)
        //            $(':root').css('--dynamic-width', dynamicWidth);
        //        })

        
        $(document).ready(function () {
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('win') !== -1) {
                $('body').addClass('win-os');
            } else if (userAgent.indexOf('mac') !== -1) {
                $('body').addClass('mac-os');
            }
        });


        if($('.home-page').length){

        // 3D modal
        const $model3D = $(".engine-3D-img");
        const startFrame = 0;
        const endFrame = 150;
        const images = [];

        // Function to preload all images
        function preloadImages() {
            for (let i = startFrame; i <= endFrame; i++) {
                const img = new Image();
                img.src = `imgs/3d/render_${i.toString().padStart(5, '0')}.webp`;
                images.push(img);
            }
        }

        // Function to update the frame
        function updateFrame() {
            let currentFrame = Math.floor($(window).scrollTop() / 25);
            currentFrame = Math.max(startFrame, Math.min(currentFrame, endFrame));
            $model3D.attr("src", images[currentFrame].src); // Use preloaded images
        }

        // Preload all images before initializing the scroll handler
        preloadImages();

        // Add scroll event handler
        $(window).on("scroll", updateFrame);

        // Call the function to set the initial frame
        updateFrame();


        gsap.registerPlugin(ScrollTrigger);

        let tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-5",
                scrub: 1,
                start: 'top bottom',
                end: 'bottom bottom',
            }
        });

        tl1.fromTo($('.bg-radial-gradient-wrap'), {
                opacity: 0,
                duration: 2,
            }, {
                opacity: 1,
                duration: 2,
            },
            ">"
        )



        $(document).ready(function () {
            $('.menu-scroller ul li a[href*="#"]').bind('click', function (e) {
                e.preventDefault(); // prevent hard jump, the default behavior

                var target = $(this).attr("href"); // Set the target as variable

                // perform animated scrolling by getting top-position of target-element and set it as scroll target
                $('html, body').stop().animate({
                    scrollTop: $(target).offset().top
                }, 600, function () {
                    location.hash = target; //attach the hash (#jumptarget) to the pageurl
                });

                return false;
            });
        });




        $(document).ready(function () {
            function updateHeroImagesHeight() {
                var heroContentHeight = $('.section-hero-content').outerHeight();
                $('.section-hero-images').css('height', heroContentHeight + 'px');
            }

            // Update height on document ready
            updateHeroImagesHeight();

            // Update height on window resize
            $(window).resize(function () {
                updateHeroImagesHeight();
            });
        });

        $(document).ready(function () {
            var windowHeight = $(window).outerHeight();
            var threshold = windowHeight * 0.7;
            var currentActiveIndex = -1;

            console.log(windowHeight);

            $(window).scroll(_.debounce(function () {
                var scrollDistance = $(window).scrollTop();

                // Assign active class to nav links while scrolling
                $('.page-section').each(function (i) {
                    if (($(this).position().top - threshold) <= scrollDistance) {
                        if (currentActiveIndex !== i) {
                            $('.menu-scroller ul li.bullet-active').removeClass('bullet-active');
                            $('.menu-scroller ul li').eq(i).addClass('bullet-active');
                            currentActiveIndex = i;
                        }
                    }
                });
            }, 100)); // Adjust the throttle delay as needed
        });

        }

        
        $(document).ready(function () {
            var counter = 0;
            var interval = setInterval(function () {
                var formattedCounter = ('000' + counter).slice(-3); // Format counter to always show three digits
                $('.preloader-text span').text(formattedCounter + '%');
                $('.preloader-container-progress span').css('width', counter + '%');
                counter++;
                if (counter > 100) {
                    clearInterval(interval);
                    
                    
                    setTimeout(function(){
                        $('body').addClass('loaded')
                        setTimeout(function(){
                            /*$('.preloader-wrap').remove()*/
                        }, 1000)
                    }, 2500)
                    
                    
                }
            }, 50); // Adjust the interval time as needed
        });



      


    })

})(jQuery)