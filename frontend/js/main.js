$(document).ready(function(){
    //fix menu

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {

    let nawBarFix = document.getElementById("navbar");

    var currentScrollpos = window.pageYOffset;
    if(prevScrollpos > currentScrollpos) {
        nawBarFix.style.top = "0";
        nawBarFix.classList.add("header__spli");
    } else {
        nawBarFix.style.top = "-100px";
        nawBarFix.classList.remove("header__spli");
    }
    if(document.documentElement.clientWidth < 400) {
        nawBarFix.style.top = "0";
        nawBarFix.classList.add("header__spli");
    }
    if(prevScrollpos < 80) {
        nawBarFix.classList.remove("header__spli");
    }
    
    console.log(".pageXOffset)",document.documentElement.clientWidth);
    

    prevScrollpos = currentScrollpos;

    }
    
    $('.owl-carousel').owlCarousel({
        //loop: true,
        margin:10,
        nav: true,
        dots: true,
        center: true,
        items:23,
        loop:true,
        responsive:{
            0:{
                items:1
            },
            1600:{
                items:1
            }
        }
    });

  // svg4everybody();
    var controller = new ScrollMagic.Controller(),
        arrowAnim = new TimelineMax({ paused:true}),
        canvasAnim = new TimelineMax(),
        motionPath = MorphSVGPlugin.pathDataToBezier("#thePath",{align:"#arrow"}),
        $arrow = $('#arrow'),        
        count = 0; // Tick, to define the emit interval

    function percentage(x,y){
            var percentX =x/ $('#svg').width()*100,
            percentY = y/ $('#svg').height()*100;
            return [percentX+"%",percentY+"%"];
    }

    // TWEEN DEFINITIONS
    arrowAnim
        .set('#arrow',{ xPercent: -13,yPercent: -6.96})
        //.set('#arrow',{ xPercent: -50,yPercent: -50})
        .to("#arrow", 1, {
            ease: Power0.easeNone,
            bezier:{values:motionPath, type:"cubic"},
        });

    // SCENE CONSTRUCTORS
    var scene = new ScrollMagic.Scene({
        duration: $("#svg").height(),
        triggerHook: 0,
        triggerElement: "#example-services"
    });


    // SCENE DIFINITIONS
    scene.on('progress',function(event){
        progressCurrent = Math.round(event.progress*100);
        var direction = controller.info("scrollDirection"); //FORWARD OR REVERSE
        // if(direction == 'REVERSE'){
        //     progressNext = progressCurrent+1;
        // }
        arrowAnim.progress(event.progress);
        if(direction == 'FORWARD'){
            var parentLeft =  $arrow.parent().offset().left,
            parentTop =  $arrow.parent().offset().top,
            left = $arrow.position().left,
            top = $arrow.position().top,
            relLeft = left,
            relTop = top,
            percentArray = percentage(relLeft,relTop);
            progressNext = progressCurrent+1;
            TweenMax.fromTo('.dot-'+count,5,{opacity:1},{opacity:0,onCompleteParams:[count],onComplete:function(count){
                $('.dot-'+count).remove();
            }});
        }
        count++;
    })
    .setTween(arrowAnim)
    .setTween(canvasAnim)
    //   .addIndicators({name: "animation start"})
    .addTo(controller);


    // NOT SO IMPORTANT
    $(window).on('resize',function(){
        scene.duration($("#svg").height());  
    });

////////// slider teams
    let allItemsSlider = document.querySelectorAll(".content__item");
    let allItemsSliderImage = document.querySelectorAll(".teams-slider__photo_item");

    let classArray = [
        'teams-slider__photo_item-1',
        'teams-slider__photo_item-2',
        'teams-slider__photo_item-3',
        'teams-slider__photo_item-hide',
    ];

    let nawNextImage = document.getElementById("image_next");
    let nawPrevImage = document.getElementById("image_prev");
    let nawNextName = document.getElementById("name_next");
    let nawPrevName = document.getElementById("name_prev");
 

    let countSide = 0;
    let countActiveSlider = 0;

    function hideAllSlider (iter) {
        for (let i = iter; i < allItemsSlider.length; i++) {
            allItemsSlider[i].classList.add("content__item--hide");
        }
    }

    
    function checkNawImg() {
        if (countActiveSlider === 0) {
            nawPrevImage.classList.add("teams-slider__photo_item-hide");
            nawPrevName.textContent = "none";            
        }else{
            nawPrevImage.classList.remove("teams-slider__photo_item-hide");
            nawPrevImage.src = `image/teams/teams-${countActiveSlider}.png`;
            nawPrevName.textContent = allItemsSlider[countActiveSlider].childNodes[1].textContent;
        }
    
        if (countActiveSlider + 1 === allItemsSlider.length) {
            nawNextImage.classList.add("teams-slider__photo_item-hide");
            nawNextName.textContent = "none"; 
        }else{
            nawNextImage.classList.remove("teams-slider__photo_item-hide");
            nawNextImage.src = `image/teams/teams-${countActiveSlider+2}.png`;
            nawNextName.textContent = allItemsSlider[countActiveSlider+1].childNodes[1].textContent;            
        }
    }

    hideAllSlider(1);
    checkNawImg();

    function showSliderImageNext (start) {
        console.log("showSliderImageNext",start);                        
        for (let i = start; i < allItemsSliderImage.length; i++) {
            classArray.forEach(function(deleteClassName,index) {
                if (allItemsSliderImage[i].classList.contains(deleteClassName)) {
                    allItemsSliderImage[i].classList.remove(deleteClassName);
                    allItemsSliderImage[i].classList.add("teams-slider__photo_item-hide");
                }
            });
            allItemsSliderImage[i].classList.remove("teams-slider__photo_item-hide");
            allItemsSliderImage[i].classList.add(classArray[countSide]);
            countSide++;
            
        }
        countSide = 0;           
    }
    

    function showSliderImagePrev (start) {
        console.log("showSliderImagePrev",start);
        
        allItemsSliderImage.forEach((elem,penentIndex)=>{
            classArray.forEach(function(deleteClassName,index) {
                if (allItemsSliderImage[penentIndex].classList.contains(deleteClassName)) {
                    allItemsSliderImage[penentIndex].classList.remove(deleteClassName);
                    allItemsSliderImage[penentIndex].classList.add("teams-slider__photo_item-hide");
                }
            });
        })
        
        
        for (let i = start; i < allItemsSliderImage.length; i++) {            
            console.log("iter -> ",i,countSide);
            
            allItemsSliderImage[i].classList.remove("teams-slider__photo_item-hide");
            allItemsSliderImage[i].classList.add(classArray[countSide]);
            ++countSide;
        }
        countSide = 0;
    }

    function showSliderContent (whichItem) {
        if(allItemsSlider[whichItem].classList.contains("content__item--hide")) {
            allItemsSlider[whichItem].classList.remove("content__item--hide");
        }
    }

    let nextButtom = document.getElementById("next-slider");
    let prevSlider = document.getElementById("prev-slider");

    nextButtom.addEventListener("click", function (event) {
        if(countActiveSlider + 1 < allItemsSlider.length) {
            ++countActiveSlider;
            hideAllSlider(0);
            showSliderContent(countActiveSlider);
            showSliderImageNext(countActiveSlider);
        }
        checkNawImg();
    });

    prevSlider.addEventListener("click", function (event) {
        if(countActiveSlider > 0) {
            --countActiveSlider;
            //console.log(allItemsSliderImage[countActiveSlider]);
            hideAllSlider(0);
            showSliderContent(countActiveSlider);
            showSliderImagePrev(countActiveSlider);
        }
        checkNawImg();
    });
});

// window.addEventListener("DOMContentLoaded", function() {
// "use strict";
// let tab = document.querySelectorAll(".slider__naw-circle-splash");
// let button = document.querySelector(".slider__naw");
// let buttonPerent = document.querySelectorAll(".slider__naw > div");
// let content = document.querySelectorAll(".slider__item");

// function createNewVideo (i) {
//   let video = document.querySelector(".bg-video__content");
//   let newVideoV = document.createElement("video");
//   newVideoV.classList.add("bg-video__content");
//   newVideoV.setAttribute("autoplay","true");
//   newVideoV.setAttribute("muted","true");
//   newVideoV.setAttribute("loop","true");

//   let newVideoSource = document.createElement("source");
//   newVideoSource.setAttribute("src", `./image/video/video-${i+1}.mp4`)
//   newVideoSource.setAttribute("type", "video/mp4");
//   newVideoSource.setAttribute("id", "slider-video");

//   let videoConteiner = document.querySelector(".bg-video");

  
//   console.log(video);
  
  
//   newVideoV.prepend(newVideoSource);
//   videoConteiner.append(newVideoV);
//   video.classList.add("hide-slider");

  
//   let timer = setTimeout(() => {
//     video.remove();
//     clearTimeout(timer);
//   }, 1000);

//   console.log(videoConteiner);

// }

// function hideTabContent (iter) {
//   for (let i = iter; i < content.length; i++) {
//     content[i].classList.add("slider__item--not-see");
//     if(buttonPerent[i].classList.contains("slider__naw-circle--active")) {
//       buttonPerent[i].classList.remove("slider__naw-circle--active");
//       buttonPerent[i].classList.add("slider__naw-circle");
//     }
//   }
// }

// hideTabContent(1);

// function showTabContent (b) {
//   if(content[b].classList.contains("slider__item--not-see")) {
//     content[b].classList.remove("slider__item--not-see");
//     if(buttonPerent[b].classList.contains("slider__naw-circle")) {
//       buttonPerent[b].classList.add("slider__naw-circle--active");
//       buttonPerent[b].classList.remove("slider__naw-circle");
//     }
//   }
// }

// button.addEventListener("click", function (event) {
//   let target = event.target;
//   if( target && target.classList.contains("slider__naw-circle-splash")) {
//     for ( let i = 0; i < tab.length; i++ ) {
//       if ( target == tab[i] ) {
//         hideTabContent(0);
//         showTabContent(i);
//         createNewVideo(i);
//       }
//     }
//   }
// });


// // function(position){
// //   return function () {
// //     return ()
// //   }
// // }


// // $(document).scroll(function () {
// //   let s_top = $(window).scrollTop();
// //   let blockExample = $("#example-services").offset().top;
  
// //   let circle = $("#img-circle");
  
// // //   offsetTop: 383
// // // offsetWidth: 165

// //   let lastScrollTop = 0;

 

// //   if((s_top + (blockExample / 3))> blockExample){
    
// //     if (blockExample > lastScrollTop){
// //       circle.css(
// //         {
// //           'top': circle[0].offsetTop+10,
// //           'left': circle[0].offsetLeft+12
// //         });
// //     } else {
// //       circle.css(
// //         {
// //           'top': circle[0].offsetTop-10,
// //           'left': circle[0].offsetLeft-12
// //         });
// //     }

// //     lastScrollTop = s_top;
      
      
// //       console.log("Yes");
// //   }
// // });


// function updateSlider(event) {
//   console.log(motionPath);  
// }


// let tween 
// let opacity = false;
// let motionPath = MorphSVGPlugin.pathDataToBezier("#motionPath", {align:"#Ov"});

//   //offest the balloon by hafl width and half height to make it appear centered on path
//   TweenLite.set("#Ov", {xPercent:-50, yPercent:-50});

//       console.log(motionPath);
      
//   $("#createAnimation").click(function(){      
//     tween = TweenLite.to("#Ov", 16, 
//             {
//               bezier:
//                 {
//                   values:motionPath,
//                   type:"cubic"
//                 },
//               onUpdate:updateSlider
//             });
//   });


//   let blockHeight = $('#example-services').height();
//   console.log(blockHeight);
//   let blockExample = $("#example-services").offset().top;
//   let blockExampleD = $("#animate-block-end").offset().top;
  
  
//   $(document).scroll(function () {
//     let s_top = $(window).scrollTop();
//     if(((s_top + (blockExample / 3)) > blockExample) && (blockExampleD - (blockExample / 3) < blockExampleD)) {
//       console.log("yes");
//       tween.progress(  ).pause()
//     }else{
//       tween.play();
//     }
//   });

//   // $("#slider").slider({
//   //   range: false,
//   //   min: 0,
//   //   max: 1,
//   //   step:.001,
//   //   slide: function ( event, ui ) {
//   //     tween.progress( ui.value ).pause();
//   //   },
//   //   stop: function () {
//   //     tween.play();
//   //   }
//   // });	
  
//   // function updateSlider() {
//   //   $("#slider").slider("value", tween.progress());
//   // } 
  
//   // super secret Draggable code
//   // var draggable = Draggable.create("#balloon", {
//   //   type:"x,y"
//   // })



  
// console.clear();

// const threshold = 0.7; // trigger
// const options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: threshold
// };
// const observer = new IntersectionObserver(animHandler, options);
// const targets = document.querySelectorAll("section");
// const ar = [].slice.call(targets); 
// let animations = [];
// console.log(ar);

// let count = 0;
// //animations[1] = new TimelineMax({paused:true});  

// for (let target of ar) {
//   animations[count] = new TimelineMax({paused:true});  
//   observer.observe(target);
//   count++;
// }

// // timeline for each section
// animations[0]

// animations[1].to("#apple",1, {scale:1.4, ease: Sine.easeOut});

// animations[2].to("#apple",2, {scale:0.4, ease: Sine.easeOut})
//   .to('#small',1,{scale:0.5, transformOrigin:"center"},0);

// animations[3].to("#apple",1, {rotation:360, ease: Sine.easeOut});

// // observer handler
// function animHandler(targets, observer) {
//   for (var entry of targets) {
//     if (entry.isIntersecting) {
//       let i = ar.indexOf(entry.target);
//       animations.forEach(tl => tl.pause(0));
//       animations[i].play();
//      console.log(i);
//     } else {
//         //return;
//       animations[i].reverse();
//     }
//   }
// }

// });