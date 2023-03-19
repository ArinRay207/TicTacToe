var start = 0;
var turn = 0; 
var rslt = 0;
var board = [['', '', ''], ['', '', ''], ['', '', '']];
$(document).keypress(srt);
$("body").on("click", msrt);

$(".btn").on("click", function()
{
    if (start)
    {
        var id = ($(this).attr("id"));
        var r = Number(id[0]);
        var c = Number(id[1]);
        if (board[r][c] === '')
        {
            if (turn % 2 === 0) 
            {
                $(this).removeClass("black").addClass("yellow");
                $(this).text("X");
                board[r][c] = 'X';
            }
            else
            {
                $(this).removeClass("black").addClass("red");
                $(this).text("O");
                board[r][c] = 'O';
            }  
            turn++;
            if (turn % 2 === 0) 
            {
                $(".title").text("X's TURN").removeClass("red").addClass("yellow");
            }
            else
            {
                $(".title").text("O's TURN").removeClass("yellow").addClass("red");
            }
            rslt = check(r,c);
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
        
        $(".title").removeClass("win-x").removeClass("win-o").removeClass("draw").text("X's TURN").removeClass("red").addClass("yellow");
    }
}

function srt()
{
    if (start === 0) 
    {
        $(".btn").removeClass("yellow").removeClass("red").removeClass("win-x").removeClass("win-o").removeClass("draw").addClass("black");
        start = 1;
        
        $(".title").removeClass("win-x").removeClass("win-o").removeClass("draw").text("X's TURN").removeClass("red").addClass("yellow");
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
	if (turn == 9 && w == 0)  ans = 1;
	
	if (ans)
	{
        if (turn == 9 && w == 0)		
        {
            $(".title").text("DRAW!").addClass("draw");
            $(".btn").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).addClass("draw");
        }
		else if (turn % 2)	
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
    turn = 0; 
    board = [['', '', ''], ['', '', ''], ['', '', '']];
}