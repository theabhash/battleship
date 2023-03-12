 var length;
 var totalHits;
 var hit = 0;
 var sizeAllShip = 0;
 var totalloop = 0;
 var ship;
 var count = 0; // to ensure the function is executed only once



 function reloadPageOnInfiniteLoop() {

     if (totalloop > 15000) {
         alert("try again");
         location.reload(true);
         init = 1;
     } else {
         init = 0;
     }
     return init;
 }

 function displayShip() {
     for (x in ship) {
         if (ship[x] != 0) {
             document.getElementById(x).style.backgroundColor = "#7989AC";
         }
     }
     alert("Better luck next time. ");
     location.reload();
 }

 function chkHits() {
     hit = hit + 1;
     document.getElementById("p_bombs").innerHTML = "Number of Remaining bombs:" + (totalHits - hit) + " !!!";
     if (hit == totalHits) {
         alert("Bombs finished !!! You lose.");
         displayShip();
     }
 }

 function chkWinCondition() {
     var y = 0;
     for (x in ship) {
         y = y + ship[x];
     }
     if (y === 0) {
         alert("Congratulations!!! You destroyed all the ships.");

         location.reload();

     } else {
         chkHits();
     }
 }

 function createArea() {
     ship = [];
     for (i = 0; i < length * length; i++) {
         ship.push(0);
     }
 }


 function placeShipHorizental(size) {
     var init = 0;
     var loopcount;
     while (init === 0) {
         totalloop++;
         init = reloadPageOnInfiniteLoop();
         var chkCrossing = 0;
         var rpos = Math.floor(Math.random() * length * length);
         for (i = 0; i < size; i++) {
             chkCrossing = parseInt(chkCrossing + ship[rpos + i]);

         }


         if (rpos % length <= (length - size) && (chkCrossing == 0)) {

             init = 1;
         }

     }
     loopcount++;
     if (loopcount == 5000) {
         placeShipVertical(size); // This function is needed here to avoid infinite loop while placing ship. (In case of grid size less than 5)
     }


     for (k = 0; k < size; k++) {
         ship[rpos + k] = 1;
     }
 }

 function placeShipVertical(size) {
     var init = 0;
     var loopcount;
     while (init === 0) {
         totalloop++;
         init = reloadPageOnInfiniteLoop();
         var chkCrossing = 0;
         var rpos = Math.floor(Math.random() * length * length);
         if (rpos < length * (length - (size - 1))) {
             for (q = 0; q < size; q++) {
                 chkCrossing = parseInt(chkCrossing + ship[rpos + length * q]);
             }
             if (chkCrossing == 0) {
                 init = 1;
             }
             loopcount++;
             if (loopcount === 5000) {

                 placeShipHorizental(size);
             }
         }
     }
     for (r = 0; r < size; r++) {
         ship[rpos + r * length] = 1;
     }
 }



 function mOver() {
     this.style.backgroundColor = "red";;
 }

 function mOut() {
     this.style.backgroundColor = "44AAEE";
 }

 function hitBomb() {

     this.removeEventListener("mouseover", mOver);
     this.removeEventListener("mouseout", mOut);
     if (parseInt(ship[this.id]) === 0) {
         this.style.backgroundColor = "blue";
     } else {
         this.style.backgroundColor = "black";
         ship[this.id] = 0;
     }
     this.removeEventListener("click", hitBomb);

     chkWinCondition(ship);

 }

 function makeGrid(number) {
     var parent = document.getElementById("div_table_board");
     var id = 0;
     for (i = 0; i < number; i++) {
         for (j = 0; j < number; j++) {
             var child = document.createElement("div");
             parent.appendChild(child);
             child.setAttribute('id', id++);
             child.className = "cell";
                child.addEventListener("click", hitBomb);
             child.addEventListener("mouseover", mOver);
             child.addEventListener("mouseout", mOut);
         }
         var newline = document.createElement("br");
         parent.appendChild(newline);
     }
 }

  function placeAllShip(){
         for (l = 0; l < checkbox.length; l++) {
             if (checkbox[l].checked == true) {
                 var orientation = Math.floor(Math.random() * 2);
                 var shipSize=parseInt(checkbox[l].value);
                 if (orientation === 0) {
                     placeShipHorizental(shipSize);
                 } else {
                     placeShipVertical(shipSize);
                 }
                 sizeAllShip += shipSize;
             }

         }
             }

 function StartGame(form, level) {
     checkbox = document.getElementsByName("ships");
     length = parseInt(form.numcells.value);
     
     if ((checkbox[0].checked || checkbox[1].checked || checkbox[2].checked) && (count === 0)) {
         count = 1;
         createArea();
         placeAllShip();
        totalHits = Math.floor((sizeAllShip * level) + length);
        makeGrid(length);
        document.getElementById("p_bombs").innerHTML = "Number of bombs you have:" + totalHits;
     }
 }

 //Question1: Changing color of cell by changing class work for click event but not for mousehover event.