create or replace function getPlayersForGameNfl(game_id int)
  RETURNS TABLE(player_id bigint, player_resource_id bigint, player_name text, player_position text) as $$
  begin
    return query select p.id as player_id , p.rotowire_id as player_resource_id, p.name as player_name,  p.position as player_position  from games g join teams t1 on g.team_one = t1.id join teams t2 on t2.id = g.team_two join players p on p.team = t1.id OR p.team = t2.id where g.id = game_id;
  end;
$$ LANGUAGE plpgsql;