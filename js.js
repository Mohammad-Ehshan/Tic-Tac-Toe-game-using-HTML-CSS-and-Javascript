let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let msgcon = document.querySelector(".msgcontainer");
let newgamebtn = document.querySelector("#newgame");
let winmsg = document.querySelector(".win");

let turnO = true;
let count = 0;
let reset = () => {
  turnO = true;
  count = 0;
  boxesEnabled();
  msgcon.classList.add("hide");
};
let boxesEnabled = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
let boxesdisabled = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showwinner = (winner) => {
  winmsg.innerText = `Congralution, Winner is ${winner}`;
  msgcon.classList.remove("hide");
  boxesdisabled();
};

let winpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.classList.add("Ocolor");
      box.classList.remove("Xcolor");
    } else {
      box.innerText = "X";
      turnO = true;
      box.classList.remove("Ocolor");
      box.classList.add("Xcolor");
    }
    box.disabled = true;
    // checkwinner();
    count++;
    let iswinner = checkwinner();
    if (count === 9 && !iswinner) {
      drawfun();
    }
  });
});
let drawfun = () => {
  winmsg.innerText = "DRAW";
  msgcon.classList.remove("hide");
  boxesdisabled();
};
const checkwinner = () => {
  for (let pattern of winpatterns) {
    let post1val = boxes[pattern[0]].innerText;
    let post2val = boxes[pattern[1]].innerText;
    let post3val = boxes[pattern[2]].innerText;
    if (post1val != "" && post2val != "" && post3val != "") {
      if (post1val === post2val && post2val === post3val) {
        console.log("Winner", post1val);
        showwinner(post1val);
        return true;
      }
    }
  }
};
newgamebtn.addEventListener("click", reset);
resetbtn.addEventListener("click", reset);
