(function ($) {
    $(function () {
        gsap.registerPlugin(ScrollTrigger);



        const lenis = new Lenis({
            duration: 3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical', // vertical, horizontal
            gestureDirection: 'vertical', // vertical, horizontal, both
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 4,
            infinite: false,
        })

        //get scroll value
        lenis.on('scroll', ({
            scroll,
            limit,
            velocity,
            direction,
            progress
        }) => {

        })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
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

        $(document).ready(function () {
            var counter = 0;
            var interval = setInterval(function () {
                var formattedCounter = ('000' + counter).slice(-3); // Format counter to always show three digits
                $('.preloader-text span').text(formattedCounter + '%');
                $('.preloader-container-progress span').css('width', counter + '%');
                counter++;
                if (counter > 100) {
                    clearInterval(interval);


                    setTimeout(function () {
                        $('body').addClass('loaded')
                        setTimeout(function () {
                            /*$('.preloader-wrap').remove()*/
                        }, 1000)
                    }, 2500)


                }
            }, 50); // Adjust the interval time as needed
        });


        if ($('.home-page').length) {

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

            // Preload all images before initializing the scroll handler
            preloadImages();

            // Create the ScrollTrigger
            ScrollTrigger.create({
                trigger: ".hero-main",
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


            $(document).ready(function () {

                $('.transition-column-top').each(function (index) {
                    $(this).css('transition-delay', (index * 0.1) + 's');
                })
                $('.transition-column-bottom').each(function (index) {
                    $(this).css('transition-delay', (index * 0.1) + 's');
                })

            });





            // Timeline for .our-team-wrap
            let tl1 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".our-team-wrap",
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
            }, ">");

            // Scroll and active link handling
            let links = $(".menu-scroller ul li a");

            links.each(function () {
                let $a = $(this);
                let element = $($a.attr("href"));

                ScrollTrigger.create({
                    trigger: element[0],
                    start: "top 20%",
                    end: "bottom center",
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

            $(window).on('load', function () {

                let tl3dToLogo = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".companies-wrap",
                        scrub: true,
                        start: "-100 90%",

                        onEnter: () => {
                            lenis.stop();
                            gsap.to(".transition-wrap", {
                                display: 'flex',
                                onComplete: function () {
                                    document.querySelector('.transition-wrap').classList.add('add-layer-transiton');
                                    setTimeout(function () {
                                        lenis.start();
                                        lenis.scrollTo('.companies-wrap', {
                                            offset: 100,
                                            duration: 0.5,
                                            easing: (t) => t, // Linear easing
                                            onComplete: function () {
                                                // Use a timeout to ensure the class removal happens after the scroll completes
                                                setTimeout(function () {
                                                    document.querySelector('.transition-wrap').classList.remove('add-layer-transiton');
                                                    ScrollTrigger.refresh(); // Ensure ScrollTrigger updates its calculations
                                                }, 500); // Adjust the delay as needed
                                            }
                                        });
                                    }, 1000);
                                }
                            });
                        },
                        onLeaveBack: () => {
                            /*  lenis.stop()*/
                            document.querySelector('.transition-wrap').classList.remove('add-layer-transiton');
                            setTimeout(function () {
                                gsap.to(".transition-wrap", {

                                    display: 'none',
                                })
                            }, 500)


                        }
                    }
                });


                var logoOffset = $('.companies-wrap').offset().top - $(window).outerHeight()
                $(window).on('scroll', function () {
                    console.log($(this).scrollTop())
                })
                console.log(logoOffset)
                let spacerFullHeight1 = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#client-logo-1",
                        scrub: true,
                        start: "-100 100%",

                        onEnter: () => {
                            document.querySelector('.transition-wrap').classList.remove('add-layer-transiton');
                            setTimeout(function () {
                                gsap.to(".transition-wrap", {

                                    display: 'none',
                                })
                                document.querySelectorAll('.companies-logo-wrap').forEach(logo => {
                                    logo.classList.add('start-clip-anim');
                                });
                                document.querySelectorAll('.companies-logo').forEach(logo => {
                                    const img = logo.querySelectorAll('.companies-logo-icon img')[0];
                                    if (img) {
                                        img.style.opacity = '1';
                                    }
                                });
                            }, 500)

                        },
                        onLeaveBack: () => {
                            lenis.stop()
                            gsap.to(".transition-wrap", {

                                display: 'flex',
                                onComplete: function () {
                                    document.querySelector('.transition-wrap').classList.add('add-layer-transiton');

                                    setTimeout(function () {
                                        lenis.start();
                                        lenis.scrollTo('.our-team-wrap', {
                                            offset: -100,
                                            duration: 0.5,
                                            easing: (t) => t, // Linear easing
                                            onComplete: function () {
                                                // Use a timeout to ensure the class removal happens after the scroll completes
                                                setTimeout(function () {
                                                    document.querySelector('.transition-wrap').classList.remove('add-layer-transiton');
                                                    ScrollTrigger.refresh(); // Ensure ScrollTrigger updates its calculations
                                                }, 500); // Adjust the delay as needed
                                            }
                                        });
                                    }, 1000);
                                }

                            })
                        }


                    }
                });

                gsap.registerPlugin(ScrollTrigger);

                function createLogoChangeAnimation(trigger, start, img1, img2) {
                    ScrollTrigger.create({
                        trigger: trigger,
                        start: start,
                        onEnter: () => {
                            gsap.to(img1, {
                                opacity: 0,
                                duration: 0.1
                            });
                            gsap.to(img2, {
                                opacity: 1,
                                duration: 0.1
                            });
                        },
                        onLeaveBack: () => {
                            gsap.to(img1, {
                                opacity: 1,
                                duration: 0.1
                            });
                            gsap.to(img2, {
                                opacity: 0,
                                duration: 0.1
                            });
                        }
                    });
                }

                // Desktop animation
                createLogoChangeAnimation("#client-logo-1", "10% 100%", ".companies-logo-icon img:nth-child(1)", ".companies-logo-icon img:nth-child(2)");

                // Mobile animation
                if ($(window).width() < 768) {
                    createLogoChangeAnimation("#client-logo-1", "25% 100%", ".companies-logo-icon img:nth-child(2)", ".companies-logo-icon img:nth-child(3)");
                }


            });

            let sectionInset = gsap.timeline({
                scrollTrigger: {
                    trigger: "#client-logo-1",
                    scrub: 1,
                    start: "20% 100%",
                    end: "70% 100%",
                }
            });

            sectionInset.to(".supply-chain-wrap", {
                top: 0,
                marginTop: 0,
                duration: 1,
            });

            let tlClip = gsap.timeline({
                scrollTrigger: {
                    trigger: "#client-logo-1",
                    scrub: true,
                    start: "70% 100%",
                    end: "110% 100%",

                }
            });

            tlClip.fromTo(".supply-chain-wrap", {
                    clipPath: "inset(50% 0 50% 0)",
                    duration: 0.1,
                }, {
                    clipPath: "inset(0% 0 0% 0)",
                    duration: 0.1,
                },
                ">"
            );

            tlClip.fromTo(".companies-bg", {
                    clipPath: "inset(0% 0 0% 0)",
                    duration: 0.1,
                }, {
                    clipPath: "inset(50% 0 50% 0)",
                    duration: 0.1,
                },
                ">"
            );







            let typeSplit = new SplitType('.after-clip-paragraph', {
                types: 'lines, words, char',
                tagName: 'span'
            });

            $('.after-clip-paragraph').each(function () {
                $(this).find('.word').each(function (index) {
                    $(this).css('transition-delay', (index * 0.03) + 's');
                })
            });

            $('.after-clip-paragraph').each(function () {
                let animParagraph = $(this);

                ScrollTrigger.create({
                    trigger: ".companies-wrap",
                    start: '70% 90%',


                    onEnter: function () {
                        gsap.to(animParagraph, {
                            className: 'after-clip-paragraph active-animation',
                            duration: 1,
                            ease: 'power1.inOut'
                        });
                    },
                    onLeaveBack: function () {
                        gsap.to(animParagraph, {
                            className: 'after-clip-paragraph',
                            duration: 1,
                            ease: 'power1.inOut'
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

                // Link timelines to scroll position
                function createScrollTrigger(triggerElement, timeline) {
                    // Reset tl when scroll out of view past bottom of screen
                    ScrollTrigger.create({
                        trigger: ".companies-wrap",
                        start: "70% 90%",
                        onLeaveBack: () => {
                            timeline.progress(0);
                            timeline.pause();
                        }
                    });
                    // Play tl when scrolled into view (60% from top of screen)
                    ScrollTrigger.create({
                        trigger: ".companies-wrap",
                        start: "70% 90%",
                        onEnter: () => timeline.play()
                    });
                }

                $(".after-clip-heading").each(function (index) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: ".companies-wrap",
                            start: "70% 90%",
                            end: "80% 50%",
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


        } else if ($('.about-page').length) {
            $(document).ready(function () {
                var $teamComponents = $('.team-component');
                var $teamContents = $('.team-content');
                var hasAnimated = false; // To ensure animation runs only once

                // Function to shuffle the team components
                function shuffleArray(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                }

                // Function to show cards in chaotic order
                function showCards() {
                    var $shuffledComponents = $(shuffleArray($teamComponents.toArray()));
                    $shuffledComponents.each(function (index) {
                        $(this).delay(index * 300).queue(function (next) {
                            $(this).addClass('show');
                            next();
                        });
                    });
                }

                // Function to show typing effect on text
                function showTypingEffect() {
                    setTimeout(function () {
                        $teamContents.addClass('show');
                    }, $teamComponents.length * 300); // Adjust delay based on the total animation time
                }

                // Function to handle animation when element is in view
                function handleAnimation() {
                    if (hasAnimated) return; // Prevent re-triggering animations
                    showCards();
                    showTypingEffect();
                    hasAnimated = true; // Set flag to prevent re-triggering
                }

                // Set up IntersectionObserver
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            handleAnimation();
                        } else {
                            // Remove the animation classes when the element leaves the viewport
                            $teamComponents.removeClass('show');
                            $teamContents.removeClass('show');
                            hasAnimated = false; // Reset flag to allow re-triggering
                        }
                    });
                }, {
                    threshold: 0.1
                }); // Adjust threshold if necessary

                // Observe the team-component-wrap
                observer.observe(document.querySelector('.team-component-wrap'));

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
                var $teamComponents = $('.team-component');
                var $teamContents = $('.team-content');
                var hasAnimated = false; // To ensure animation runs only once

                // Function to shuffle the team components
                function shuffleArray(array) {
                    for (var i = array.length - 1; i > 0; i--) {
                        var j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                }
                // Function to show cards in chaotic order
                function showCards() {
                    var $shuffledComponents = $(shuffleArray($teamComponents.toArray()));
                    $shuffledComponents.each(function (index) {
                        $(this).delay(index * 300).queue(function (next) {
                            $(this).addClass('show');
                            next();
                        });
                    });
                }
                // Function to show typing effect on text
                function showTypingEffect() {
                    setTimeout(function () {
                        $teamContents.addClass('show');
                    }, $teamComponents.length * 300); // Adjust delay based on the total animation time
                }
                // Function to handle animation when element is in view
                function handleAnimation() {
                    if (hasAnimated) return; // Prevent re-triggering animations
                    showCards();
                    showTypingEffect();
                    hasAnimated = true; // Set flag to prevent re-triggering
                }
                // Set up IntersectionObserver
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            handleAnimation();
                            observer.unobserve(entry.target); // Stop observing once animated
                        }
                    });
                }, {
                    threshold: 0.1
                }); // Adjust threshold if necessary
                // Observe the team-component-wrap
                observer.observe(document.querySelector('.team-component-wrap'));
            });

            let tlBgAlpha = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-hero-main",
                    start: "65% 90%",
                    end: "90% bottom",
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


            let tlMarsAlpha = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-space-wrap",
                    start: "70% 90%",
                    end: "90% bottom",
                    scrub: 1,
                }
            });




            tlMarsAlpha.fromTo($('.about-space-wrap, .results-line-group-wrap, .potential-headwinds-thumb'), {
                opacity: 1,
                duration: 1,
            }, {
                opacity: 0,
                duration: 1,
            }, ">");


            let tlMoonMove = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-space-wrap",
                    start: "10% 90%",
                    end: "60% bottom",
                    scrub: 1,
                }
            });

            tlMoonMove.fromTo($('.about-space-moon'), {

                yPercent: -200,
                xPercent: -460,
                duration: 1,
            }, {
                yPercent: 0,
                xPercent: 0,
                duration: 1,
            }, ">");




            let tlLunarMove = gsap.timeline({
                scrollTrigger: {
                    trigger: ".potential-headwinds-wrap",
                    start: "10% 90%",
                    end: "70% bottom",
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



            tlMoonMove.to($('.potential-headwinds-thumb'), {
                scale: 0.5,
                duration: 1,
            }, ">");




            let videoClipPath = gsap.timeline({
                scrollTrigger: {
                    trigger: ".leadership-roles-wrap",
                    start: "30% 100%",
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