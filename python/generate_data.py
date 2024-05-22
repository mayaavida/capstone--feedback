import csv
import random
from datetime import datetime, timedelta
import json

# Generate data for 50 employees
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "feedback_posts.csv"

# Load feedback data from JSON file
with open("subjects.json") as json_file:
    subjects = json.load(json_file)

with open("content.json") as json_file:
    content = json.load(json_file)

with open("response.json") as json_file:
    response = json.load(json_file)

# Generate data rows
data_rows = []
for i in range(1, NUM_ROWS + 1):
    # Generate random values for each column
    timestamp = datetime.now() - timedelta(seconds=i)
    post_id = i

    # Select a random subject from the available options
    subject = random.choice(subjects)
    subject_final = subject["subject"]

    # Select a random content from the available options
    contents = random.choice(content)
    content_final = contents["content"]

    # Select a random content from the available options
    responses = random.choice(response)
    response_final = responses["response"]

    # Create the data row
    data_row = [
        timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        post_id,
        subject_final,
        content_final,
        response_final
    ]

    # Add the data row to the list
    data_rows.append(data_row)

# Write the data to the CSV file
with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        ["timestamp", "post_id", "subject", "content", "response"]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
