-- Up
CREATE TABLE user_team (user_id, team_id, member);
CREATE TABLE user ( id integer primary key, google_name, google_id, display_name);
CREATE TABLE team ( id integer primary key, google_group, display_name, chat_id);
CREATE TABLE event (id integer primary key, team_id, display_name, state, chat_id);
CREATE TABLE puzzle (id integer primary key, display_name, state, chat_id);
CREATE TABLE round(id integer primary key, event_id, display_name, state);
CREATE TABLE puzzle_round (puzzle_id, round_id, type);
CREATE TABLE chat (id integer primary key);
CREATE TABLE message (id integer primary key, chat_id, type, text, timestamp, user_id);
CREATE TABLE user_puzzle (user_id integer, puzzle_id integer, timestamp);
CREATE TABLE puzzle_info (puzzle_id integer, type, text);
CREATE TABLE solvepad_source (id integer primary key, checksum, url, width number , height number, title, disk_file, create_ts number);
CREATE TABLE solvepad_puzzle (id integer primary key, source_id integer, create_ts number, activity_ts number, state, view_url, share_key, user_id integer, title, recommend_key, player_key);
CREATE TABLE solvepad_hotspot (id integer primary key, source_id integer, shape, shape_data, up integer, down integer, left integer, right integer, private integer);
CREATE TABLE solvepad_puzzle_share(id integer primary key, puzzle_id, user_id);
CREATE TABLE solvepad_history (id integer primary key, puzzle_id integer, ts number, user_id integer, hotspot_id integer, older, newer, note, type);
CREATE TABLE user_message (user_id number, message_id number, status);
CREATE TABLE user_event (user_id integer, event_id integer, timestamp);

-- Down
DROP TABLE user_team
DROP TABLE user
DROP TABLE team
DROP TABLE event
DROP TABLE puzzle
DROP TABLE round
DROP TABLE puzzle_round
DROP TABLE chat
DROP TABLE message
DROP TABLE user_puzzle
DROP TABLE puzzle_info
DROP TABLE solvepad_source
DROP TABLE solvepad_puzzle
DROP TABLE solvepad_hotspot
DROP TABLE solvepad_puzzle_share
DROP TABLE solvepad_history
DROP TABLE user_message
DROP TABLE user_event

