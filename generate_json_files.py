import json


# ChatGPT code to put specified keys all on one line, slightly modified
def custom_json_dump(file_in, file_out, type):
    # Dump the JSON with indentation
    with open(file_in, 'r') as f:
        data = json.load(f)
    json_string = json.dumps(data, indent=4)

    # Modify the "coordinates" key to ensure nested lists are in one line
    def process_coordinates(json_string, key):
        # Split by lines to manipulate specific lines
        lines = json_string.splitlines()
        for i, line in enumerate(lines):
            if f'"{key}"' in line:  # Find the key
                start_index = i
                open_brackets = 0
                end_index = None
                # Aggregate all lines until the closing bracket is found
                for j in range(i, len(lines)):
                    open_brackets += lines[j].count("[") - lines[j].count("]")
                    if open_brackets == 0:
                        end_index = j
                        break
                if end_index:
                    # Replace the multiline representation with a single-line list
                    combined_list = "".join(lines[start_index:end_index + 1])
                    single_line = " "*16 + combined_list.replace("\n", "").replace(" ", "").replace(",", ", ").replace(':', ': ')
                    lines[start_index:end_index + 1] = [single_line]
        return "\n".join(lines)

    # Post-process the JSON string to fix the coordinates formatting
    processed_json_string = process_coordinates(json_string, 'coordinates')
    processed_json_string = process_coordinates(processed_json_string, 'size')

    # Save the formatted JSON to a file
    with open(file_out, "w") as f:
        f.write(f'if(!window.geojson) {{\n    window.geojson = {{}}\n}}\nwindow.geojson.{type} = JSON.parse(`\n{processed_json_string}\n`)')


def compressed_json_dump(file_in, file_out, type):
    with open(file_in, 'r') as f:
        data = json.load(f)
    json_string = json.dumps(data)
    with open(file_out, 'w') as f:
        f.write(f'if(!window.geojson) {{\n    window.geojson = {{}}\n}}\nwindow.geojson.{type} = JSON.parse(`\n{json_string}\n`)')


# Example usage
custom_json_dump('geojson/rooms.json', 'dist/rooms.js', 'rooms')
custom_json_dump('geojson/episodes.json', 'dist/episodes.js', 'episodes')
custom_json_dump('geojson/entities.json', 'dist/entities.js', 'entities')
compressed_json_dump('geojson/room_data.json', 'dist/room_data.js', 'room_data')

