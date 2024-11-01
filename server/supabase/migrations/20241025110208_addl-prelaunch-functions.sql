create or replace function getUpcomingGamesByLeagueId(league_id_param int, season_year_param int)
  RETURNS TABLE(game_public_id text, game_name text, upcoming_identifier text, played_at timestamp) 
  as $$
  begin
    return query select g.publicid::text as game_public_id, g.name as game_name, g.intraseason_indicator as upcoming_identifier, g.played_at from games g join teams t on g.team_one = t.id 
    where t.league = league_id_param AND g.season_year = season_year_param;
    end;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getintraseasonindicatorsforplayedgames(league_id_param INT, season_year_param INT) RETURNS TABLE(game_isi text, played_at timestamp) AS $$
BEGIN
  RETURN query
  SELECT   g.intraseason_indicator AS game_isi,
           min(played_at)          AS played_at
  FROM     games g
  join     teams t
  ON       g.team_one = t.id
  join     nfl_gamelog gl
  ON       gl.game = g.id
  WHERE    g.played_at <= now()::timestamp
  AND      t.league = leage_id_param
  AND      g.season_year = season_year_param
  GROUP BY g.intraseason_indicator
  ORDER BY min(played_at);

END;
$$ LANGUAGE PLPGSQL;