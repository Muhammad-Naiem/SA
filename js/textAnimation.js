(function ($) {
    $(function () {
        // $(window).on('load', function () {
        //     var counter = 0;
        //     var interval = setInterval(function () {
        //         var formattedCounter = ('000' + counter).slice(-3); // Format counter to always show three digits
        //         $('.preloader-text span').text(formattedCounter + '%');
        //         $('.preloader-container-progress span').css('width', counter + '%');
        //         counter++;
        //         if (counter > 100) {
        //             clearInterval(interval);

        //             setTimeout(function () {
        //                 $('body').addClass('loaded');
        //                 setTimeout(function () {
        //                     // Initialize animations for all .animated-heading elements
        //                     initializeAnimations();
        //                 }, 100);
        //             }, 1000);
        //         }
        //     }, 50); // Adjust the interval time as needed

        //     // Register the ScrollTrigger plugin
        //     gsap.registerPlugin(ScrollTrigger);

        //     // Function to initialize SplitType and create animations for each .animated-heading
        //     function initializeAnimations() {
        //         $('.animated-heading').each(function (index, element) {
        //             // Split the text into lines and words
        //             let typeSplit = new SplitType($(element).find('.heading-anim'), {
        //                 types: 'lines, words',
        //                 tagName: 'span'
        //             });

        //             // Duplicate the inner h2 tag of .animated-heading and add a class name animated-lizard
        //             var heading2 = $(element).find('.heading-anim').clone().addClass('animated-lizard');
        //             $(element).append(heading2);

        //             // Store each word in a span tag with the class name anim-word within an array and remove the texts/words from .word class
        //             var wordsArray = [];
        //             $(element).find('.animated-lizard .word').each(function () {
        //                 var $this = $(this);
        //                 var eachWord = $this.text();
        //                 wordsArray.push('<span class="anim-word">' + eachWord + '</span>');
        //                 $this.text(''); // Clear the .word text
        //             });

        //             function setWordWidths() {
        //                 $(element).find('.animated-lizard .word').each(function (wordIndex) {
        //                     var $this = $(this);
        //                     var originalWord = $(element).find('.heading-anim .word').eq(wordIndex);
        //                     var wordWidth = originalWord.outerWidth();
        //                     $this.css('width', wordWidth);
        //                 });
        //             }

        //             setWordWidths(); // Set initial widths

        //             $(window).resize(function () {
        //                 setWordWidths(); // Adjust widths on window resize
        //             });

        //             setTimeout(function () {
        //                 // Function to add markup with transition using GSAP and ScrollTrigger
        //                 function animateWords() {
        //                     $(element).find('.animated-lizard .word').each(function (wordIndex) {
        //                         var $this = $(this);
        //                         var animWord = wordsArray[wordIndex];

        //                         setTimeout(function () {
        //                             $this.html(animWord);
        //                             gsap.fromTo($this.find('.anim-word'), {
        //                                 color: "#DC4444"
        //                             }, {
        //                                 color: "#ffffff",
        //                                 duration: 0.7,
        //                                 ease: "power3.inOut",
        //                             });
        //                         }, 100 * wordIndex);
        //                     });
        //                 }

        //                 // Create ScrollTrigger instances
        //                 ScrollTrigger.create({
        //                     trigger: element,
        //                     start: "top 97%", // Adjust the start position as needed
        //                     onEnter: function () {
        //                         setTimeout(function () {
        //                             animateWords();
        //                         }, 500); // Add a 1-second delay before starting the animation
        //                     },
        //                     onLeaveBack: function () {
        //                         // Reset the animation
        //                         $(element).find('.animated-lizard .word').each(function () {
        //                             $(this).text(''); // Clear the .word text
        //                         });
        //                     }
        //                 });
        //             }, 100);
        //         });
        //     }
        // });

        // function countDecimals(value) {
        //     if (Math.floor(value) === value) return 0;
        //     return value.toString().split(".")[1].length || 0;
        // }

        // function updateValue($element, finalValue, decimalPlaces) {
        //     $({
        //         countNum: 0
        //     }).animate({
        //         countNum: finalValue
        //     }, {
        //         duration: 3000,
        //         easing: 'swing',
        //         step: function () {
        //             $element.text(('000' + this.countNum.toFixed(decimalPlaces)).slice(-3) + '%');
        //         },
        //         complete: function () {
        //             $element.text(('000' + finalValue.toFixed(decimalPlaces)).slice(-3) + '%');
        //         }
        //     });
        // }

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


        lenis.stop()

        $(window).on('load', function () {
            if ($('.home-page').length) {
                console.log("Initializing preloader");
                initializePreloader();
            } else {
                console.log("Initializing animations");
                initializeAnimations(); // Initialize heading animations immediately on other pages
                $('html').addClass('loaded')
            }
        });
        function initializePreloader() {
            console.log("Preloader started");
            var counter = 0;
            var interval = setInterval(function () {
                var formattedCounter = ('000' + counter).slice(-3); // Format counter to always show three digits
                $('.preloader-text span').text(formattedCounter + '%');
                $('.preloader-container-progress span').css('width', counter + '%');
                counter++;
                if (counter > 100) {
                    clearInterval(interval);

                    setTimeout(function () {
                        $('html').addClass('loaded');
                        setTimeout(function () {
                            // Initialize animations for all .animated-heading elements
                            initializeAnimations();
                            
                            lenis.start()
                        }, 100);
                    }, 1000);
                }
            }, 50); // Adjust the interval time as needed
        }

        // Register the ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Function to initialize SplitType and create animations for each .animated-heading
        function initializeAnimations() {
            lenis.start()
            console.log("Animations initialized");
            $('.animated-heading').each(function (index, element) {
                // Split the text into lines and words
                let typeSplit = new SplitType($(element).find('.heading-anim'), {
                    types: 'lines, words',
                    tagName: 'span'
                });

                // Duplicate the inner h2 tag of .animated-heading and add a class name animated-lizard
                var heading2 = $(element).find('.heading-anim').clone().addClass('animated-lizard');
                $(element).append(heading2);

                // Store each word in a span tag with the class name anim-word within an array and remove the texts/words from .word class
                var wordsArray = [];
                $(element).find('.animated-lizard .word').each(function () {
                    var $this = $(this);
                    var eachWord = $this.text();
                    wordsArray.push('<span class="anim-word">' + eachWord + '</span>');
                    $this.text(''); // Clear the .word text
                });

                function setWordWidths() {
                    $(element).find('.animated-lizard .word').each(function (wordIndex) {
                        var $this = $(this);
                        var originalWord = $(element).find('.heading-anim .word').eq(wordIndex);
                        var wordWidth = originalWord.outerWidth();
                        $this.css('width', wordWidth);
                    });
                }

                setWordWidths(); // Set initial widths

                $(window).resize(function () {
                    setWordWidths(); // Adjust widths on window resize
                });

                setTimeout(function () {
                    // Function to add markup with transition using GSAP and ScrollTrigger
                    function animateWords() {
                        $(element).find('.animated-lizard .word').each(function (wordIndex) {
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
                        start: "top 97%", // Adjust the start position as needed
                        onEnter: function () {
                            setTimeout(function () {
                                animateWords();
                            }, 200); // Add a 1-second delay before starting the animation
                        },
                        onLeaveBack: function () {
                            // Reset the animation
                            $(element).find('.animated-lizard .word').each(function () {
                                $(this).text(''); // Clear the .word text
                            });
                        }
                    });
                }, 100);
            });
        }

        function countDecimals(value) {
            if (Math.floor(value) === value) return 0;
            return value.toString().split(".")[1].length || 0;
        }

        function updateValue($element, finalValue, decimalPlaces) {
            $({
                countNum: 0
            }).animate({
                countNum: finalValue
            }, {
                duration: 3000,
                easing: 'swing',
                step: function () {
                    $element.text(('000' + this.countNum.toFixed(decimalPlaces)).slice(-3) + '%');
                },
                complete: function () {
                    $element.text(('000' + finalValue.toFixed(decimalPlaces)).slice(-3) + '%');
                }
            });
        }

        function initializeAnimations1() {
            $('.animated-heading-h1').each(function (index, element) {
                // Split the text into lines and words
                let typeSplit = new SplitType($(element).find('.heading-anim-h1'), {
                    types: 'lines, words',
                    tagName: 'span'
                });

                // Duplicate the inner h2 tag of .animated-heading and add a class name animated-lizard
                var heading2 = $(element).find('.heading-anim-h1').clone().addClass('animated-lizard');
                $(element).append(heading2);

                // Store each word in a span tag with the class name anim-word within an array and remove the texts/words from .word class
                var wordsArray = [];
                $(element).find('.animated-lizard .word').each(function () {
                    var $this = $(this);
                    var eachWord = $this.text();
                    wordsArray.push('<span class="anim-word">' + eachWord + '</span>');
                    $this.text(''); // Clear the .word text
                });

                setTimeout(function () {
                    // Function to add markup with transition using GSAP and ScrollTrigger
                    function animateWords() {
                        $(element).find('.animated-lizard .word').each(function (wordIndex) {
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
                        start: "top 80%", // Adjust the start position as needed
                        onEnter: function () {
                            animateWords();
                        },
                        onLeaveBack: function () {
                            // Reset the animation
                            $(element).find('.animated-lizard .word').each(function () {
                                $(this).text(''); // Clear the .word text
                            });
                        }
                    });
                }, 100);
            });
        }
        initializeAnimations1();

        $(document).ready(function () {
            gsap.registerPlugin(ScrollTrigger);

            let typeSplit = new SplitType('.anim-paragraph', {
                types: 'lines, words, chars',
                tagName: 'span'
            });



            $(window).on('load', function () {
                if ($('body').hasClass('home-page')) {
                    setTimeout(function () {
                        $('.anim-paragraph').each(function () {
                            let animParagraph = $(this);

                            ScrollTrigger.create({
                                trigger: animParagraph,
                                start: 'top 100%',
                                onEnter: function () {
                                    $('.anim-paragraph').each(function () {
                                        $(this).find('.word').each(function (index) {
                                            $(this).css('transition-delay', (index * 0.02) + 's');
                                        });
                                    });
                                    gsap.to(animParagraph, {
                                        className: 'anim-paragraph active-animation',
                                        duration: 1,
                                        ease: 'power1.inOut',
                                    });
                                },
                                onLeaveBack: function () {
                                    $('.anim-paragraph').each(function () {
                                        $(this).find('.word').each(function (index) {
                                            $(this).css('transition-delay', (index * 0) + 's');
                                        });
                                    });
                                    gsap.to(animParagraph, {
                                        className: 'anim-paragraph',
                                        duration: 1,
                                        ease: 'power1.inOut'
                                    });
                                }
                            });
                        });
                    }, 500);
                } else {
                    // Initialize animations immediately on other pages
                    $('.anim-paragraph').each(function () {
                        let animParagraph = $(this);

                        ScrollTrigger.create({
                            trigger: animParagraph,
                            start: 'top 100%',
                            onEnter: function () {
                                $('.anim-paragraph').each(function () {
                                    $(this).find('.word').each(function (index) {
                                        $(this).css('transition-delay', (index * 0.02) + 's');
                                    });
                                });
                                gsap.to(animParagraph, {
                                    className: 'anim-paragraph active-animation',
                                    duration: 1,
                                    ease: 'power1.inOut',
                                });
                            },
                            onLeaveBack: function () {
                                $('.anim-paragraph').each(function () {
                                    $(this).find('.word').each(function (index) {
                                        $(this).css('transition-delay', (index * 0) + 's');
                                    });
                                });
                                gsap.to(animParagraph, {
                                    className: 'anim-paragraph',
                                    duration: 1,
                                    ease: 'power1.inOut'
                                });
                            }
                        });
                    });
                }
            });
        });

    })

})(jQuery)

window.addEventListener("DOMContentLoaded", (event) => {
    // Split text into spans
    let typeSplit = new SplitType("[text-split]", {
        types: "words, chars",
        tagName: "span"
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {
        // Reset tl when scroll out of view past bottom of screen
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top bottom",
            onLeaveBack: () => {
                timeline.progress(0);
                timeline.pause();
            }
        });
        // Play tl when scrolled into view (60% from top of screen)
        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 60%",
            onEnter: () => timeline.play()
        });
    }

    $("[scrub-each-word]").each(function (index) {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 80%",
                end: "bottom 30%",
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
    gsap.set("[text-split]", {
        opacity: 1
    });
});