var odd = true; //true is red, false is yello
var array =
        [
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0, 0, 0]]; // red is 1, yellow is 2

gameStart();

function gameStart()
{
  for (var i = 0; i < 7; i++)
  {
    var id = "h" + i;
    var child = "<div class = 'coin hover' id = " + id + "></div>";
    $("#top-container").append(child);
  }

  $(".hover").hover(function()
  {
    if (odd)
    {
      $( this ).css("background-color", "red");
    }
    else
    {
      $( this ).css("background-color", "yellow");
    }

  }, function()
  {
    $( this ).css("background-color", "white");
  });

  $(".hover").click(function()
  {
    var column = $(this).attr("id")[1];
    putCoin(column, odd);
    odd = !odd;
  });

  for (var i = 6; i >= 0; i--)
  {
    for (var j = 0; j < 7; j++)
    {
      var id = "c" + i + "" + j;
      var child = "<div class = 'coin' id = " + id + "></div>";
      $("#main-container").append(child);
    }
    $("#main-container").append("<br>");
  }
}

function putCoin(column, odd)
{
  var numColor, color;
  if (odd)
  {
    numColor = 1;
    color = "red";
  }
  else
  {
    numColor = 2;
    color = "yellow";
  }
  for (var i = 0; i < 7; i++)
  {
    if (array[i][column] === 0)
    {
      array[i][column] = numColor;
      $("#c" + i + "" + column).css("background-color", color);

      if (check(column, i, numColor))
      {
        if (odd)
        {
          $("body").prepend("<h1 class = 'winning-title'>Player 1 Wins</h1>");
        }
        else
        {
          $("body").prepend("<h1 class = 'winning-title'>Player 2 Wins</h1>");
        }
      }
      return;
    }
  }

  // invalid(); YOU HAVE TO DO IT
}

function insideArray(num)
{
  if (num >= 0 && num <= 6)
  {
    return true;
  }
  else
  {
    return false;
  }
}



function check(x, y, color)
{
  for (var i = x + 1, num = 0; num < 2; num++, i -= 2)
  {
    if (array[y][i] === color)
    {
      if (horizantalCheck(x, y, color))
      {
        return true;
      }
    }

    //console.log(array[y][i]);
  }

  for (var i = y + 1, num = 0; num < 2; num++, i -= 2)
  {
    if (insideArray(i) && array[i][x] === color)
    {
      if (verticalCheck(x, y, color))
      {
        return true;
      }
    }
    //console.log(array[i][x]);
  }

  for (var i = x + 1, j = y + 1, num = 0; num < 2; num++, i -= 2, j -= 2)
  {
    if (insideArray(j) && array[j][i] === color)
    {
      if (diagonalCheckRight(x, y, color))
      {
        return true;
      }
    }
  }

  for (var i = x - 1, j = y + 1, num = 0; num < 2; num++, i += 2, j -= 2)
  {
    if (insideArray(i) && array[j][i] === color)
    {
      if (diagonalCheckLeft(x, y, color))
      {
        return true;
      }
    }
  }
  return false;
}


function horizantalCheck(x, y, color)
{
  var right = true;
  var left = true;
  var count = 1, num = 1, odd = true;
  while(true)
  {

    if (count === 4)
    {
      return true;
    }
    else if (right && left)
    {
      if (odd)
      {
        x += num;
      }
      else
      {
        x -= num;
      }

      if (array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          right = false;
          x -= num;
        }
        else
        {
          left = false;
          x += num;
        }
      }
    }
    else if (right)
    {
      x++;

      if (array[y][x] === color)
      {
        count++;
      }
      else
      {
        right = false;
      }
    }
    else if (left)
    {
      x--;

      if (array[y][x] === color)
      {
        count++;
      }
      else
      {
        left = false;
      }
    }
    else
    {
      return false;
    }

    num++;
    if (num % 2)
    {
      odd = true;
    }
    else
    {
      odd = false;
    }
  }
}

function verticalCheck(x, y, color)
{
  var up = true;
  var down = true;
  var count = 1, num = 1, odd = true;
  while(true)
  {

    if (count === 4)
    {
      return true;
    }
    else if (up && down)
    {
      if (odd)
      {
        y += num;
      }
      else
      {
        y -= num;
      }

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          up = false;
          y -= num;
        }
        else
        {
          down = false;
          y += num;
        }
      }
    }
    else if (up)
    {
      y++;

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          up = false;
        }
      }
    }
    else if (down)
    {
      y--;

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          down = false;
        }
      }
    }
    else
    {
      return false;
    }

    num++;
    if (num % 2)
    {
      odd = true;
    }
    else
    {
      odd = false;
    }
  }
}

function diagonalCheckRight(x, y, color)
{
  var up = true;
  var down = true;
  var count = 1, num = 1, odd = true;

  while(true)
  {
    if (count === 4)
    {
      return true;
    }
    else if (up && down)
    {
      if (odd)
      {
        x += num;
        y += num;
      }
      else
      {
        x -= num;
        y -= num;
      }


      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          up = false;
          x -= num;
          y -= num;
        }
        else
        {
          down = false;
          x += num;
          y += num;
        }
      }
    }
    else if (up)
    {
      x++;
      y++;

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          up = false;
        }
      }
    }
    else if (down)
    {
      x--;
      y--;

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          down = false;
        }
      }
    }
    else
    {
      return false;
    }

    num++;
    if (num % 2)
    {
      odd = true;
    }
    else
    {
      odd = false;
    }
  }
}

function diagonalCheckLeft(x, y, color)
{
  var up = true;
  var down = true;
  var count = 1, num = 1, odd = true;

  while(true)
  {
    if (count === 4)
    {
      return true;
    }
    else if (up && down)
    {
      if (odd)
      {
        x -= num;
        y += num;
      }
      else
      {
        x += num;
        y -= num;
      }

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          up = false;
          x += num;
          y -= num;
        }
        else
        {
          down = false;
          x -= num;
          y += num;
        }
      }
    }
    else if (up)
    {
      x--;
      y++;

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          up = false;
        }
      }
    }
    else if (down)
    {
      x++;
      y--;

      if (insideArray(y) && array[y][x] === color)
      {
        count++;
      }
      else
      {
        if (odd)
        {
          down = false;
        }
      }
    }
    else
    {
      return false;
    }

    num++;
    if (num % 2)
    {
      odd = true;
    }
    else
    {
      odd = false;
    }
  }
}

console.log(check(3, 0, 1));
