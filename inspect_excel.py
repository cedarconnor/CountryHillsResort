import pandas as pd
import json

try:
    df = pd.read_excel('JosephineCounty_CompetitiveRoomInventory.xlsx')
    # Fill NaN with None for valid JSON
    df = df.where(pd.notnull(df), None)
    print(json.dumps(df.to_dict(orient='records'), indent=2, default=str))
except Exception as e:
    print(f"Error: {e}")
