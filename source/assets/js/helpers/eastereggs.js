/**
 Eastereggs
 author: Adrian Schulz
 **/

;(function($, undefined) {
	'use strict';

	$(document).ready(function() {
		var pressedKeys = [],
			gameStarted = false,
			player_win = 0,
			computer_win = 0,
			startplayer = 0,
			tictactoe = {
				players: ['x', 'o'],
				rows: ['a', 'b', 'c'],
				columns: ['1', '2', '3'],
				init: function(player) {
					this.$easteregg = $('data-easteregg');
					this.$table = this.$easteregg.find('#board');
					this.currentplayer = player;
					this.values = [['', '', ''], ['', '', ''], ['', '', '']];
					this.$easteregg.find('.winner').html(this.players[player].toUpperCase() + '\'s turn.');
					if (player === 1) {
						this.cpu();
					}
					this.addFieldListener();
				},
				allFieldsFull: function() {
					var full = true;
					$.each(this.values, function(i, v) {
						$.each(v, function(j, w) {
							if (w === '') {
								full = false;
							}
						});
					});
					return full;
				},
				checkWinner: function() {
					var values = this.values;
					if ((values[0][0] === values[0][1] && values[0][1] === values[0][2] && values[0][2] !== '') ||
						(values[1][0] === values[1][1] && values[1][1] === values[1][2] && values[1][2] !== '') ||
						(values[2][0] === values[2][1] && values[2][1] === values[2][2] && values[2][2] !== '') ||
						(values[0][0] === values[1][0] && values[1][0] === values[2][0] && values[2][0] !== '') ||
						(values[0][1] === values[1][1] && values[1][1] === values[2][1] && values[2][1] !== '') ||
						(values[0][2] === values[1][2] && values[1][2] === values[2][2] && values[2][2] !== '') ||
						(values[0][0] === values[1][1] && values[1][1] === values[2][2] && values[2][2] !== '') ||
						(values[0][2] === values[1][1] && values[1][1] === values[2][0] && values[2][0] !== '')) {
						this.$easteregg.find('.winner').html('Player ' + this.players[this.currentplayer].toUpperCase() + ' wins.');
						this.$easteregg.find('.new_game').html('<button id="start-new-game">Start a new game</button>');
						if (this.players[this.currentplayer] === 'x') {
							player_win += 1;
						} else {
							computer_win += 1;
						}
						this.$table.find('td').each(function() {
							if (!$(this).hasClass('blocked')) {
								$(this).addClass('blocked');
							}
						});
						this.$easteregg.find('#win-count').html(('Player ' + player_win + ' : ' + computer_win + ' Computer'));
					} else if (this.allFieldsFull()) {
						this.$easteregg.find('.winner').html('Tie.');
						this.$easteregg.find('.new_game').html('<button id="start-new-game">Start a new game</button>');
					} else {
						this.$easteregg.find('.winner').html(this.players[(this.currentplayer + 1) % 2].toUpperCase() + '\'s turn.');
					}
				},
				checkRow: function(element, player) {
					var failure = Math.random(),
					retval = {x: -1, y: -1};
					$.each(element, function(i, v) {
						var player_fields = 0,
							empty_field = {x: -1, y: -1};
						$.each(v, function(j, w) {
							if (w === player) {
								++player_fields;
							} else if (w === '') {
								empty_field = {x: i, y: j};
							}
						});
						if (player_fields === 2 && failure < 0.8) {
							retval = empty_field;
						}
					});
					return retval;
				},
				checkColumn: function(element, player) {
					var new_element = [['', '', ''], ['', '', ''], ['', '', '']];

					$.each(element, function(i, v) {
						$.each(v, function(j, w) {
							new_element[j][i] = w;
						});
					});

					var field = this.checkRow(new_element, player),
						z = field.x;
					field.x = field.y;
					field.y = z;
					return field;
				},
				checkDiagonally: function(player) {
					var values = this.values,
						field = {x: -1, y: -1};
					if (values[0][0] === '' && values[1][1] === player && values[2][2] === player) {
						field = {x: 0, y: 0};
					} else if (values[0][0] === player && values[1][1] === '' && values[2][2] === player) {
						field = {x: 1, y: 1};
					} else if (values[0][0] === player && values[1][1] === player && values[2][2] === '') {
						field = {x: 2, y: 2};
					} else if (values[0][2] === '' && values[1][1] === player && values[2][0] === player) {
						field = {x: 0, y: 2};
					} else if (values[0][2] === player && values[1][1] === '' && values[2][0] === player) {
						field = {x: 1, y: 1};
					} else if (values[0][2] === player && values[1][1] === player && values[2][0] === '') {
						field = {x: 2, y: 0};
					}
					return field;
				},
				selectField: function() {
					var field = {x: -1, y: -1};
					if (this.values[1][1] === '') {
						field = {x: 1, y: 1};
					} else {
						$.each(this.values, function(i, v) {
							$.each(v, function(j, w) {
								if (w === '' && field.x === -1) {
									field = {x: i, y: j};
								}
							});
						});
					}
					return field;
				},
				cpu: function() {
					var field = {x: -1, y: -1},
						counter = 0,
						player = this.players[this.currentplayer],
						opponent = this.players[(this.currentplayer + 1) % 2],
						val = [this.checkRow(this.values, player),
							this.checkColumn(this.values, player),
							this.checkDiagonally(player),
							this.checkRow(this.values, opponent),
							this.checkColumn(this.values, opponent),
							this.checkDiagonally(opponent),
							this.selectField()];
					while (field.x === -1 && field.x === -1 && counter < val.length) {
						field = val[counter];
						++counter;
					}
					this.$table.find('#' + this.rows[field.x] + this.columns[field.y]).click();
				},
				addFieldListener: function() {
					var _this = this;
					this.$table.delegate('td', 'click', function() {
						if (!$(this).hasClass('blocked')) {
							$(this).html(_this.players[_this.currentplayer]);
							$(this).addClass(_this.players[_this.currentplayer] + '-field');
							$(this).addClass('blocked');
							var row = $.inArray($(this).context.id.charAt(0), _this.rows),
								column = $.inArray($(this).context.id.charAt(1), _this.columns);
							_this.values[row][column] = _this.players[_this.currentplayer];
							_this.checkWinner();
							_this.currentplayer = (_this.currentplayer + 1) % 2;
							if (_this.currentplayer === 1) {
								_this.cpu();
							}
						}
					});
				}
			};

		function startGame() {
			var html_data = '<data-easteregg id="modal"><div class="modal-content"><h1>Tic-Tac-Toe</h1>';
			html_data += '<p id="win-count">Player 0 : 0 Computer</p>';
			html_data += '<p class="winner"></p><div class="new_game"></div><div class="tic-tac-toe"><table id="board">';
			html_data += '<tr class="row"><td id="a1"></td><td id="a2"></td><td id="a3"></td></tr>';
			html_data += '<tr class="row"><td id="b1"></td><td id="b2"></td><td id="b3"></td></tr>';
			html_data += '<tr class="row"><td id="c1"></td><td id="c2"></td><td id="c3"></td></tr>';
			html_data += '</table></div><button id="close_game">Close</button></div></data-easteregg>';
			$('body').append(html_data);
			tictactoe.init(startplayer);
		}

		function stopGame() {
			$('data-easteregg').remove();
		}

		$(document).delegate('#close_game', 'click', function() {
			var $table = $('#board');
			gameStarted = false;
			$table.find('td').removeClass();
			$table.find('td').html('');
			stopGame();
		});

		$(document).delegate('#start-new-game', 'click', function() {
			var $table = $('#board');
			$table.find('td').removeClass();
			$table.find('td').html('');
			this.remove();
			startplayer = (startplayer + 1) % 2;
			tictactoe.init(startplayer);
		});

		$(document).keydown(function(event) {
			if (event.keyCode === 27) {
				stopGame();
				gameStarted = false;
			}
			var char = String.fromCharCode(event.which).toLowerCase();
			if ($.inArray(char, pressedKeys) === -1) {
				pressedKeys.push(char);
				if ($.inArray('f', pressedKeys) !== -1 &&
					$.inArray('h', pressedKeys) !== -1 &&
					$.inArray('n', pressedKeys) !== -1 &&
					$.inArray('w', pressedKeys) !== -1 &&
					pressedKeys.length === 4 &&
					gameStarted === false) {
					gameStarted = true;
					startGame();
				}
			}
		});

		$(document).keyup(function(event) {
			var char = String.fromCharCode(event.which).toLowerCase();
			pressedKeys.pop(char);
		});

	});

})(jQuery);
