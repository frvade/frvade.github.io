$(window).load(function() {
  $(".preloader div").fadeIn();
  function hidePreloader() {
    $(".preloader").remove();
  }
  setTimeout(hidePreloader, 1400);
});

$(document).ready(function() {
  game = $("#game");

  kind = lastKind = -1;
  index = lastIndex = -1;
  totalClick = 0;
  founded = 0;

  $(".item:not(.founded)").click(function(e) {
    if (!$(this).hasClass("founded")) {
      if (!$(this).hasClass("flipped")) {
        kind = $(this).data("item");
        index = $(".item").index($(this));
        totalClick++;
        $(this).addClass("flipped");
        if (totalClick % 2 == 0) {
          if (kind === lastKind) {
            $(".item[data-item='" + kind + "']").addClass("founded");
            founded++;
            if (founded == 6) {
              win();
            }
          } else {
            $(".item:eq(" + index + ")").addClass("wrong");
            $(".item:eq(" + lastIndex + ")").addClass("wrong");
            setTimeout(function() {
              $(".item.wrong")
                .removeClass("wrong")
                .removeClass("flipped");
            }, 500);
          }
          index = lastIndex = -1;
          kind = lastKind = -1;
        } else {
          lastKind = kind;
          lastIndex = index;
        }
      }
    }
    e.stopPropagation();
    e.preventDefault();
  });

  function win() {
    $(".items").remove();
    $(".video").fadeIn();
    salut();
  }
  function salut() {
    var colors = [
      "#F88431",
      "#F6BA35",
      "#EDD43A",
      "#89DC28",
      "#FF3399",
      "#FF0066",
      "#00ccff"
    ];
    var col_length = colors.length;
    var number_of_circles = 250;
    var i = 0;
    var max_x = $("body").width();
    var max_y = $("body").height() - 40;
    function create_random_line() {
      $(".confetti").append('<div class = "circle"></div>');
      if (i < number_of_circles - 1) {
        setTimeout(function() {
          var getRandomPosX = Math.random() * max_x;
          var getRandomPosY = Math.random() * max_y;
          var getRandomColor = Math.floor(Math.random() * col_length);
          var getRandomScale = Math.random() * (1.8 - 0.5) + 0.5;
          var getRandomOpacity = Math.random() * (0.9 - 0.3) + 0.3;
          var getRandomZIndex = Math.floor(Math.random() * 10);
          $(".circle")
            .last()
            .css({
              left: getRandomPosX,
              top: getRandomPosY,
              transform: "scale(" + getRandomScale + ")",
              background: colors[getRandomColor],
              opacity: getRandomOpacity,
              "z-index": getRandomZIndex
            });
          create_random_line();
        }, 30);
        i++;
      } else {
        return;
      }
    }

    create_random_line();
  }

  salut();

  $(".button").click(function() {
    $items = $(".items");
    $items.shuffleChildren();
    $(".game-rules").remove();
    $items.fadeIn();
  });
});

jQuery.fn.shuffleChildren = function(){
  var p = this[0];
  for (var i = p.children.length; i >= 0; i--) {
    p.appendChild(p.children[Math.random() * i | 0]);
  }
};
