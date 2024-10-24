create or replace function getPlayerStatsForGameNfl(game_id_param int)
  RETURNS TABLE(player_id bigint, player_name text, player_position text, team_name text, game_name text, game_id bigint,
  passing_comp int, passing_att int, passing_yds int, passing_td int, passing_int int, rushing_att int, rushing_yds int, rushing_td int, receiving_rec int, receiving_yds int, receiving_tgt int, receiving_td int
   ) as $$
  begin
    return query select p.id as player_id, p.name as player_name, p.position, t.name as team_name, g.name as game_name, g.id as game_id, gl.passing_comp, gl.passing_att, gl.passing_yds, gl.passing_td, gl.passing_int, gl.rushing_att, gl.rushing_yds, gl.rushing_td, gl.receiving_rec, gl.receiving_yds, gl.receiving_tgt, gl.receiving_td from players p join teams t on p.team = t.id join games g on t.id = g.team_one OR t.id = g.team_two
join nfl_gamelog gl on gl.game = g.id AND gl.player = p.id
where g.id = game_id_param;
  end;
$$ LANGUAGE plpgsql;