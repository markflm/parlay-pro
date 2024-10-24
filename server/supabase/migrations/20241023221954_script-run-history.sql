  create table
  public.script_run_history (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    game_id bigint not null,
    status text not null,
    constraint script_run_history_pkey primary key (id),
    constraint script_run_history_games_fkey  foreign key (game_id) references games (id)
  ) tablespace pg_default;  