import json
import boto3


rds_client = boto3.client('rds-data')
database_name = 'ipdatabase'
db_cluster_arn = 'arn:aws:rds:us-east-2:026802451096:cluster:ipdatabase-cluster'
db_credentials_secrets_store_arn = 'arn:aws:secretsmanager:us-east-2:026802451096:secret:rds-db-credentials/cluster-3V4ZRVTP2PSUNQKECQIA4RGFVY/admin/1666484218072-hdxza0'


def lambda_handler(event, context):
    # TODO implement
    
    path = event['path']
    httpmethod=event['httpMethod']
    user_id=event['queryStringParameters']['user_id']
    
    if path=='/getalltasks':
        querystring = 'SELECT * FROM ipdatabase.tasks where user_id= %d '%(int(user_id))
    
    if path=='/newtask':
        task_title=event['queryStringParameters']['title']
        task_description=event['queryStringParameters']['description']
        querystring = 'insert into tasks (user_id,task_title,task_description,task_status,task_date) values ("%s","%s","%s","active",now())'%(user_id,task_title,task_description)
        
    if path=='/updatetask':
        task_id=event['queryStringParameters']['id']
        task_title=event['queryStringParameters']['title']
        task_description=event['queryStringParameters']['description']
        
        querystring = 'UPDATE tasks SET task_title = "%s", task_description= "%s", task_date=now() WHERE task_id = %d;'%(task_title,task_description,int(task_id))
        
    if path=='/completetask':
        task_id=event['queryStringParameters']['id']
        querystring = 'UPDATE tasks SET task_status = "completed" WHERE task_id = %d'%(int(task_id))
        
    
    if path=='/removetask':
        task_id=event['queryStringParameters']['id']
        querystring = 'DELETE FROM tasks WHERE task_id = %d'%(int(task_id))
    
    
    response = execute_statement(querystring)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': str(response)
    }

    
def execute_statement(sql):
    response = rds_client.execute_statement(
        secretArn=db_credentials_secrets_store_arn,
        database=database_name,
        resourceArn=db_cluster_arn,
        sql=sql
    )
    
    return response
    
            
    
    
