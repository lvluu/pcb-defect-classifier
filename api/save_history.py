
from numpy import *
from boto3 import resource
import os
from decimal import Decimal
import json
import datetime 

resource = resource(
    'dynamodb',
    aws_access_key_id     = 'AKIAZCMABC4QXPNUVZYM',
    aws_secret_access_key = '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',
    region_name           = 'us-east-1'
)

historyTable = resource.Table('history')

def create_table_history():
    try:
        table = resource.create_table(
            TableName = 'history', # Name of the table 
            KeySchema = [
                {
                    'AttributeName': 'id',
                    'KeyType'      : 'HASH' # HASH = partition key, RANGE = sort key
                }
            ],
            AttributeDefinitions = [
                {
                    'AttributeName': 'id', # Name of the attribute
                    'AttributeType': 'S'   # N = Number (S = String, B= Binary)
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits'  : 10,
                'WriteCapacityUnits': 10
            }
        )
        return table
    except:
        pass

# create_table_history()

def read_from_history(id):
    response = historyTable.get_item(
        Key = {
            'id'     : id
        },
        AttributesToGet = [ 
        ]                      
    )
    return response

def save_history(item):
    item = json.loads(json.dumps(item, indent=4, sort_keys=True, default=str), parse_float=Decimal)
    response = historyTable.put_item(
        Item = item
    )
    return response

def load_history():
    response = historyTable.scan()
    data = response['Items']
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    return data
   
