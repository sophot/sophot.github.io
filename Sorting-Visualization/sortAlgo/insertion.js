let insertionSort = function (s) {
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
    s.insertionsort(s.value);
  };

  let i = 1;
  s.insertionsort = function (value) {
    if (i < value.length) {
      s.loop();
      let j = i;
      let a = value[j];
      let b = value[j - 1];
      while (j > 0 && b > a) {
        s.swap(value, j, j - 1);
        j--;
        a = value[j];
        b = value[j - 1];
      }
    } else {
      console.log("finished insertion");
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
