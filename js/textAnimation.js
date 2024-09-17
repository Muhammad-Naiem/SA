(function ($) {
    $(function () {
        $(window).on('load', function () {
            var counter = 0;
            var interval = setInterval(function () {
                var formattedCounter = ('000' + counter).slice(-3); // Format counter to always show three digits
                $('.preloader-text span').text(formattedCounter + '%');
                $('.preloader-container-progress span').css('width', counter + '%');
                counter++;
                /*if (counter > 100) {
                    clearInterval(interval);

                    setTimeout(function () {
                        $('body').addClass('loaded');
                        setTimeout(function () {
                            // Initialize animations for all .animated-heading elements
                            initializeAnimations();
                        }, 100);
                    }, 2000);
                }*/
            }, 50); // Adjust the interval time as needed

            /*// Register the ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Function to initialize SplitType and create animations for each .animated-heading
            function initializeAnimations() {
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
                });*/
            }
        });
        
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
                types: 'lines, words, char',
                tagName: 'span'
            });

            $('.anim-paragraph').each(function () {
                $(this).find('.word').each(function (index) {
                    $(this).css('transition-delay', (index * 0.03) + 's');
                })
            });

            $(window).on('load', function () {

                setTimeout(function () {


                    $('.anim-paragraph').each(function () {
                        let animParagraph = $(this);

                        ScrollTrigger.create({
                            trigger: animParagraph,
                            start: 'top 90%',
                            onEnter: function () {
                                gsap.to(animParagraph, {
                                    className: 'anim-paragraph active-animation',
                                    duration: 1,
                                    ease: 'power1.inOut'
                                });
                            },
                            onLeaveBack: function () {
                                gsap.to(animParagraph, {
                                    className: 'anim-paragraph',
                                    duration: 1,
                                    ease: 'power1.inOut'
                                });
                            }
                        });
                    });
                }, 2000)

            })
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