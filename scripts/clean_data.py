import pandas as pd
import os
from glob import glob

# Dataset folder path
DATASET_FOLDER =  r"C:\Users\thota\OneDrive\Desktop\village-projects\villages-project\all-india-villages-master-list-excel\dataset"

all_data = []

# Read all excel files

        # Read all excel files
files = glob(os.path.join(DATASET_FOLDER, "*.xls"))

print("Total files found:", len(files))

for file in files:
    print(f"Reading {os.path.basename(file)}")

    try:
        df = pd.read_excel(file)

        # Keep only required columns
        required_columns = [
            'MDDS STC',
            'STATE NAME',
            'MDDS DTC',
            'DISTRICT NAME',
            'MDDS Sub_DT',
            'SUB-DISTRICT NAME',
            'MDDS PLCN',
            'Area Name'
        ]

        df = df[required_columns]

        # Rename columns
        df.columns = [
            'state_code',
            'state_name',
            'district_code',
            'district_name',
            'subdistrict_code',
            'subdistrict_name',
            'village_code',
            'village_name'
        ]

        all_data.append(df)

    except Exception as e:
        print(f"Error reading {file}: {e}")

# Combine all data
combined_df = pd.concat(all_data, ignore_index=True)

# Remove empty rows
combined_df = combined_df.dropna()

# Create states table
states = combined_df[['state_code', 'state_name']].drop_duplicates()
states.columns = ['code', 'name']

# Create districts table
districts = combined_df[['district_code', 'district_name', 'state_code']].drop_duplicates()
districts.columns = ['code', 'name', 'state_code']

# Create subdistricts table
subdistricts = combined_df[['subdistrict_code', 'subdistrict_name', 'district_code']].drop_duplicates()
subdistricts.columns = ['code', 'name', 'district_code']

# Create villages table
villages = combined_df[['village_code', 'village_name', 'subdistrict_code']].drop_duplicates()
villages.columns = ['code', 'name', 'subdistrict_code']

# Save CSV files
OUTPUT_FOLDER = r"C:\Users\thota\OneDrive\Desktop\village-projects\villages-project\data"

states.to_csv(os.path.join(OUTPUT_FOLDER, "states.csv"), index=False)
districts.to_csv(os.path.join(OUTPUT_FOLDER, "districts.csv"), index=False)
subdistricts.to_csv(os.path.join(OUTPUT_FOLDER, "subdistricts.csv"), index=False)
villages.to_csv(os.path.join(OUTPUT_FOLDER, "villages.csv"), index=False)

print("CSV files created successfully!")