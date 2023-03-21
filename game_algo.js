var start = 0;
var it = 0; 
var rslt = 0;
var N = 3;
var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
var map = [[8, 1, 2], [7, 0, 3], [6, 5, 4]];
var row = [0, 0, 0];
var col = [0, 0, 0];
var dia = [0, 0];
var center = 0, corner = 0, edge = 0;
$(document).keypress(srt);
$("body").on("click", msrt);
var hfirst = Math.floor(Math.random() * 2);
//(hfirst);
var i;
var j;
////////////////////

function isWin()
{
	if (dia[0] == N - 1) 
	{
		for (var k = 0; k < N; k++) if (board[k][k] == ' ') i = j = k; 
		return 1;
	}

	if (dia[1] == N - 1) 
	{
		for (var k = 0; k < N; k++)
		{
			if (board[k][N - k - 1] == ' ')
			{
				i = k; 
				j = N - k - 1;
				return 1;
			} 
		} 
	}

	for (var k = 0; k < N; k++) 
	{
		if (row[k] == N - 1)
		{
			for (var l = 0; l < N; l++)
			{
				if (board[k][l] == ' ')
				{
					i = k; 
					j = l;
					return 1;
				} 
			} 
		} 
	}

	for (var k = 0; k < N; k++) 
	{
		if (col[k] == N - 1)
		{
			for (var l = 0; l < N; l++)
			{
				if (board[l][k] == ' ')
				{
					i = l; 
					j = k;
					return 1;
				} 
			} 
		} 
	}

	return 0;
}

function isLoss()
{
	if (dia[0] == 1 - N) 
	{
		//("1");
		for (var k = 0; k < N; k++) if (board[k][k] == ' ') i = j = k; 
		return 1;
	}

	if (dia[1] == 1 - N) 
	{
		//("2");

		for (var k = 0; k < N; k++)
		{
			if (board[k][N - k - 1] == ' ')
			{
				i = k; 
				j = N - k - 1;
				return 1;
			} 
		} 
	}

	for (var k = 0; k < N; k++) 
	{
		if (row[k] == 1 - N)
		{
		//("3 " + k + " " + row[k]);

			for (var l = 0; l < N; l++)
			{
				if (board[k][l] == ' ')
				{
					i = k; 
					j = l;
					return 1;
				} 
			} 
		} 

	}

	for (var k = 0; k < N; k++) 
	{
		if (col[k] == 1 - N)
		{
		//("4");

			for (var l = 0; l < N; l++)
			{
				if (board[l][k] == ' ')
				{
					i = l; 
					j = k;
					return 1;
				} 
			} 
		} 
	}

	return 0;
}

function place(k)
{
	for (var r = 0; r < N; r++)
	{
		for (var c = 0; c < N; c++)
		{
			if (map[r][c] == k)
			{
				if (board[r][c] == ' ')
				{
					i = r;
					j = c;
					return 1;
				}
			}
		}
	}
	return 0;
}

function move()
{
    //(i + " " + j + " it: " + it);
	if (isWin()) 
    {
        //("WIN");
        return;
    }
	if (isLoss()) 
	{
        //("LOSS");

		return;
	}
	if (it == 0)
	{
		i = j = 0;
	}

	if (it == 2)
	{
		if (!map[i][j])
		{
			i = j = 2;
		}

		else
		{
			if (map[i][j] % 2)
			{
				edge = map[i][j];
				i = j = 1;
			} 

			else
			{
				corner = map[i][j];
				if (map[i][j] == 4) 
				{
					i = 0;
					j = 2;
				}

				else
				{
					i = j = 2;
				}
			}
		}
	}

	if (it == 4)
	{
		if (corner)
		{
			i = 2;
			j = 0;
		}

		if (edge)
		{
			if (!place(1)) place(7);
		}
	}

	if (it == 1)
	{
        //("yes");
		if (map[i][j] == 0)
		{
			center = 1;
			i = j = 0;
			return;
		}
		else if (map[i][j] % 2)
		{
			edge = map[i][j];
		}
		else corner = map[i][j];
		i = j = 1;
		return;
	}

	if (center)
	{
		for (var k = 2; k < 9; k++)
		{
			if (place(k)) return;
		}
	}

	if (it == 7)
	{
		for (var r = 0; r < N; r++)
		{
			for (var c = 0; c < N; c++)
			{
				if (board[r][c] == ' ')
				{
					i = r;
					j = c;
					return;
				}
			}
		}
	}

	if (hfirst && corner)
	{
		if (it == 3)
		{
			if ((map[i][j] - corner) % 8 == -3 || (map[i][j] - corner) % 8 == 5)
			{
				place((corner - 1) % 8);
			}
			else
			{
				place((corner + 1) % 8);
			}
			return;
			
		}

		if (it == 5)
		{
			if ((corner + 4) % 8)
			{
				place((corner + 4) % 8);
			}
			else place(8);
		}

		else
		{
			if (!place(corner - 1)) place(corner - 2); 
		}
	}

	if (hfirst && edge)
	{
		if (it == 3)
		{
			if (map[i][j] == ((edge + 4) % 8))
			{
				place((edge + 2) % 8);
			}

			if (map[i][j] == ((edge + 2) % 8) || map[i][j] == ((edge + 3) % 8))
			{
				if ((edge + 1) % 8)
				{
					place((edge + 1) % 8);
				}
				else place(8);
			}
			
			if(((map[i][j] + 2)) % 8 == (edge) || ((map[i][j] + 3)) % 8 == (edge))
			{
				if ((map[i][j] + 1) % 8)
				{
					place((map[i][j] + 1) % 8);
				}
				else place(8);
			}
		}

		if (it == 5)
		{
			if (((map[i][j] + 2) % 8) == (edge))
			{
				if(!place((edge + 1) % 8)) place(8);
			}

			if ((map[i][j] + 1) % 8)
			{
				place((map[i][j] + 1) % 8);
			}
			else place(8);
		}
	}
}

function setStyle(obj)
{
	if (it % 2) 
	{
		$(obj).removeClass("black").addClass("red");
		$(obj).text("O");
	}
	else
	{
		$(obj).removeClass("black").addClass("yellow");
		$(obj).text("X");
	}
}

////////////////////

$(".btn").on("click", function()
{
    if (start)
    {
        var id = ($(this).attr("id"));
        i = Number(id[0]);
        j = Number(id[1]);
        if (board[i][j] === ' ')
        {
			setStyle(this);
			if (it % 2) board[i][j] = 'O';
			else		board[i][j] = 'X';
			row[i]--;
			col[j]--;
			if (i == j) dia[0]--;
			if (i + j == 2) dia[1]--;
			it++;
			if (it % 2 === 0) 
			{
				$(".title").text("X's TURN").removeClass("red").addClass("yellow");
			}
			else
			{
				$(".title").text("O's TURN").removeClass("yellow").addClass("red");
			}
			rslt = check(i, j);
			if (!rslt)
			{
				setTimeout(function()
				{
					move();
					//(i + " " + j);
					setStyle("#" + i + j);
					if (it % 2) board[i][j] = 'O';
					else		board[i][j] = 'X';
					row[i]++;
					col[j]++;
					if (i == j) dia[0]++;
					if (i + j == 2) dia[1]++;
					it++;
					if (it % 2 === 0) 
					{
						$(".title").text("X's TURN").removeClass("red").addClass("yellow");
					}
					else
					{
						$(".title").text("O's TURN").removeClass("yellow").addClass("red");
					}
					rslt = check(i, j);
				}, 500);
			}
        }
    }
})

function msrt()
{
    if (rslt) rslt = 0;
    else if(start === 0)
    {
        $(".btn").removeClass("yellow").removeClass("red").removeClass("win-x").removeClass("win-o").removeClass("draw").addClass("black");
        start = 1;
        
        if (!hfirst) 
		{
			
			$(".title").removeClass("win-x").removeClass("win-o").removeClass("draw").text("MY TURN").removeClass("red").addClass("yellow");
			setTimeout(function()
			{
				move();
				//(i + " " + j);
				$("#" + i + j).removeClass("black").addClass("yellow");
				$("#" + i + j).text("X");
				board[i][j] = 'X';
				row[i]++;
				col[j]++;
				if (i == j) dia[0]++;
				if (i + j == 2) dia[1]++;
				it++;
				if (it % 2 === 0) 
				{
					$(".title").text("X's TURN").removeClass("red").addClass("yellow");
				}
				else
				{
					$(".title").text("O's TURN").removeClass("yellow").addClass("red");
				}
				rslt = check(i, j);
			}, 500);
		}
        else        $(".title").removeClass("win-x").removeClass("win-o").removeClass("draw").text("YOUR TURN").removeClass("red").addClass("yellow"); 

    }
}

function srt()
{
    if (start === 0) 
    {
        $(".btn").removeClass("yellow").removeClass("red").removeClass("win-x").removeClass("win-o").removeClass("draw").addClass("black");
        start = 1;
        
        if (!hfirst) 
		{
			
			$(".title").removeClass("win-x").removeClass("win-o").removeClass("draw").text("MY TURN").removeClass("red").addClass("yellow");
			setTimeout(function()
			{
				move();
				//(i + " " + j);
				$("#" + i + j).removeClass("black").addClass("yellow");
				$("#" + i + j).text("X");
				board[i][j] = 'X';
				row[i]++;
				col[j]++;
				if (i == j) dia[0]++;
				if (i + j == 2) dia[1]++;
				it++;
				if (it % 2 === 0) 
				{
					$(".title").text("X's TURN").removeClass("red").addClass("yellow");
				}
				else
				{
					$(".title").text("O's TURN").removeClass("yellow").addClass("red");
				}
				rslt = check(i, j);
			}, 500);
		}
        else        $(".title").removeClass("win-x").removeClass("win-o").removeClass("draw").text("YOUR TURN").removeClass("red").addClass("yellow"); 

    }
}

function check(i, j)
{
    var i1, j1, ans, temp, w = 0, r = 0, c = 0, d1 = 0, d2 = 0;
	ans = 0;
	
	temp = 1;
	for (i1 = 0; i1 < 3; i1++)
	{
        if (board[i1][j] != board[i][j])
		{
            temp = 0;
			break;
		}
	}
    c = temp;
	ans = ans || temp;
    
	temp = 1;
	for (j1 = 0; j1 < 3; j1++)
	{
        if (board[i][j1] != board[i][j])
		{
            temp = 0;
			break;
		}
	}	
    r = temp;
	ans = ans || temp;
    
	if (i == j)
	{
        temp = 1;
		for (i1 = 0; i1 != 3; i1++)
		{
            if (board[i1][i1] != board[i][j])
			{
                temp = 0;
				break;
			}
		}
		ans = ans || temp;
        d1 = temp;
	}

    
	if (i + j == 2)
	{
        temp = 1;
		for (i1 = 0; i1 != 3; i1++)
		{
            if (board[i1][2 - i1] != board[i][j])
			{
                temp = 0;
				break;
			}
		}
        d2 = temp;
		ans = ans || temp;
	}
    
	if (ans)        w = 1;
	if (it == 9 && w == 0)  ans = 1;
	
	if (ans)
	{
        if (it == 9 && w == 0)		
        {
            $(".title").text("DRAW!").addClass("draw");
            $(".btn").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("draw");
        }
		else if (it % 2)	
        {
            $(".title").text("X WINS!").addClass("win-x");
            if (d1) $(".d1").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-x");
            if (d2) $(".d2").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-x");
            if (r) $(".row-" + i).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-x");
            if (c) $(".col-" + j).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-x");
        }
		else
        {
            $(".title").text("O WINS!").addClass("win-o");
            if (d1) $(".d1").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-o");
            if (d2) $(".d2").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-o");
            if (r) $(".row-" + i).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-o");
            if (c) $(".col-" + j).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("win-o");
        } 			
        end();
	}
    
	return ans;
}

function end()
{
    start = 0;
    it = 0; 
    board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
    row = [0, 0, 0];
    col = [0, 0, 0];
    dia = [0, 0];
    center = 0;
    corner = 0; 
    edge = 0;
	hfirst = Math.floor(Math.random() * 2);
}