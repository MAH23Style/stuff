function insertImage() {
  document.querySelectorAll(".box").forEach((image) => {
    if (image.innerText.length !== 0) {
      if (image.innerText == "Wpawn" || image.innerText == "Bpawn") {
        image.innerHTML = `${image.innerText} <img class='all-img all-pown' src="${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      } else {
        image.innerHTML = `${image.innerText} <img class='all-img' src="${image.innerText}.png" alt="">`;
        image.style.cursor = "pointer";
      }
    }
  });
}
function checkForKingCapture() {
  let whiteKingCaptured = true;
  let blackKingCaptured = true;

  document.querySelectorAll(".box").forEach((box) => {
    if (box.innerText === "Wking") {
      whiteKingCaptured = false;
    }
    if (box.innerText === "Bking") {
      blackKingCaptured = false;
    }
  });
  if (whiteKingCaptured) {
    showVictoryScreen("Black");
  } else if (blackKingCaptured) {
    showVictoryScreen("White");
  }
}
insertImage();

function coloring() {
  const color = document.querySelectorAll(".box");

  color.forEach((color) => {
    getId = color.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    aup = eval(arr.shift());
    a = aside + aup;

    if (a % 2 == 0) {
      color.style.backgroundColor = "rgb(232 235 239)";
    }
    if (a % 2 !== 0) {
      color.style.backgroundColor = "rgb(125 135 150)";
    }
  });
}
coloring();

function reddish() {
  document.querySelectorAll(".box").forEach((i1) => {
    if (i1.style.backgroundColor == "blue") {
      document.querySelectorAll(".box").forEach((i2) => {
        if (
          i2.style.backgroundColor == "greenyellow" &&
          i2.innerText.length !== 0
        ) {
          greenyellowText = i2.innerText;

          blueText = i1.innerText;

          blueColor = Array.from(blueText).shift().toString();
          greenyellowColor = Array.from(greenyellowText).shift().toString();

          getId = i2.id;
          arr = Array.from(getId);
          arr.shift();
          aside = eval(arr.pop());
          aup = eval(arr.shift());
          a = aside + aup;

          if (a % 2 == 0 && blueColor == greenyellowColor) {
            i2.style.backgroundColor = "rgb(232 235 239)";
          }
          if (a % 2 !== 0 && blueColor == greenyellowColor) {
            i2.style.backgroundColor = "rgb(125 135 150)";
          }
        }
      });
    }
  });
}

document.getElementById("reset-btn").addEventListener("click", function () {
  location.reload();
});

tog = 1;

document.querySelectorAll(".box").forEach((item) => {
  item.addEventListener("click", function () {
    if (
      item.style.backgroundColor == "greenyellow" &&
      item.innerText.length == 0
    ) {
      tog = tog + 1;
    } else if (
      item.style.backgroundColor == "greenyellow" &&
      item.innerText.length !== 0
    ) {
      document.querySelectorAll(".box").forEach((i) => {
        if (i.style.backgroundColor == "blue") {
          blueId = i.id;
          blueText = i.innerText;

          document.getElementById(blueId).innerText = "";
          item.innerText = blueText;
          coloring();
          insertImage();
          tog = tog + 1;
        }
      });
    }

    getId = item.id;
    arr = Array.from(getId);
    arr.shift();
    aside = eval(arr.pop());
    arr.push("0");
    aup = eval(arr.join(""));
    a = aside + aup;

    function whosTurn(toggle) {
      // PAWN

      if (item.innerText == `${toggle}pawn`) {
        item.style.backgroundColor = "blue";

        if (tog % 2 !== 0 && aup < 800) {
          if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
            document.getElementById(`b${a + 100}`).style.backgroundColor =
              "greenyellow";
            if (
              document.getElementById(`b${a + 200}`).innerText.length == 0 &&
              aup < 300
            ) {
              document.getElementById(`b${a + 200}`).style.backgroundColor =
                "greenyellow";
            }
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }

        if (tog % 2 == 0 && aup > 100) {
          if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
            document.getElementById(`b${a - 100}`).style.backgroundColor =
              "greenyellow";
            if (
              document.getElementById(`b${a - 200}`).innerText.length == 0 &&
              aup > 600
            ) {
              document.getElementById(`b${a - 200}`).style.backgroundColor =
                "greenyellow";
            }
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
        if (tog % 2 !== 0 && aup >= 800) {
          if (document.getElementById(`b${a + 100}`).innerText.length == 0) {
            document.getElementById(`b${a + 100}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a + 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a + 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
        if (tog % 2 == 0 && aup <= 100) {
          if (document.getElementById(`b${a - 100}`).innerText.length == 0) {
            document.getElementById(`b${a - 100}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside < 8 &&
            document.getElementById(`b${a - 100 + 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
              "greenyellow";
          }
          if (
            aside > 1 &&
            document.getElementById(`b${a - 100 - 1}`).innerText.length !== 0
          ) {
            document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
              "greenyellow";
          }
        }
      }

      // KING

      if (item.innerText == `${toggle}king`) {
        if (aside < 8) {
          document.getElementById(`b${a + 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside > 1) {
          document.getElementById(`b${a - 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aup < 800) {
          document.getElementById(`b${a + 100}`).style.backgroundColor =
            "greenyellow";
        }
        if (aup > 100) {
          document.getElementById(`b${a - 100}`).style.backgroundColor =
            "greenyellow";
        }

        if (aup > 100 && aside < 8) {
          document.getElementById(`b${a - 100 + 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aup > 100 && aside > 1) {
          document.getElementById(`b${a - 100 - 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aup < 800 && aside < 8) {
          document.getElementById(`b${a + 100 + 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aup < 800 && aside > 1) {
          document.getElementById(`b${a + 100 - 1}`).style.backgroundColor =
            "greenyellow";
        }

        item.style.backgroundColor = "blue";
      }

      // KNIGHT

      if (item.innerText == `${toggle}knight`) {
        if (aside < 7 && aup < 800) {
          document.getElementById(`b${a + 100 + 2}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside < 7 && aup > 200) {
          document.getElementById(`b${a - 100 + 2}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside < 8 && aup < 700) {
          document.getElementById(`b${a + 200 + 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside > 1 && aup < 700) {
          document.getElementById(`b${a + 200 - 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside > 2 && aup < 800) {
          document.getElementById(`b${a - 2 + 100}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside > 2 && aup > 100) {
          document.getElementById(`b${a - 2 - 100}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside < 8 && aup > 200) {
          document.getElementById(`b${a - 200 + 1}`).style.backgroundColor =
            "greenyellow";
        }
        if (aside > 1 && aup > 200) {
          document.getElementById(`b${a - 200 - 1}`).style.backgroundColor =
            "greenyellow";
        }

        item.style.backgroundColor = "blue";
      }

      // QUEEN

      if (item.innerText == `${toggle}queen`) {
        for (let i = 1; i < 9; i++) {
          if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText == 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText == 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        item.style.backgroundColor = "blue";
      }

      // BISHOP

      if (item.innerText == `${toggle}bishop`) {
        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < (900 - aup) / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a + i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < aup / 100 &&
            i < 9 - aside &&
            document.getElementById(`b${a - i * 100 + i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 + i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < (900 - aup) / 100 &&
            i < aside &&
            document.getElementById(`b${a + i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a + i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length == 0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
          } else if (
            i < aup / 100 &&
            i < aside &&
            document.getElementById(`b${a - i * 100 - i}`).innerText.length !==
              0
          ) {
            document.getElementById(
              `b${a - i * 100 - i}`
            ).style.backgroundColor = "greenyellow";
            break;
          }
        }

        item.style.backgroundColor = "blue";
      }

      // ROOK

      if (item.innerText == `${toggle}rook`) {
        for (let i = 1; i < 9; i++) {
          if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a + i * 100 < 900 &&
            document.getElementById(`b${a + i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i * 100}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText == 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a - i * 100 > 100 &&
            document.getElementById(`b${a - i * 100}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i * 100}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText == 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a + i < aup + 9 &&
            document.getElementById(`b${a + i}`).innerText !== 0
          ) {
            document.getElementById(`b${a + i}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        for (let i = 1; i < 9; i++) {
          if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText == 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "greenyellow";
          } else if (
            a - i > aup &&
            document.getElementById(`b${a - i}`).innerText !== 0
          ) {
            document.getElementById(`b${a - i}`).style.backgroundColor =
              "greenyellow";
            break;
          }
        }

        item.style.backgroundColor = "blue";
      }
    }

    if (tog % 2 !== 0) {
      document.getElementById("tog").innerText = "White's Turn";
      whosTurn("W");
    }
    if (tog % 2 == 0) {
      document.getElementById("tog").innerText = "Black's Turn";
      whosTurn("B");
    }

    reddish();
  });
});

document.querySelectorAll(".box").forEach((hathiTest) => {
  hathiTest.addEventListener("click", function () {
    if (hathiTest.style.backgroundColor == "blue") {
      blueId = hathiTest.id;
      blueText = hathiTest.innerText;

      document.querySelectorAll(".box").forEach((hathiTest2) => {
        hathiTest2.addEventListener("click", function () {
          if (
            hathiTest2.style.backgroundColor == "greenyellow" &&
            hathiTest2.innerText.length == 0
          ) {
            document.getElementById(blueId).innerText = "";
            hathiTest2.innerText = blueText;
            coloring();
            insertImage();
          }
        });
      });
    }
  });
});

z = 0;
document.querySelectorAll(".box").forEach((ee) => {
  ee.addEventListener("click", function () {
    z = z + 1;
    if (z % 2 == 0 && ee.style.backgroundColor !== "greenyellow") {
      coloring();
    }
    checkForKingCapture();
  });
});
function showVictoryScreen(winner) {
  const victoryMessage = document.createElement("div");
  victoryMessage.style.position = "absolute";
  victoryMessage.style.top = "50%";
  victoryMessage.style.left = "50%";
  victoryMessage.style.transform = "translate(-50%, -50%)";
  victoryMessage.style.padding = "20px";
  victoryMessage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  victoryMessage.style.color = "#fff";
  victoryMessage.style.fontSize = "24px";
  victoryMessage.style.textAlign = "center";
  victoryMessage.style.borderRadius = "10px";
  victoryMessage.innerText = `${winner} wins the game!`;
  document.body.appendChild(victoryMessage);
  document.querySelectorAll(".box").forEach((box) => {
    box.style.pointerEvents = "none";
  });
}
