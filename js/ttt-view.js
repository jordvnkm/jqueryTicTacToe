var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
};

View.prototype.bindEvents = function () {

};

View.prototype.makeMove = function ($square) {
  if (this.game.isOver()){
    alert("Game already over");
    return;
  }
  if ($square.hasClass("checked")){
    alert("Invalid move, try again.");
  }
  else{
    $square.addClass('checked');
    let pos = $square.data("pos");
    let mark = this.game.currentPlayer;
    $square.text(`${mark}`);
    $square.addClass(`${mark}`);
    this.game.playMove(pos);
    if (this.game.winner()){
      let $winners = $(`.${mark}`);
      console.log($winners);
      $winners.addClass("winner");
      let $losers = $(`.${this.game.currentPlayer}`);
      $losers.addClass("loser");
      setTimeout(alert(`Winner is ${mark}`), 2000);
    }
  }
};

View.prototype.setupBoard = function () {
  for (let i = 0; i < 3; i++) {
    let $ul = $('<ul></ul>');
      for (let j = 0; j < 3; j++) {
        let $li = $('<li></li>');
        $li.data("pos", [i, j]);
        $li.text(` `);
        $li.on("click", (event) => {
          $li = $(event.currentTarget);
          this.makeMove($li);
        });

        $ul.append($li);
      }
    this.$el.append($ul);
  }
};

module.exports = View;
