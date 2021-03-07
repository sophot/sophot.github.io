let bubbleSort = function (s) {
  s.value = [];
  s.R = Math.floor(Math.random() * 255);
  s.G = Math.floor(Math.random() * 255);
  s.B = Math.floor(Math.random() * 255);

  s.setup = function () {
    s.createCanvas(displayWidth, displayHeight);
    for (let i = 0; i < displayWidth / RECT_WIDTH; i++) {
      s.randHeight = s.floor(Math.random() * displayHeight);
      s.value.push(s.randHeight);
    }
  };

  s.draw = function () {
    s.background(COLOR);
    s.displayShit();
    s.bubblesort(s.value);
  };

  let i = 0;

  s.bubblesort = function (value) {
    if (i < value.length) {
      for (let j = 0; j < value.length - i - 1; j++) {
        let a = value[j];
        let b = value[j + 1];
        if (a > b) {
          s.swap(value, j, j + 1);
        }
      }
    } else {
      console.log("finished bubble");
      s.noLoop();
    }
    i++;
  };

  s.swap = function (value, a, b) {
    let tmp = value[a];
    value[a] = value[b];
    value[b] = tmp;
  };

  s.displayShit = function () {
    for (let i = 0; i < displayWidth / RECT_WIDTH; i++) {
      s.rect(RECT_WIDTH * i, displayHeight, RECT_WIDTH, -s.value[i]);
      s.fill(s.R, s.G, s.B);
    }
  };
};
