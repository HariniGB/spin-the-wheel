# helper do
  def current_user
    @current_user ||= User.find(session[:id]) if session[:id]
  end

  def logged_in?
    !!current_user
  end

  def login(user)
    session[:id] = user.id
  end

  def logout
    session[:id] = nil
  end

  def game_in(game)
    session[:id] = game.id
  end

  def game_out
    session[:id] = user.id
  end

  def current_game
    @current_game ||= Game.find(session[:id]) if session[:id]
  end

  def gaming_in?
    !!current_game
  end
# end

