create or replace function getPlayerStatsForGameNfl(game_id_param int)
  RETURNS TABLE(player_id bigint, player_name text, player_position text, team_name text, game_name text, game_id bigint, game_isi text,
  passing_comp int, passing_att int, passing_yds int, passing_td int, passing_int int, rushing_att int, rushing_yds int, rushing_td int, receiving_rec int, receiving_yds int, receiving_tgt int, receiving_td int
   ) as $$
   declare
   game_timestamp timestamp;
   team_one_param bigint;
   team_two_param bigint;
  begin
    select played_at into game_timestamp from games where id = game_id_param;
    select team_one into team_one_param from games where id = game_id_param;
    select team_two into team_two_param from games where id = game_id_param;

    return query select p.id as player_id, p.name as player_name, p.position, t.name as team_name, g.name as game_name, g.id as game_id, g.intraseason_indicator as game_isi, gl.passing_comp, gl.passing_att, gl.passing_yds, gl.passing_td, gl.passing_int, gl.rushing_att, gl.rushing_yds, gl.rushing_td, gl.receiving_rec, gl.receiving_yds, gl.receiving_tgt, gl.receiving_td from players p join teams t on p.team = t.id join games g on t.id = g.team_one OR t.id = g.team_two
join nfl_gamelog gl on gl.game = g.id AND gl.player = p.id
where g.played_at < game_timestamp AND (((g.team_one = team_one_param OR g.team_two = team_one_param) and p.team = team_one_param) OR ((g.team_one = team_two_param OR g.team_two = team_two_param) AND p.team = team_two_param))
-- remove logs of players who never saw the field to lower response size.
-- surely a syntactically better way to do this
AND ((gl.passing_comp IS NOT NULL AND gl.passing_comp <> 0) OR (gl.passing_att IS NOT NULL AND gl.passing_att  <> 0) OR (gl.passing_yds IS NOT NULL AND gl.passing_yds <> 0) OR (gl.passing_td IS NOT NULL AND gl.passing_td <> 0) OR (gl.passing_int IS NOT NULL AND gl.passing_int <> 0) OR (gl.rushing_att IS NOT NULL AND gl.rushing_att <> 0) OR (gl.rushing_yds IS NOT NULL AND gl.rushing_yds <> 0) OR (gl.rushing_td IS NOT NULL AND gl.rushing_td  <> 0) OR (gl.receiving_rec IS NOT NULL AND gl.receiving_rec <> 0 ) OR (gl.receiving_yds IS NOT NULL AND gl.receiving_yds <> 0)  OR (gl.receiving_tgt IS NOT NULL AND gl.receiving_tgt <> 0) OR (gl.receiving_td IS NOT NULL AND gl.receiving_td <> 0));
  end;
$$ LANGUAGE plpgsql;