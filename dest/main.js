//Progress Bar
function progressBar() {
  let progress = document.querySelector(".progressbar");
  window.addEventListener("scroll", function () {
    let scrollY = window.scrollY; // scroll được đoạn đường bao nhiêu
    //đoạn đường đi được / (đoạn đường tổng [chiều cao body] - chiều cao window [do không scroll được tới đáy]) * 100
    let percent =
      (scrollY / (document.body.offsetHeight - window.innerHeight)) * 100;
    console.log(percent);
    progress.style.width = percent + "%";
  });
}
progressBar()
//Back to top
let toTop = document.querySelector(".backtop");
window.addEventListener("scroll", function () {
  let scrollY = window.pageYOffset;
  let heightSlider = document.querySelector(".slider").offsetHeight;
  if (scrollY >= heightSlider) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});

toTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Scroll change background header
function changeBGHeaderOnScroll() {
  let header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    let scrollY = window.pageYOffset;
    if (scrollY >= header.offsetHeight) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });
}
changeBGHeaderOnScroll()
// Menu (navigator)

let menu = document.querySelector(".menu"),
  btnMenu = document.querySelector(".btnmenu");
//click btnmenu
btnMenu.addEventListener("click", function () {
  this.classList.toggle("active"); //nút btnmenu đóng | mở
  menu.classList.toggle("active"); //menu mobile đóng | mở
});

//hide Nav
function hideNav() {
  btnMenu.classList.remove("active"); //nút btnmenu đóng
  menu.classList.remove("active"); //menu mobile đóng
}

//resize window
window.addEventListener("resize", function () {
  let wWindow = window.innerWidth;
  if (wWindow > 991) {
    hideNav();
  }
});

//Menu Scroll to Section
function scrollToSection() {
  let menus = document.querySelectorAll("header .menu a");
  let heightHeader = document.querySelector("header").offsetHeight; //lấy chiều cao bao gồm padding và border
  let sections = [];

  function removeActiveMenu() {
    menus.forEach(function (menu_element, menu_index) {
      menu_element.classList.remove("active");
    });
  }

  menus.forEach(function (element, index) {
    let href = element.getAttribute("href");
    let className = href.replace("#", "");
    let section = document.querySelector("." + className);
    sections.push(section);

    element.addEventListener("click", function (e) {
      e.preventDefault();

      window.scrollTo({
        top: section.offsetTop - heightHeader + 1,
        behavior: "smooth",
      });
      removeActiveMenu();
      element.classList.add("active");

      //Khi click vào một thẻ bất kỳ ở trạng thái mobile sẽ đóng nút btnmenu và menu mobile
      hideNav();
    });
  });

  window.addEventListener("scroll", function (e) {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
      if (
        positionScroll > section.offsetTop - heightHeader &&
        positionScroll < section.offsetTop + section.offsetHeight
      ) {
        removeActiveMenu();
        menus[index].classList.add("active");
      } else {
        menus[index].classList.remove("active");
      }
    });
  });
}

//Languages
function clickLanguages() {
  let lang = document.querySelector(".lang");
  let langCurrent = document.querySelector(".lang .lang__current span");
  let langOpt = document.querySelector(".lang .lang__option");
  let langItems = document.querySelectorAll(".lang .lang__option a");

  lang.addEventListener("click", function (e) {
    e.stopPropagation();
    lang.classList.toggle("active");
  });

  langItems.forEach(function (item) {
    item.addEventListener("click", function () {
      let langText = item.textContent;
      let langCurrentSpan = langCurrent.textContent;
      langCurrent.innerHTML = langText;
      this.innerHTML = langCurrentSpan;
    });
  });

  document.addEventListener("click", function () {
    lang.classList.remove("active"); //hide lang
  });
}

//Slider Hero
function handleSliderHero() {
  //Khởi tạo Slider
  var slider = document.querySelector(".slider__img");
  var flktySlider = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    draggable: ">1",
    prevNextButtons: false,
    wrapAround: true,
    // pageDots: false,
    autoPlay: 2000,
    pauseAutoPlayOnHover: false,

    on: {
      ready: function () {
        console.log("Flickity is ready");
      },
      change: function (index) {
        console.log("Slide changed to" + index);
        handlePagingSlider(index);
      },
    },
  });

  //Controls
  let btnPrev = document.querySelector(".--prev");
  let btnNext = document.querySelector(".--next");
  btnPrev.addEventListener("click", function () {
    flktySlider.previous(true);
  });
  btnNext.addEventListener("click", function () {
    flktySlider.next(true);
  });
  //Dots
  function handleDotsSlider() {
    let dotsSlider = document.querySelector(".flickity-page-dots");
    let dotsSliderBottom = document.querySelector(".slider__bottom-paging");
    dotsSliderBottom.appendChild(dotsSlider);
  }
  handleDotsSlider();
  //paging
  function handlePagingSlider(index) {
    let number = document.querySelector(".number");
    number.innerHTML = (index + 1).toString().padStart(2, "0");
  }
}

//Modal Video
function handleModalVideo() {
  let videos = document.querySelectorAll(
      ".video__item-wrap .video__item .video__item-img"
    ),
    modalVideo = document.querySelector(".popupvideo"),
    iframeModalVideo = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe"
    ),
    btnClose = document.querySelector(
      ".popupvideo .popupvideo__inner .popupvideo__inner-iframe .iconclose"
    );

  videos.forEach(function (video) {
    video.addEventListener("click", function () {
      modalVideo.classList.add("active");
      let dataID = video.getAttribute("data-video-src");
      iframeModalVideo.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + dataID + "?autoplay=1"
      );
    });
  });

  function closeModal() {
    modalVideo.classList.remove("active");
  }
  //Bấm nút tắt
  btnClose.addEventListener("click", function () {
    closeModal();
    iframeModalVideo.setAttribute("src", "");
  });

  //Bấm ra ngoài tắt
  modalVideo.addEventListener("click", function () {
    closeModal();
    iframeModalVideo.setAttribute("src", "");
  });
}

//Slider photos
function handlePhotosSlider() {
  //Khởi tạo Slider
  var slider = document.querySelector(".photos");
  var flktySlider = new Flickity(slider, {
    // options
    cellAlign: "left",
    contain: true,
    draggable: ">1",
    prevNextButtons: false,
    wrapAround: true,
    pageDots: false,
    autoPlay: 2000,
    pauseAutoPlayOnHover: false,
    freeScroll: true,
    lazyLoad: 3,
    // on: {
    //   ready: function () {
    //     console.log("Flickity is ready");
    //   },
    //   change: function (index) {
    //     console.log("Slide changed to" + index);
    //     handlePagingSlider(index);
    //   },
    // },
  });
}

//Thực hiện tập lệnh khi tài nguyên tải xong
window.addEventListener("load", function () {
  progressBar();
  changeBGHeaderOnScroll();
  scrollToSection();
  clickLanguages();
  handleSliderHero();
  handleModalVideo();
  handlePhotosSlider();
});
