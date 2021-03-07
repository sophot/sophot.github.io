let selectionSort = function (s) {
  s.value = [];
  s.R = Math.floor(Math.random() * 255);
  s.G = Math.floor(Math.random() * 255);
  s.B = Math.floor(Math.random() * 255);

  s.setup = function () {
    s.createCanvas(displayWidth, displayHeight);
    for (let i = 0; i < displayWidth / RECT_WIDTH; i++) {
      s.randHeight = Math.floor(Math.random() * displayHeight);
      s.value.push(s.randHeight);
    }
  };

  s.draw = function () {
    s.background(COLOR);
    s.displayShit();
    s.selectionsort(s.value);
  };

  let i = 0;

  s.selectionsort = function (value) {
    if (i < value.length - 1) {
      s.loop();
      s.minIdx = i;
      for (let j = i + 1; j < value.length; j++) {
        let a = value[j];
        let b = value[s.minIdx];
        if (a < b) {
          s.minIdx = j;
        }
      }
      s.swap(value, s.minIdx, i);
    } else {
      console.log("finished selection");
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
    s.noLoop();
  };
};
