create or replace function getUpcomingGamesByLeagueId(league_id_param int, season_year_param int)
  RETURNS TABLE(game_id bigint, game_name text, upcoming_identifier text, played_at timestamp) 
  as $$
  begin
    return query select g.id as game_id, g.name as game_name, g.intraseason_indicator as upcoming_identifier, g.played_at from games g join teams t on g.team_one = t.id 
    where t.league = league_id_param AND g.season_year = season_year_param;
    end;
$$ LANGUAGE plpgsql;
