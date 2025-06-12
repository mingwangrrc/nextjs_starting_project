import os
import base64
import json


def gather_files(root_dir: str):
    data = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for f in filenames:
            file_path = os.path.join(dirpath, f)
            try:
                with open(file_path, 'rb') as file:
                    content = base64.b64encode(file.read()).decode('utf-8')
                data.append({
                    "path": file_path,
                    "content_base64": content
                })
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
    return data


def main():
    root_directory = "/path/to/scan"  # specify your root directory
    data_json = gather_files(root_directory)

    # Save to JSON file
    with open("all_files.json", "w") as outfile:
        json.dump(data_json, outfile)


if __name__ == "__main__":
    main()
