(function ($) {
    $(function () {
        gsap.registerPlugin(ScrollTrigger);
        
  


        $(window).on('scroll', function(){
            var scrollY = $(this).scrollTop();

            if(scrollY > 150){
                $('header.header-wrap').addClass('headroom--not-top')
            }else{
                $('header.header-wrap').removeClass('headroom--not-top')
            }

        })

        // Function to detect if the user is on a mobile device
        function isMobile() {
            return /Mobi|Android/i.test(navigator.userAgent);
        }

        // Initialize Lenis with different configurations based on the device type
        const lenis = new Lenis({
            duration: isMobile() ? 0 : 3, // No smooth scrolling on mobile
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical', // vertical, horizontal
            gestureDirection: 'vertical', // vertical, horizontal, both
            smooth: !isMobile(), // Smooth scrolling only on desktop
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 4,
            infinite: false,
        });

        // Get scroll value
        lenis.on('scroll', ({
            scroll,
            limit,
            velocity,
            direction,
            progress
        }) => {
            
        });

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf);





        $(document).ready(function () {
            var userAgent = navigator.userAgent.toLowerCase();
            if (userAgent.indexOf('win') !== -1) {
                $('body').addClass('win-os');
            } else if (userAgent.indexOf('mac') !== -1) {
                $('body').addClass('mac-os');
            }
        });


        if ($('.has-sticky-parent').length) {

            function heroBottomHeight() {
                $('.has-sticky-parent').each(function () {
                    var $this = $(this);
                    var winH = 67.5;
                    var stickySections = $this.find('.has-sticky').attr('data-speed')

                    $this.height((winH * stickySections) + "em")
                })

            }
            // Update height on document ready
            heroBottomHeight();

            // Update height on window resize
            $(window).resize(function () {
                heroBottomHeight();
            });
        }


        if ($('.home-page').length) {


            $('.hero-text-block').each(function(){
                var $this = $(this);

                if($this.find('.hero-model-heading-bottom').length){
                    $this.addClass('has-double-heading')
                }

            })

            gsap.registerPlugin(ScrollTrigger);

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

            $(document).ready(function () {
                function adjustHeroBg1() {
                    var aboutH1 = $('.section-hero').outerHeight();
                    var wH1 = $(window).outerHeight();
                    var totalT1 = aboutH1 - wH1;
                    $('.section-hero').css('top', -totalT1);
                    
                }

                // Initial adjustment
                adjustHeroBg1();

                // Adjust on window resize
                $(window).on('resize', function () {
                    adjustHeroBg1();
                });
            });


            // Preload all images before initializing the scroll handler
            preloadImages();

            // Set the initial image source to the first preloaded image
            $model3D.attr("src", images[startFrame].src);

            // Create the ScrollTrigger
            ScrollTrigger.create({
                trigger: ".section-hero",
                start: "top top",
                end: "98% bottom",
                scrub: true,
                onUpdate: self => {
                    let scrollProgress = self.progress;
                    let currentFrame = Math.floor(scrollProgress * (endFrame - startFrame));
                    currentFrame = Math.max(startFrame, Math.min(currentFrame, endFrame));
                    $model3D.attr("src", images[currentFrame].src); // Use preloaded images
                }
            });

            function initializeCustomAnimations() {
                // Select the specific elements
                let element = $('.animated-heading-opacity');
                let headingAnim = element.find('.heading-anim-opacity');

                // Split the text into lines and words
                let typeSplit = new SplitType(headingAnim, {
                    types: 'lines, words',
                    tagName: 'span'
                });

                // Duplicate the inner h2 tag of .custom-animated-heading and add a class name custom-animated-lizard
                var heading2 = headingAnim.clone().addClass('animated-lizard');
                element.append(heading2);

                // Store each word in a span tag with the class name anim-word within an array and remove the texts/words from .word class
                var wordsArray = [];
                element.find('.animated-lizard .word').each(function () {
                    var $this = $(this);
                    var eachWord = $this.text();
                    wordsArray.push('<span class="anim-word">' + eachWord + '</span>');
                    $this.text(''); // Clear the .word text
                });

                function setWordWidths() {
                    element.find('.animated-lizard .word').each(function (wordIndex) {
                        var $this = $(this);
                        var originalWord = element.find('.heading-anim-opacity .word').eq(wordIndex);
                        var wordWidth = originalWord.outerWidth();
                        $this.css('width', wordWidth);
                    });
                }

                setWordWidths(); // Set initial widths

                $(window).resize(function () {
                    setWordWidths(); // Adjust widths on window resize
                });

                function animateWords() {
                    element.find('.animated-lizard .word').each(function (wordIndex) {
                        var $this = $(this);
                        var animWord = wordsArray[wordIndex];

                        setTimeout(function () {
                            $this.html(animWord);
                            gsap.fromTo($this.find('.anim-word'), {
                                color: "#DC4444"
                            }, {
                                color: "#ffffff",
                                duration: 0.7,
                                ease: "power3.inOut",
                            });
                        }, 100 * wordIndex);
                    });
                }

                // Create ScrollTrigger instances
                ScrollTrigger.create({
                    trigger: element,
                    start: "top 5%", // Adjust the start position as needed
                    onEnter: function () {
                        setTimeout(function () {
                            animateWords();
                        }, 500); // Add a 1-second delay before starting the animation
                    },
                    onLeaveBack: function () {
                        // Reset the animation
                        element.find('.animated-lizard .word').each(function () {
                            $(this).text(''); // Clear the .word text
                        });
                    }
                });
            }

            // Call the function to initialize animations
            initializeCustomAnimations();



            // Timeline for .our-team-wrap
            let nextSection = gsap.timeline({
                scrollTrigger: {
                    trigger: ".next-section-trigger",
                    scrub: 1,
                    start: '50% bottom',
                    end: '80% 80%',

                }
            });

            let nextSection1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".companies-wrap",
                    scrub: 1,
                    start: 'top top',
                    end: '20% center',
                }
            });

            nextSection.fromTo($('.section-hero'), {
                opacity: 1,
                duration: 0.5,
            }, {
                opacity: 0,
                duration: 0.5,
            }, "<")

            nextSection1.fromTo($('.companies-wrap'), {
                opacity: 0,
                duration: 0.5,
            }, {
                opacity: 1,
                duration: 0.5,
            }, "<")


            // Timeline for .our-team-wrap
            let tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".block-trigger-alpha",
                    scrub: 1,
                    start: 'top bottom',
                    end: 'center bottom',
                }
            });

            tl1.fromTo($('.bg-radial-gradient-wrap'), {
                opacity: 0,
                duration: 2,
            }, {
                opacity: 1,
                duration: 2,
            }, ">");

            tl1.fromTo($('.hero-bg'), {
                opacity: 1,
                duration: 2,
            }, {
                opacity: 0,
                duration: 2,
            }, ">");

            // Scroll and active link handling
            let links = $(".menu-scroller ul li a");

            links.each(function () {
                let $a = $(this);
                let element = $($a.attr("href"));

                ScrollTrigger.create({
                    trigger: element[0],
                    start: "top 70%",
                    end: "bottom 70%",
                    onToggle: function (self) {
                        if (self.isActive) {
                            setActive($a);
                        }
                    }
                });

                $a.on("click", function (e) {
                    e.preventDefault();
                    lenis.scrollTo(element[0], {
                        duration: 1,
                        easing: (t) => t, // Linear easing
                        onComplete: function () {
                            ScrollTrigger.refresh(); // Ensure ScrollTrigger updates its calculations
                        }
                    });
                });
            });

            function setActive(link) {
                links.parent('li').removeClass("bullet-active");
                link.parent('li').addClass("bullet-active");
            }

            ScrollTrigger.create({
                trigger: ".supply-chain-wrap",
                start: "130% 100%",
                toggleActions: "play none none reverse",
                onEnter: function () {
                    const video = document.querySelector('.video-trigger');
                    video.currentTime = 0; // Reset video to start
                    video.play();
                    
                },
                onLeaveBack: function () {
                    const video = document.querySelector('.video-trigger');
                    video.pause();
                    
                }
            });


                        let tlClip = gsap.timeline({
                            scrollTrigger: {
                                trigger: ".supply-chain-wrap",
                                start: "130% 100%",
                                toggleActions: "play none none reverse",
            
                            }
                        });
            
                        tlClip.fromTo(".supply-chain-wrap", {
                                clipPath: "inset(50% 0 50% 0)",
                                duration: 1,
                                onComplete: function () {
                                    document.querySelector('.video-trigger').pause();
                                    
                                }
                            }, {
                                clipPath: "inset(0% 0 0% 0)",
                                duration: 1,
                                onComplete: function () {
                                    document.querySelector('.video-trigger').play();
                                    
                                }
                            },
                            ">"
                        );

            let typeSplit = new SplitType('.after-clip-paragraph', {
                types: 'lines, words, char',
                tagName: 'span'
            });



            $('.after-clip-paragraph').each(function () {
                let animParagraph = $(this);

                ScrollTrigger.create({
                    trigger: ".companies-wrap",
                    start: '70% 90%',


                    onEnter: function () {
                        $('.after-clip-paragraph').each(function () {
                            $(this).find('.word').each(function (index) {
                                $(this).css('transition-delay', (index * 0.03) + 's');
                            })
                        });
                        gsap.to(animParagraph, {
                            className: 'after-clip-paragraph active-animation',
                            duration: 1,
                            ease: 'power1.inOut',
                        });
                    },
                    onLeaveBack: function () {
                        $('.after-clip-paragraph').each(function () {
                            $(this).find('.word').each(function (index) {
                                $(this).css('transition-delay', (index * 0) + 's');
                            })
                        });
                        gsap.to(animParagraph, {
                            className: 'after-clip-paragraph',
                            duration: 1,
                            ease: 'power1.inOut',

                        });
                    }
                });


            })


            $(document).ready(function () {
                // Split text into spans
                let typeSplit = new SplitType(".after-clip-heading", {
                    types: "words, chars",
                    tagName: "span"
                });


                if ($(window).width() > 768) {
                    var yStart = "150% 100%";
                    var yEnd = "200% 100%";
                } else {
                    var yStart = "200% 100%";
                    var yEnd = "250% 100%";
                }

                // Link timelines to scroll position
                function createScrollTrigger(triggerElement, timeline) {
                    // Reset tl when scroll out of view past bottom of screen
                    ScrollTrigger.create({
                        trigger: ".supply-chain-wrap",
                        start: "50% 90%",

                        onLeaveBack: () => {
                            timeline.progress(0);
                            timeline.pause();
                        }
                    });
                    // Play tl when scrolled into view (60% from top of screen)
                    ScrollTrigger.create({
                        trigger: ".supply-chain-wrap",
                        start: yStart,

                        onEnter: () => timeline.play()
                    });
                }

                $(".after-clip-heading").each(function (index) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".supply-chain-wrap",
                            start: yStart,
                            end: yEnd,
                            scrub: true,

                        }
                    });
                    tl.from($(this).find(".word"), {
                        opacity: 0.2,
                        duration: 0.2,
                        ease: "power1.out",
                        stagger: {
                            each: 0.2
                        }
                    });
                });

                // Avoid flash of unstyled content
                gsap.set(".after-clip-heading", {
                    opacity: 1
                });
            });


            $(document).ready(function () {
                function updateHeroImagesHeight() {
                    var heroContentHeight = $('.hero-text-content').outerHeight();
                    $('.section-hero-images').css('height', heroContentHeight + 'px');
                }

                // Update height on document ready
                updateHeroImagesHeight();

                // Update height on window resize
                $(window).resize(function () {
                    updateHeroImagesHeight();
                });
            });

            $('.services-item').each(function () {
                var $this = $(this);
                $this.find('svg').each(function () {
                    $(this).find('line').each(function (index) {
                        $(this).css('animation-delay', (index * 0.4) + 's');
                    })

                })
                $this.find('svg').each(function () {
                    $(this).find('circle').each(function (index) {
                        $(this).css('animation-delay', (index * 0.4) + 's');
                    })

                })

            })

            $('.our-pertner-logo').each(function (index) {
                $(this).css('animation-delay', (index * 0.25) + 's');
            })


        } else if ($('.about-page').length) {
            $(document).ready(function () {
                function adjustHeroBg1() {
                    var aboutH1 = $('.about-space-thumb').outerHeight();
                    var wH1 = $(window).outerHeight();
                    var totalT1 = aboutH1 - wH1;
                    $('.about-space-thumb').css('top', -totalT1);
                   
                }

                // Initial adjustment
                adjustHeroBg1();

                // Adjust on window resize
                $(window).on('resize', function () {
                    adjustHeroBg1();
                });
            });


            $(document).ready(function () {
                function countDecimals(val) {
                    if (Math.floor(val) === val) return 0;
                    return val.toString().split(".")[1].length || 0;
                }

                function formatNumber(val, decimals) {
                    return val.toLocaleString("en-US", {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals
                    });
                }

                function easeOutQuint(x) {
                    return 1 - Math.pow(1 - x, 5);
                }

                function iterateValue($el, end, decimals) {
                    const start = 0;
                    const duration = 2500;
                    let startTimestamp = null;

                    function step(timestamp) {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const elapsedPercent = (timestamp - startTimestamp) / duration;
                        const easedProgress = Math.min(easeOutQuint(elapsedPercent), 1);
                        let interimNumber = Math.abs(easedProgress * (end - start) + start);
                        $el.text(formatNumber(interimNumber, decimals));
                        if (easedProgress < 1) {
                            window.requestAnimationFrame(step);
                        }
                    }
                    window.requestAnimationFrame(step);
                }

                function initCountUp() {
                    $('[data-countup-number]').each(function () {
                        const $el = $(this);
                        const end = parseFloat($el.data('countup-number').toString().replace(/,/g, ""));
                        const decimals = countDecimals(end);
                        const observerOptions = {
                            root: null,
                            rootMargin: "0px",
                            threshold: 0.2
                        };
                        const observer = new IntersectionObserver(function (entries) {
                            entries.forEach(function (entry) {
                                if (entry.isIntersecting) {
                                    iterateValue($el, end, decimals);
                                } else {
                                    $el.text('0');
                                }
                            });
                        }, observerOptions);
                        observer.observe(this);
                    });
                }
                initCountUp();
            });



            // Start Team Shown

            $(document).ready(function () {
                let typeSplit = new SplitType('.anim-paragraph-delay', {
                    types: 'lines, words, chars',
                    tagName: 'span'
                });

                function setTransitionDelay(selector, delay) {
                    $(selector).each(function () {
                        $(this).find('.word').each(function (index) {
                            $(this).css('transition-delay', (index * delay) + 's');
                        });
                    });
                }

                var $animationElements = $('.team-component');
                var $window = $(window);

                function checkIfInView() {
                    var windowHeight = $window.height() / 1.2;
                    var windowTopPosition = $window.scrollTop();
                    var windowBottomPosition = (windowTopPosition + windowHeight);

                    $animationElements.each(function () {
                        var $element = $(this);
                        var elementTopPosition = $element.offset().top;
                        var elementBottomPosition = (elementTopPosition + $element.outerHeight());

                        if (elementTopPosition <= windowBottomPosition) {
                            setTransitionDelay('.anim-paragraph-delay', 0.03);
                            $element.addClass('show');
                        } else {
                            setTransitionDelay('.anim-paragraph-delay', 0);
                            $element.removeClass('show');
                        }
                    });

                    if ($window.width() > 768) {
                        if ($animationElements.length === $('.team-component.show').length) {
                            $('.team-content .anim-paragraph-delay').addClass('active-animations');
                        } else {
                            $('.team-content .anim-paragraph-delay').removeClass('active-animations');
                        }
                    }
                }

                function checkIfNewInView() {
                    var windowHeight = $window.height() / 1.2;
                    var windowTopPosition = $window.scrollTop();
                    var windowBottomPosition = (windowTopPosition + windowHeight);

                    $('.anim-paragraph-delay').each(function () {
                        var $element = $(this);
                        var elementTopPosition = $element.offset().top;
                        var elementBottomPosition = (elementTopPosition + $element.outerHeight());

                        if (elementTopPosition <= windowBottomPosition) {
                            $element.addClass('active-animations');
                            setTransitionDelay('.anim-paragraph-delay', 0.03);
                        } else {
                            $element.removeClass('active-animations');
                            setTransitionDelay('.anim-paragraph-delay', 0);
                        }
                    });
                }

                $window.on('scroll resize', checkIfInView);
                $window.trigger('scroll');

                if ($window.width() < 769) {
                    $window.on('scroll resize', checkIfNewInView);
                    $window.trigger('scroll');
                }
            });

            let tlBgAlpha = gsap.timeline({
                scrollTrigger: {
                    trigger: ".blank-trigger",
                    start: "40% 90%",
                    end: "80% bottom",
                    scrub: 1,


                }
            });

            tlBgAlpha.fromTo($('.about-hero-main-bg, .about-hero-main-line, .about-hero-line-group, .about-hero-thumb'), {
                opacity: 1,
                duration: 1,
            }, {
                opacity: 0,
                duration: 1,
            }, ">");



            let aboutFadein = gsap.timeline({
                scrollTrigger: {
                    trigger: ".blank-trigger",
                    start: "90% 90%",
                    end: "120% bottom",
                    scrub: 1,


                }
            });

            aboutFadein.to($('.about-us-wrap'), {
                opacity: 1,
                duration: 1,
            })


            let textSlidein = gsap.timeline({
                scrollTrigger: {
                    trigger: ".potential-sticky",
                    start: "100% 90%",
                    end: "150% bottom",
                    scrub: 1,

                }
            });

            textSlidein.fromTo($('.potential-headwinds-title p'), {
                y: "30em",
                duration: 1,
            }, {
                y: "0em",
                duration: 1,
            }, ">");





            $(document).ready(function () {
                gsap.registerPlugin(ScrollTrigger);

                let customTypeSplit = new SplitType('.anim-paragraph-alone', {
                    types: 'lines, words, chars',
                    tagName: 'span'
                });




                $(window).on('load', function () {
                    setTimeout(function () {
                        $('.anim-paragraph-alone').each(function () {
                            let customAnimParagraph = $(this);

                            ScrollTrigger.create({
                                trigger: customAnimParagraph,
                                start: 'top 40%',
                                onEnter: function () {
                                    $('.anim-paragraph-alone').each(function () {
                                        $(this).find('.word').each(function (index) {
                                            $(this).css('transition-delay', (index * 0.015) + 's');
                                        });
                                    });
                                    gsap.to(customAnimParagraph, {
                                        className: 'anim-paragraph-alone active-custom-animation',
                                        duration: 1,
                                        ease: 'power1.inOut',

                                    });
                                },
                                onLeaveBack: function () {
                                    $('.anim-paragraph-alone').each(function () {
                                        $(this).find('.word').each(function (index) {
                                            $(this).css('transition-delay', (index * 0) + 's');
                                        });
                                    });
                                    gsap.to(customAnimParagraph, {
                                        className: 'anim-paragraph-alone',
                                        duration: 1,
                                        ease: 'power1.inOut'
                                    });
                                }
                            });
                        });
                    }, 2000);
                });
            });



          

            let tlMarsAlpha = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-space-wrap",
                    start: "70% 90%",
                    end: "90% bottom",
                    
                    scrub: 1,
                }
            });


            tlMarsAlpha.fromTo($('.about-space-wrap, .results-line-group-wrap, .potential-headwinds-thumb, .bg-mobi'), {
                opacity: 1,
                duration: 1,
            }, {
                opacity: 0,
                duration: 1,
            }, ">");




            $(document).ready(function () {
                function adjustHeroBg() {
                    var aboutH = $('.about-hero-main-bg').height();
                    var wH = $(window).height();
                    var totalT = aboutH - wH;
                    $('.about-hero-main-bg').css('top', -totalT);
                }

                // Initial adjustment
                adjustHeroBg();

                // Adjust on window resize
                $(window).on('resize', function () {
                    adjustHeroBg();
                });
            });


            let tlMoonMove = gsap.timeline({
scrollTrigger: {
trigger: ".about-space-thumb",
start: "0% 100%",
end: "90% 50%",
scrub: 1,

}
});

function updateDimensions() {
var wh = $(window).height();
var objH = $('.about-space-thumb').height();
var totalD = objH - wh;
console.log(totalD);

// Update the properties of the existing timeline
tlMoonMove.clear();

tlMoonMove.fromTo($('.about-space-moon'), {
scale: 0.5,
duration: 1,
}, {
scale: 1,
duration: 1,
}, ">");

tlMoonMove.to($('.potential-headwinds-thumb'), {
scale: 0.5,
y: -(totalD / 2),
duration: 1,
}, "<");
}

// Initial calculation
updateDimensions();

// Recalculate on window resize
$(window).resize(updateDimensions);



            let tlLunarMove = gsap.timeline({
                scrollTrigger: {
                    trigger: ".potential-sticky",
                    start: "50% 100%",
                    end: "100% bottom",
                    scrub: 1,

                }
            });

            tlLunarMove.fromTo($('.potential-headwinds-thumb'), {

                scale: 0,
                duration: 1,
            }, {
                scale: 1,
                duration: 1,
            }, ">");






            let videoClipPath = gsap.timeline({
                scrollTrigger: {
                    trigger: ".leadership-roles-wrap",
                    start: "10% 100%",
                    end: "70% bottom",
                    scrub: 1,
                }
            });

            videoClipPath.fromTo($('.leadership-roles-video'), {
                rotate: 5,
                clipPath: "polygon(25% 35%, 72% 51%, 60% 78%, 18% 77%)",
                duration: 1,
            }, {
                rotate: 0,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
            }, ">");



        }



        var $animation_elements = $('.svg-line, .draw-svg');
        var $window = $(window);

        function check_if_in_view() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);

            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if (element_top_position <= window_bottom_position) {
                    $element.addClass('draw-line-animation');
                } else {
                    $element.removeClass('draw-line-animation');
                }
            });
        }

        $window.on('scroll resize', check_if_in_view);
        $window.trigger('scroll');


        // Timeline for footer heading
        let tlCircle = gsap.timeline({
            scrollTrigger: {
                trigger: ".footer-heading",
                start: "top 80%",
                toggleActions: "play none none reset"
            }
        });

        tlCircle.fromTo($('.footer-logo-circle'), {
            clipPath: "circle(0% at 50% 50%)",
            duration: 1,
            delay: 1,
        }, {
            clipPath: "circle(100% at 50% 50%)",
            duration: 1,
            delay: 1,
        }, ">");
        $(document).ready(function () {


            // Splits text into words and characters
            const text = new SplitType(".footer-heading", {
                types: "chars"
            });

            gsap.set(".footer-heading", {
                autoAlpha: 1
            }); // prevents flash of unstyled content
            gsap.set(text.chars, {
                y: "-100%" // set initial state to translateY(-100%)
            });

            // Page Load Animation
            const initialAnimation = gsap.to(text.chars, {
                y: "-100%", // animate to translateY(0)
                ease: "sine.out",
                stagger: {
                    from: "center",
                    amount: 0.5,
                    ease: "power1.out"
                },
                onComplete: activateScrollTrigger // Activate ScrollTrigger after initial animation
            });

            // User Scroll Animation
            function activateScrollTrigger() {
                gsap.to(text.chars, {
                    y: "0%", // animate to translateY(0)
                    stagger: {
                        from: "left",
                        amount: 0.5
                    },
                    scrollTrigger: {
                        trigger: ".footer-heading",
                        start: "top 80%", // Adjusted start value
                        toggleActions: "play none none reset" // Play animation on enter, reset on leave
                    }
                });
            }
        });


    })

})(jQuery)
